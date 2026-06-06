import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Home, MessageCircle, Sparkles, Users } from "@/components/ui/tabler-icons";

import { pageMetadata } from "@/lib/seo";
import { Button3D } from "@/components/ui/button-3d";

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
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground dark:bg-[#0a0806]">
      <div className="mx-auto max-w-6xl">
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

        <section className="grid gap-10 border-b border-border/60 pb-16 md:grid-cols-[1.08fr_0.92fr] md:items-end dark:border-white/[0.08]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-border/60 bg-muted px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground dark:border-white/[0.08] dark:bg-[#15110e]">
              Community
            </p>
            <h1 className="max-w-4xl font-heading text-[clamp(3.2rem,9vw,6.1rem)] font-bold leading-[0.92] text-foreground">
              A quiet room for serious builders.
            </h1>
          </div>

          <div>
            <p className="max-w-xl font-space text-base leading-8 text-foreground/58 md:text-lg">
              A small, focused space for people learning by making things. No hype wall. No endless noise. Just useful questions, honest progress, and builders who keep showing up.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button3D>
                Opening soon
              </Button3D>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-3 font-space text-sm font-semibold text-foreground shadow-[0_7px_0_rgba(13,38,58,0.07),0_12px_22px_rgba(13,38,58,0.11)] ring-1 ring-border/60 transition-transform duration-200 hover:-translate-y-0.5 dark:bg-[#1b1915] dark:shadow-[0_7px_0_rgba(0,0,0,0.24),0_12px_22px_rgba(0,0,0,0.32)] dark:ring-white/[0.08]"
              >
                Explore paths <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-5 border-b border-border/60 py-16 md:grid-cols-3 dark:border-white/[0.08]">
          {principles.map(({ icon: Icon, title, body }, index) => (
            <article
              key={title}
              className="group rounded-[28px] bg-card p-2 shadow-[0_12px_0_rgba(13,38,58,0.06),0_20px_34px_rgba(13,38,58,0.11)] ring-1 ring-black/[0.05] transition-transform duration-300 hover:-translate-y-1 dark:bg-[#1b1915] dark:shadow-[0_12px_0_rgba(0,0,0,0.22),0_20px_34px_rgba(0,0,0,0.34)] dark:ring-white/[0.08]"
            >
              <div className="relative min-h-[250px] overflow-hidden rounded-[22px] border border-black/[0.04] bg-muted/45 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/[0.08] dark:bg-[#211f1a] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="absolute right-5 top-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/20">
                  0{index + 1}
                </div>

                <div className="inline-flex rounded-[18px] bg-card p-2 shadow-[0_7px_0_rgba(13,38,58,0.06),0_12px_20px_rgba(13,38,58,0.1)] ring-1 ring-black/[0.04] dark:bg-[#15110e] dark:ring-white/[0.08]">
                  <span className="inline-flex size-10 items-center justify-center rounded-[14px] bg-muted/70 text-[#c4622d] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-[#0f0d0b] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                </div>

                <div className="mt-12 rounded-[20px] bg-card px-5 py-5 shadow-[0_8px_0_rgba(13,38,58,0.05),0_14px_24px_rgba(13,38,58,0.09)] ring-1 ring-black/[0.04] dark:bg-[#15110e] dark:ring-white/[0.08]">
                  <h2 className="font-heading text-[25px] font-semibold leading-tight text-foreground">{title}</h2>
                  <p className="mt-3 font-space text-[13.5px] leading-7 text-foreground/55">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="py-14">
          <div className="rounded-[32px] bg-[#c4622d] p-2.5 shadow-[0_16px_0_rgba(140,50,10,0.2),0_28px_48px_rgba(140,50,10,0.22)] ring-1 ring-black/[0.08]">
            <div className="flex flex-col gap-6 rounded-[24px] border border-white/15 p-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-heading text-3xl font-semibold leading-tight">Invite links will land here.</p>
              <p className="mt-2 font-space text-sm text-white/65">
                Until then, pick a path and start building.
              </p>
            </div>
            <Link
              href="/users/signup"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-space text-sm font-semibold text-[#29445b] shadow-[0_8px_0_rgba(80,28,4,0.16),0_14px_24px_rgba(80,28,4,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Create account <ArrowUpRight className="size-4" />
            </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
