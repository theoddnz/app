import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Users, Wrench } from "@/components/ui/tabler-icons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mission",
  description:
    "TheOddOnes mission: turn passive learning into real building, useful feedback, and a focused community for people who learn differently.",
  path: "/mission",
  keywords: ["TheOddOnes mission", "people who learn differently", "learning community mission"],
});

const principles = [
  {
    title: "Build before you feel ready",
    body: "Real confidence comes from wiring, coding, debugging, shipping, and explaining what happened.",
    icon: Wrench,
  },
  {
    title: "Learn with people, not playlists",
    body: "You move faster when your questions, failed attempts, and small wins are visible to others.",
    icon: Users,
  },
  {
    title: "Use content as fuel",
    body: "Videos and notes matter, but only when they push you back into a project you can test.",
    icon: BookOpen,
  },
];

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-[#0a0806]">

      <article className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-10 md:pb-28 md:pt-40">
        <header className="grid gap-10 border-b border-border/60 pb-16 md:grid-cols-[1.1fr_0.9fr] md:items-end dark:border-white/[0.08]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-border/60 bg-muted px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground dark:border-white/[0.08] dark:bg-[#15110e]">
              Our mission
            </p>

            <h1 className="max-w-4xl font-heading text-[clamp(3.2rem,9vw,6.2rem)] font-bold leading-[0.92] text-foreground">
              Make learning active again.
            </h1>
          </div>

          <p className="max-w-xl font-space text-base leading-8 text-foreground/58 md:text-lg">
            TheOddOnes exists for people who do not learn by sitting still. We are building a place where curiosity turns into projects, projects turn into proof, and proof turns into confidence.
          </p>
        </header>

        <section className="grid gap-6 py-16 md:grid-cols-3">
          {principles.map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-[30px] bg-card p-2.5 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-black/[0.05] transition-transform duration-300 hover:-translate-y-1 dark:bg-[#1b1915] dark:shadow-[0_14px_0_rgba(0,0,0,0.24),0_22px_42px_rgba(0,0,0,0.38)] dark:ring-white/[0.08]"
            >
              <div className="flex h-full min-h-[260px] flex-col justify-between rounded-[24px] border border-black/[0.04] bg-muted/50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.08] dark:bg-[#211f1a] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-card text-[#c4622d] shadow-[0_7px_0_rgba(13,38,58,0.06),0_12px_20px_rgba(13,38,58,0.1)] ring-1 ring-black/[0.04] dark:bg-[#15110e] dark:ring-white/[0.08]">
                  <Icon size={21} strokeWidth={1.8} />
                </span>

                <div className="pt-10">
                  <h2 className="font-heading text-[24px] font-semibold leading-tight text-foreground">
                    {title}
                  </h2>
                  <p className="mt-3 font-space text-[13.5px] leading-7 text-foreground/55">
                    {body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-10 py-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div className="sticky top-28 hidden md:block">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4622d]">
              What we believe
            </p>
            <p className="mt-4 font-heading text-4xl font-semibold leading-none text-foreground">
              Watching is not the same as knowing.
            </p>
          </div>

          <div className="space-y-7 font-space text-base leading-8 text-foreground/65 md:text-lg md:leading-9">
            <p>
              The internet already has enough tutorials, courses, playlists, and guides. The problem is not access to information. The problem is what happens after the video ends, when you are alone with an empty editor, a loose wire, a broken build, or an idea that suddenly feels too big.
            </p>
            <p>
              Most platforms teach you what to watch next. We care about what you make next. Understanding does not come from watching someone else solve the hard part. It comes from meeting the hard part yourself, getting stuck, asking a sharper question, and trying again with better instincts.
            </p>
            <p>
              TheOddOnes is for builders, tinkerers, robotics obsessives, and people who never felt fully served by passive learning. We want learning to feel like a workshop: focused, messy, honest, and full of visible progress.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-[34px] bg-[#c4622d] p-2.5 shadow-[0_16px_0_rgba(140,50,10,0.2),0_28px_48px_rgba(140,50,10,0.22)] ring-1 ring-black/[0.08]">
          <div className="rounded-[26px] border border-white/15 p-8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] md:flex md:items-center md:justify-between md:gap-8 md:p-10">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                Not another course platform
              </p>
              <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight md:text-5xl">
                A place for people who learn by making the real thing.
              </h2>
            </div>

            <Link
              href="/learn"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-space text-sm font-semibold text-[#29445b] shadow-[0_8px_0_rgba(80,28,4,0.16),0_14px_24px_rgba(80,28,4,0.18)] transition-transform duration-200 hover:-translate-y-0.5 md:mt-0"
            >
              Explore paths
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
