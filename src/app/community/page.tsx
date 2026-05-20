import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Home, MessageCircle, Sparkles, Users } from "@/components/ui/huge-icons";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "TheOddOnes Community",
  description:
    "A small, focused learning community for builders who think differently, share progress, ask clearly, and build in public.",
  path: "/community",
  keywords: [
    "TheOddOnes community",
    "learning community",
    "builder community",
    "build in public community",
  ],
});

const principles = [
  {
    icon: MessageCircle,
    title: "Ask clearly",
    body: "Bring context, show what you tried, and make it easy for someone to help.",
  },
  {
    icon: Users,
    title: "Build in public",
    body: "Share progress, rough edges, small wins, and honest notes from the work.",
  },
  {
    icon: Sparkles,
    title: "Keep it useful",
    body: "Less noise. More feedback, accountability, and momentum.",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-16 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
        >
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Home size={14} strokeWidth={2} />
            Home
          </Link>
          <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
          <span className="text-foreground/70">Community</span>
        </nav>

        <section className="border-b border-border pb-16">
          <p className="mb-5 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/35">
            Community
          </p>
          <h1
            className="max-w-4xl font-space font-bold leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(3.6rem, 10vw, 7.5rem)" }}
          >
            A quiet room for serious builders.
          </h1>
          <p className="mt-8 max-w-2xl font-inter text-base leading-8 text-foreground/55">
            TheOddOnes community is being shaped as a small, focused space for people who are learning by making things. No hype wall. No endless noise. Just useful conversations and steady progress.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-border px-4 py-2 font-inter text-xs text-muted-foreground">
              Opening soon
            </span>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-inter text-xs font-medium text-background transition-opacity hover:opacity-85"
            >
              Explore paths <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </section>

        <section className="grid gap-px overflow-hidden border-b border-border py-14 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <article key={title} className="bg-background py-8 md:px-8 md:first:pl-0 md:last:pr-0">
              <Icon className="size-5 text-foreground/35" strokeWidth={1.8} />
              <h2 className="mt-7 font-space text-2xl font-semibold">{title}</h2>
              <p className="mt-4 font-inter text-sm leading-7 text-foreground/50">{body}</p>
            </article>
          ))}
        </section>

        <section className="py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-space text-2xl font-semibold">Invite links will land here.</p>
              <p className="mt-2 font-inter text-sm text-muted-foreground">
                Until then, pick a path and start building.
              </p>
            </div>
            <Link
              href="/users/signup"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-3 font-inter text-sm transition-colors hover:bg-muted"
            >
              Create account <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
