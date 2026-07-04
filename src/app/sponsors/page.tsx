import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Globe,
  Home,
  Mail,
  Sparkles,
  Users,
} from "@/components/ui/tabler-icons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sponsors for Robotics, ROS2 and Builder Education",
  description:
    "Sponsor TheOddOnes and support build-first robotics, ROS2, drone, software, embedded systems, and project-based engineering education.",
  path: "/sponsors",
  keywords: [
    "TheOddOnes sponsors",
    "sponsor robotics education",
    "sponsor ROS2 learning",
    "sponsor drone education",
    "sponsor software education",
    "robotics education sponsors",
    "engineering education sponsors",
  ],
});

const sponsorSlots = [
  "Primary build partner",
  "Robotics tools partner",
  "Community partner",
  "Learning path partner",
  "Student support partner",
  "Workshop partner",
];

const reasons = [
  {
    icon: Users,
    title: "Reach real builders",
    body: "Show up beside people learning robotics, software, electronics, and product thinking by making real projects.",
  },
  {
    icon: BadgeCheck,
    title: "Support useful learning",
    body: "Help keep practical paths, field notes, and build-first content accessible for curious students and makers.",
  },
  {
    icon: Globe,
    title: "Be part of the internet workshop",
    body: "Your brand sits with a community that values experiments, public progress, and honest technical learning.",
  },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-[#131313]">
      <section className="border-b border-black/6 px-6 pb-16 pt-32 dark:border-white/[0.06]">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Home size={14} strokeWidth={2} />
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">Sponsors</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4622d] dark:border-white/[0.08] dark:bg-[#181818]">
                <Sparkles size={13} strokeWidth={2} />
                Partner with builders
              </p>
              <h1 className="mt-6 font-space text-4xl font-bold uppercase leading-[0.96] tracking-tight md:text-6xl">
                Join sponsors for TheOddOnes.
              </h1>
              <p className="mt-5 max-w-xl font-space text-[15px] leading-8 text-muted-foreground md:text-base">
                Put your company beside a community learning by building real things. Sponsor paths, workshops, field notes, and the people who keep choosing the harder, more useful way to learn.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="mailto:sponsors@theodd1s.com"
                  className="group relative inline-flex border-none bg-transparent p-0 outline-none"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 inset-y-0 translate-y-[4px] rounded-full bg-[#6f2c14] shadow-[0_8px_18px_rgba(84,31,12,0.22)]"
                  />
                  <span className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.16] bg-[linear-gradient(180deg,#d96e3a_0%,#bd5b2b_52%,#95431d_100%)] px-6 py-3 font-heading text-[14px] font-semibold tracking-[0.02em] text-[#fff4ed] shadow-[0_1px_0_rgba(255,255,255,0.26)_inset,0_-1px_0_rgba(0,0,0,0.22)_inset,0_0_0_1px_rgba(255,255,255,0.04)_inset] transition-transform duration-75 group-active:translate-y-[4px]">
                    Become a sponsor
                    <Mail className="size-4" />
                  </span>
                </Link>
                <Link
                  href="/community"
                  className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-card px-5 font-space text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground dark:border-white/[0.08] dark:bg-[#181818]"
                >
                  See community
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {sponsorSlots.map((slot) => (
                <div
                  key={slot}
                  className="flex min-h-[128px] flex-col items-center justify-center rounded-lg border border-dashed border-black/18 bg-card/60 px-5 text-center shadow-[0_6px_0_rgba(13,38,58,0.035),0_12px_24px_rgba(13,38,58,0.07)] dark:border-white/[0.16] dark:bg-[#181818]"
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c4622d]">
                    Open spot
                  </span>
                  <p className="mt-3 font-heading text-lg font-semibold text-foreground">
                    Your company logo
                  </p>
                  <p className="mt-1 font-space text-xs text-muted-foreground">{slot}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-lg border border-border bg-card p-6 dark:border-white/[0.08] dark:bg-[#181818]"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-muted text-[#c4622d] dark:bg-[#242424]">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <h2 className="mt-5 font-heading text-xl font-semibold leading-tight">{title}</h2>
              <p className="mt-3 font-space text-sm leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
