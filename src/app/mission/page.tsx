import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Code2, GitMerge, Home, NotebookText, Wrench } from "@/components/ui/tabler-icons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mission - Build-First Robotics and Software Learning",
  description:
    "TheOddOnes mission is to turn passive tutorials into real robotics, ROS2, drone, software, and embedded systems projects with useful feedback.",
  path: "/mission",
  keywords: [
    "TheOddOnes mission",
    "build first learning mission",
    "robotics education mission",
    "ROS2 learning mission",
    "project based learning mission",
    "people who learn differently",
  ],
});

function InlineIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-1 inline-flex size-10 translate-y-1 items-center justify-center rounded-md border border-border bg-muted text-[#c4622d] dark:border-white/[0.08] dark:bg-[#181818]">
      {children}
    </span>
  );
}

function InlineLogo() {
  return (
    <span className="mx-1 inline-flex size-10 translate-y-1 items-center justify-center rounded-md border border-border bg-muted dark:border-white/[0.08] dark:bg-[#181818]">
      <Image
        src="/assets/theoddones-white-logo.png"
        alt="TheOddOnes"
        width={30}
        height={30}
        className="size-6 object-contain dark:hidden"
      />
      <Image
        src="/assets/theoddones-black-logo.png"
        alt="TheOddOnes"
        width={30}
        height={30}
        className="hidden size-4 object-contain dark:block"
      />
    </span>
  );
}

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-[#131313]">
      <section className="border-b border-black/6 px-6 pb-14 pt-36 dark:border-white/[0.06]">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Home size={14} strokeWidth={2} />
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">Mission</span>
          </nav>

          <h1 className="font-space text-4xl font-bold leading-[0.95] tracking-tight">
            Our mission.
          </h1>
        </div>
      </section>

      <section className="flex items-center px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto w-full max-w-4xl">
          <blockquote className="font-space text-[clamp(1.05rem,1.9vw,1.45rem)] font-normal leading-8 text-foreground/78 md:leading-9">
            <p>
              &ldquo;The internet already has enough tutorials, courses, playlists, and guides. The problem is not access to information. The real problem begins after the video ends, when you are alone with an empty editor <InlineIcon><Code2 className="size-3.5" /></InlineIcon>, a loose wire, a broken build, or an idea that suddenly feels too big.
            </p>

            <p className="mt-6">
              Most platforms teach you what to watch next. We care about{" "}
              <span className="font-medium text-foreground underline decoration-[#c4622d] decoration-2 underline-offset-4">
                what you make next
              </span>
              <InlineLogo />. Understanding does not come from watching someone else solve the hard part. It comes from meeting the hard part yourself, getting stuck, asking a sharper question, and trying again with better instincts.
            </p>

            <p className="mt-6">
              TheOddOnes is for builders, tinkerers, robotics obsessives, and people who never felt fully served by passive learning. We want learning to feel like a workshop:{" "}
              <span className="font-medium text-foreground underline decoration-[#c4622d] decoration-2 underline-offset-4">
                focused, messy, honest
              </span>
              <InlineIcon><Wrench className="size-3.5" /></InlineIcon>, and full of visible progress.
            </p>

            <p className="mt-6">
              Not another course platform. A place for people who learn by making the real thing, by showing the unfinished parts, by turning confusion into notes <InlineIcon><NotebookText className="size-3.5" /></InlineIcon>, questions into experiments, and small working pieces into confidence.
            </p>

            <p className="mt-6">
              We believe the best learning has evidence. It leaves behind commits <InlineIcon><GitMerge className="size-3.5" /></InlineIcon>, circuits, sketches, field notes, demos, repairs, and explanations. The goal is not to look smart while learning. The goal is to become capable enough to{" "}
              <span className="font-medium text-foreground underline decoration-[#c4622d] decoration-2 underline-offset-4">
                build without waiting for permission
              </span>
              .&rdquo;
            </p>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
