import { NextResponse } from "next/server";

import { getDb } from "@/db";
import { processedWebhooks } from "@/db/schema";
import { verifyDodoWebhook } from "@/lib/dodo";
import { syncSubscription, type SubscriptionSync } from "@/lib/mini-course";

export const runtime = "nodejs";

type DodoEvent = {
  type: string;
  data?: {
    subscription_id?: string;
    payment_id?: string;
    status?: string;
    currency?: string;
    recurring_pre_tax_amount?: number;
    next_billing_date?: string;
    metadata?: Record<string, string>;
  };
};

// Maps a Dodo event type to our internal entitlement status.
function statusForEvent(type: string): SubscriptionSync["status"] | null {
  switch (type) {
    case "subscription.active":
    case "subscription.renewed":
      return "active";
    case "subscription.on_hold":
    case "subscription.failed":
      return "past_due";
    case "subscription.cancelled":
      return "cancelled";
    case "subscription.expired":
      return "expired";
    case "payment.succeeded":
      return "active";
    default:
      return null;
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  let event: DodoEvent;
  try {
    event = verifyDodoWebhook(rawBody, {
      "webhook-id": request.headers.get("webhook-id") ?? "",
      "webhook-signature": request.headers.get("webhook-signature") ?? "",
      "webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
    }) as DodoEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const webhookId = request.headers.get("webhook-id");
  if (!webhookId) {
    return NextResponse.json({ error: "Missing webhook-id." }, { status: 400 });
  }

  const db = getDb();

  // Idempotency: record this delivery; skip if we've already handled it.
  const inserted = await db
    .insert(processedWebhooks)
    .values({ id: webhookId })
    .onConflictDoNothing()
    .returning({ id: processedWebhooks.id });

  if (inserted.length === 0) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const status = statusForEvent(event.type);
  const data = event.data;

  // Only subscription-bearing events with our metadata are actionable.
  if (status && data?.metadata?.userId && data.metadata.seriesId && data.subscription_id) {
    await syncSubscription({
      userId: data.metadata.userId,
      seriesId: data.metadata.seriesId,
      status,
      dodoSubscriptionId: data.subscription_id,
      dodoPaymentId: data.payment_id,
      currentPeriodEnd: data.next_billing_date ? new Date(data.next_billing_date) : undefined,
      amountCents: typeof data.recurring_pre_tax_amount === "number" ? data.recurring_pre_tax_amount : undefined,
      currency: data.currency?.toLowerCase(),
    });
  }

  return NextResponse.json({ received: true });
}
