import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  GitMerge,
  Globe,
  Home,
  MessageCircle,
  NotebookText,
  Sparkles,
  Users,
} from "@/components/ui/tabler-icons";

import communitySvg from "../../../assets/tools/online-community_3o0l.svg";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Robotics and Software Builder Community",
  description:
    "Join TheOddOnes community for robotics, ROS2, drones, software projects, build-in-public progress, sharper questions, and project-based learning.",
  path: "/community",
  keywords: [
    "TheOddOnes community",
    "robotics community",
    "ROS2 community",
    "drone robotics community",
    "software builder community",
    "build in public community",
    "project based learning community",
  ],
});

const communityCards = [
  {
    icon: MessageCircle,
    title: "Better questions",
    body: "A good community helps you explain the problem clearly, show what you tried, and get useful answers faster.",
  },
  {
    icon: Users,
    title: "Shared momentum",
    body: "Seeing others build makes it easier to keep going when your own project slows down or gets messy.",
  },
  {
    icon: GitMerge,
    title: "Open progress",
    body: "Work becomes easier to improve when progress, failures, fixes, and small wins are visible.",
  },
  {
    icon: NotebookText,
    title: "Field notes",
    body: "The internet is powerful when people leave notes from real attempts, not only polished success stories.",
  },
  {
    icon: BadgeCheck,
    title: "Useful feedback",
    body: "The right people can point out gaps, suggest next steps, and help you turn confusion into direction.",
  },
  {
    icon: Globe,
    title: "Internet scale",
    body: "A small idea can meet the right collaborator, mentor, reader, or builder from anywhere in the world.",
  },
];

const heroTags = ["Build in public", "Ask clearly", "Move faster"];

export default function CommunityPage() {
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
            <span className="text-foreground/70">Community</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4622d] dark:border-white/[0.08] dark:bg-[#181818]">
                <Sparkles size={13} strokeWidth={2} />
                Builders together
              </p>
              <h1 className="mt-6 font-space text-4xl font-bold uppercase leading-[0.96] tracking-tight md:text-5xl">
                Our team.
              </h1>
              <p className="mt-5 font-space text-[15px] leading-8 text-muted-foreground md:text-base">
                TheOddOnes community is a focused internet room for builders who share progress, ask sharper questions, and help each other keep moving when the build gets messy.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {heroTags.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-full bg-card p-[7px] shadow-[0_6px_0_rgba(13,38,58,0.08),0_12px_24px_rgba(13,38,58,0.12)] ring-1 ring-black/[0.05] transition-transform duration-200 hover:-translate-y-1 dark:bg-[#181818] dark:shadow-[0_6px_0_rgba(0,0,0,0.24),0_12px_24px_rgba(0,0,0,0.32)] dark:ring-white/[0.06]"
                    style={{ rotate: `${[-2, 1.5, -1][index]}deg` }}
                  >
                    <div className="flex items-center gap-2 rounded-full bg-muted px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] dark:bg-[#242424] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                      <span className="size-1.5 shrink-0 rounded-full bg-[#c4622d]" />
                      <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#29445b] dark:text-[#c4a882]">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-2xl lg:mr-0">
              <Image
                src={communitySvg}
                alt="Online community"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c4622d]">
              Why community matters
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-foreground">
              The internet gets better when builders think out loud.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {communityCards.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group rounded-[30px] bg-card p-2.5 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-black/[0.05] transition-transform duration-300 hover:-translate-y-1 dark:bg-[#181818] dark:shadow-[0_14px_0_rgba(0,0,0,0.24),0_22px_42px_rgba(0,0,0,0.38)] dark:ring-white/[0.08]"
              >
                <div className="flex h-full min-h-[230px] flex-col rounded-[24px] border border-black/[0.04] bg-muted/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.08] dark:bg-[#242424] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span className="inline-flex size-12 items-center justify-center rounded-[14px] bg-card text-[#c4622d] shadow-[0_8px_18px_rgba(13,38,58,0.08)] ring-1 ring-black/[0.05] dark:bg-[#181818] dark:shadow-[0_10px_20px_rgba(0,0,0,0.28)] dark:ring-white/[0.08]">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div className="mt-auto pt-10">
                    <h3 className="font-heading text-xl font-semibold leading-tight text-foreground">
                      {title}
                    </h3>
                    <p className="mt-3 font-space text-sm leading-7 text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
