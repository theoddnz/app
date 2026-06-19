import "server-only";

/**
 * Reads the total page views from Cloudflare Web Analytics via the
 * GraphQL Analytics API.
 *
 * Required environment variables (server-only, never expose the token):
 *   CLOUDFLARE_API_TOKEN        - API token with "Account Analytics: Read"
 *   CLOUDFLARE_ACCOUNT_ID       - your Cloudflare account id (account tag)
 *   CF_WEB_ANALYTICS_SITE_TAG   - the Web Analytics site tag (from the beacon)
 *
 * Optional:
 *   CF_ANALYTICS_LOOKBACK_DAYS  - how far back to sum views (default 365)
 */

const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

type RumGroup = { count: number };

const QUERY = `
  query SiteViews($accountTag: string!, $siteTag: string!, $start: Time!, $end: Time!) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        rumPageloadEventsAdaptiveGroups(
          filter: { siteTag: $siteTag, datetime_geq: $start, datetime_leq: $end }
          limit: 1
        ) {
          count
        }
      }
    }
  }
`;

export async function getSiteViews(): Promise<number | null> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const accountTag = process.env.CLOUDFLARE_ACCOUNT_ID;
  const siteTag = process.env.CF_WEB_ANALYTICS_SITE_TAG;

  if (!apiToken || !accountTag || !siteTag) {
    return null;
  }

  const requestedDays = Number(process.env.CF_ANALYTICS_LOOKBACK_DAYS ?? "90");
  // Cloudflare's free Web Analytics rejects single queries wider than ~92 days.
  const lookbackDays = Math.min(Number.isFinite(requestedDays) ? requestedDays : 90, 90);
  const end = new Date();
  const start = new Date(end.getTime() - lookbackDays * 24 * 60 * 60 * 1000);

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          accountTag,
          siteTag,
          start: start.toISOString(),
          end: end.toISOString(),
        },
      }),
      // Cache the count so we don't hit the API on every request.
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const json = (await res.json()) as {
      data?: {
        viewer?: {
          accounts?: Array<{ rumPageloadEventsAdaptiveGroups?: RumGroup[] }>;
        };
      };
    };

    const groups = json.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups;
    if (!groups || groups.length === 0) {
      return null;
    }

    return groups[0].count ?? null;
  } catch {
    return null;
  }
}

export function formatViews(n: number): string {
  if (n < 1000) return n.toLocaleString("en-US");
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}K`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}
