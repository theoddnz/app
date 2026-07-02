import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for TheOddOnes and how we handle basic account, analytics, and community information.",
  path: "/privacy-policy",
  keywords: ["TheOddOnes privacy policy", "privacy policy"],
});

const sections = [
  {
    title: "What we collect",
    body: "We may collect the information you share with us directly, such as your name, email, profile details, learning activity, and messages connected to TheOddOnes accounts or community spaces.",
  },
  {
    title: "How we use it",
    body: "We use this information to run the platform, keep your account working, understand what people find useful, improve learning paths, and send important service updates.",
  },
  {
    title: "Analytics",
    body: "We may use basic analytics such as page views or visitor counts to understand site activity. This helps us improve the experience without turning the product into noise.",
  },
  {
    title: "Your choices",
    body: "You can contact us to ask about your information, request changes, or ask us to remove account data where we reasonably can.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32 text-foreground dark:bg-[#0a0806] md:px-10 md:pt-40">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="font-space text-sm font-medium text-foreground/45 transition-colors hover:text-foreground"
        >
          Back home
        </Link>

        <header className="mt-10 border-b border-border/60 pb-12 dark:border-white/[0.08]">
          <p className="mb-5 inline-flex rounded-full border border-border/60 bg-muted px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground dark:border-white/[0.08] dark:bg-[#15110e]">
            TheOddOnes
          </p>
          <h1 className="font-heading text-[clamp(3.2rem,9vw,6rem)] font-bold leading-[0.92] text-foreground">
            Privacy policy.
          </h1>
          <p className="mt-6 max-w-2xl font-space text-base leading-8 text-foreground/58 md:text-lg">
            A simple note on how TheOddOnes handles information connected to the site, accounts, learning paths, and community features.
          </p>
        </header>

        <section className="divide-y divide-border/60 dark:divide-white/[0.08]">
          {sections.map((section) => (
            <div key={section.title} className="grid gap-4 py-9 md:grid-cols-[0.45fr_1fr]">
              <h2 className="font-heading text-2xl font-semibold leading-tight text-foreground">
                {section.title}
              </h2>
              <p className="font-space text-[15px] leading-8 text-foreground/60">
                {section.body}
              </p>
            </div>
          ))}
        </section>

        <footer className="mt-10 rounded-[24px] border border-border/60 bg-card p-6 font-space text-sm leading-7 text-foreground/55 dark:border-white/[0.08] dark:bg-[#15110e]">
          This page is a practical overview, not a substitute for legal advice. For privacy questions, reach TheOddOnes through the official community or social links.
        </footer>
      </article>
    </main>
  );
}
