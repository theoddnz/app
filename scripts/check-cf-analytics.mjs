import { config } from "dotenv";

config({ path: ".env.local", override: true });

const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const accountTag = process.env.CLOUDFLARE_ACCOUNT_ID;
const siteTag = process.env.CF_WEB_ANALYTICS_SITE_TAG;

const missing = [];
if (!apiToken) missing.push("CLOUDFLARE_API_TOKEN");
if (!accountTag) missing.push("CLOUDFLARE_ACCOUNT_ID");
if (!siteTag) missing.push("CF_WEB_ANALYTICS_SITE_TAG");

if (missing.length > 0) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const requestedDays = Number(process.env.CF_ANALYTICS_LOOKBACK_DAYS ?? "90");
// Cloudflare's free Web Analytics rejects single queries wider than ~92 days.
const lookbackDays = Math.min(Number.isFinite(requestedDays) ? requestedDays : 90, 90);
const end = new Date();
const start = new Date(end.getTime() - lookbackDays * 24 * 60 * 60 * 1000);

const query = `
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

console.log(`Querying Cloudflare Web Analytics for the last ${lookbackDays} days...`);

const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query,
    variables: {
      accountTag,
      siteTag,
      start: start.toISOString(),
      end: end.toISOString(),
    },
  }),
});

const json = await res.json();

if (!res.ok || json.errors) {
  console.error("Cloudflare API error:");
  console.error(JSON.stringify(json.errors ?? json, null, 2));
  console.error("\nCheck: token has 'Account Analytics: Read', and the account id / site tag are correct.");
  process.exit(1);
}

const groups = json?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups;
const count = groups?.[0]?.count ?? 0;

console.log("\n✅ Config OK — API responded successfully.");
console.log(`Total page views (last ${lookbackDays} days): ${count}`);
if (count === 0) {
  console.log("\nCount is 0 — this is normal if the beacon hasn't collected traffic yet.");
  console.log("Visit your deployed site a few times, wait a couple minutes, then re-run.");
}
