import "server-only";

import DodoPayments from "dodopayments";

// Dodo Payments — server-side checkout creation + webhook verification.

let cachedClient: DodoPayments | null = null;

export function isDodoConfigured(): boolean {
  return Boolean(process.env.DODO_PAYMENTS_API_KEY);
}

export function getDodoClient(): DodoPayments {
  const bearerToken = process.env.DODO_PAYMENTS_API_KEY;
  if (!bearerToken) {
    throw new Error("DODO_PAYMENTS_API_KEY is required.");
  }

  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode";

  cachedClient ??= new DodoPayments({
    bearerToken,
    environment,
    webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY,
  });

  return cachedClient;
}

export type CreateCheckoutOptions = {
  productId: string;
  returnUrl: string;
  customer: { email: string; name?: string };
  metadata: Record<string, string>;
};

/** Creates a single-product hosted checkout and returns the redirect URL. */
export async function createMiniSeriesCheckout(
  opts: CreateCheckoutOptions,
): Promise<{ checkoutUrl: string; sessionId: string }> {
  const client = getDodoClient();

  const name = opts.customer.name?.trim();
  // Omit an empty name so Dodo lets the shopper enter it on the checkout page
  // (sending "" locks the session name and fails the "matches session" check).
  const customer = name
    ? { email: opts.customer.email, name }
    : { email: opts.customer.email };

  const session = await client.checkoutSessions.create({
    product_cart: [{ product_id: opts.productId, quantity: 1 }],
    customer,
    return_url: opts.returnUrl,
    metadata: opts.metadata,
    feature_flags: { allow_customer_editing_name: true },
  });

  if (!session.checkout_url) {
    throw new Error("Dodo checkout session returned no checkout_url.");
  }

  return { checkoutUrl: session.checkout_url, sessionId: session.session_id };
}

export type DodoWebhookHeaders = {
  "webhook-id": string;
  "webhook-signature": string;
  "webhook-timestamp": string;
};

/** Verifies the Standard-Webhooks signature and returns the parsed event. */
export function verifyDodoWebhook(rawBody: string, headers: DodoWebhookHeaders) {
  const client = getDodoClient();
  return client.webhooks.unwrap(rawBody, { headers });
}

/** Fetches a subscription's authoritative state (used to reconcile after checkout). */
export async function getDodoSubscription(subscriptionId: string) {
  const client = getDodoClient();
  return client.subscriptions.retrieve(subscriptionId);
}
