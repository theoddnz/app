import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getAppSession } from "@/lib/admin-auth";
import { getDb } from "@/db";
import { miniSeries } from "@/db/schema";
import { createMiniSeriesCheckout, isDodoConfigured } from "@/lib/dodo";
import { upsertPendingPurchase } from "@/lib/mini-course";

export const runtime = "nodejs";

function appUrl(request: Request) {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || new URL(request.url).origin;
}

// Starts a monthly-subscription checkout for a mini-series. Requires a signed-in user.
export async function POST(request: Request) {
  const session = await getAppSession();

  if (!session) {
    return NextResponse.json({ error: "Please sign in to subscribe." }, { status: 401 });
  }

  if (!isDodoConfigured()) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 500 });
  }

  let body: { seriesId?: string };
  try {
    body = (await request.json()) as { seriesId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const seriesId = body.seriesId?.trim();
  if (!seriesId) {
    return NextResponse.json({ error: "seriesId is required." }, { status: 400 });
  }

  const db = getDb();
  const [series] = await db
    .select({
      id: miniSeries.id,
      slug: miniSeries.slug,
      status: miniSeries.status,
      dodoProductId: miniSeries.dodoProductId,
      priceCents: miniSeries.priceCents,
      currency: miniSeries.currency,
    })
    .from(miniSeries)
    .where(eq(miniSeries.id, seriesId))
    .limit(1);

  if (!series || series.status !== "published") {
    return NextResponse.json({ error: "Series not available." }, { status: 404 });
  }

  if (!series.dodoProductId) {
    return NextResponse.json({ error: "This series has no subscription plan yet." }, { status: 409 });
  }

  try {
    await upsertPendingPurchase({
      userId: session.userId,
      seriesId: series.id,
      amountCents: series.priceCents,
      currency: series.currency,
    });

    const { checkoutUrl } = await createMiniSeriesCheckout({
      productId: series.dodoProductId,
      returnUrl: `${appUrl(request)}/mini-course/${series.slug}`,
      customer: { email: session.email },
      metadata: { userId: session.userId, seriesId: series.id },
    });

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to start checkout.";
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Failed to start checkout." : message },
      { status: 500 },
    );
  }
}
