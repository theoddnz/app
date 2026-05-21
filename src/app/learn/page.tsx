import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Learning Paths",
  description:
    "Explore TheOddOnes learning paths: guided, build-first routes for people who learn by making things and sharing progress.",
  path: "/learn",
  keywords: ["learning paths", "guided learning paths", "build first learning", "project based learning"],
});
import {
  ArrowUpRight,
  Bot,
  ChevronRight,
  Clock3,
  Code2,
  Home,
  TestTube2,
} from "@/components/ui/huge-icons";
import { getLearningPaths } from "@/lib/learning";

export const dynamic = "force-dynamic";

const pathIcons = {
  "go-lang": Code2,
  robotics: Bot,
  "manual-testing": TestTube2,
};

export default async function LearnPage() {
  const learningPaths = await getLearningPaths();

  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="px-6 pb-14 pt-36 border-b border-black/6 dark:border-white/[0.06] font-space">
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
            <span className="text-foreground/70">Learning paths</span>
          </nav>

       

          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <h1
              className="font-space md:text-md lg:text-4xl font-bold leading-[0.95] tracking-tight"
    
            >
              Pick a path.

            </h1>
            {/* <p className="max-w-md font-inter text-sm leading-relaxed text-foreground/55 md:justify-self-end">
              These are not courses in the usual sense. They are guided build paths:
              cards, field notes, articles, curriculum, and video slots around the
              way people actually learn.
            </p> */}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        {learningPaths.length === 0 ? (
          <ComingSoonCard/>
        ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-2xl bg-black/6 dark:bg-white/[0.08] md:grid-cols-3">
          {learningPaths.map((path, index) => {
            const Icon = pathIcons[path.slug as keyof typeof pathIcons] ?? Code2;

            return (
              <Link
                key={path.slug}
                href={`/learn/${path.slug}`}
                className="group flex min-h-[520px] flex-col bg-background transition-colors duration-200 hover:bg-[#f5f3f0] dark:hover:bg-white/[0.04]"
              >
                <div className="relative min-h-[300px] overflow-hidden bg-[#0a0a0a] p-6">
                  {path.thumbnailUrl ? (
                    <img
                      src={path.thumbnailUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="relative flex h-full min-h-[150px] flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.18em] text-black">
                        <Icon size={12} strokeWidth={2} />
                        {path.label}
                      </span>
                      <span className="font-space text-4xl font-bold text-white/10">
                        0{index + 1}
                      </span>
                    </div>
                    <div>
                      {/* <p className="font-inter text-[10px] uppercase tracking-[0.22em] text-white/25">
                        {path.thumbnailNote}
                      </p> */}
                      <div className="mt-3 flex h-20 items-center justify-center rounded-lg border border-dashed border-white/14 bg-black/20 text-white/70 backdrop-blur-sm">
                        <Icon size={30} strokeWidth={1.6} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <h2 className="font-space text-2xl font-bold leading-tight text-foreground transition-opacity group-hover:opacity-65">
                      {path.name}
                    </h2>
                    <p className="mt-4 font-inter text-sm leading-relaxed text-foreground/55 font-space">
                      {path.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-black/6 pt-5 dark:border-white/[0.06]">
                    <div className="mb-5 flex items-center gap-2 text-foreground/40">
                      <Clock3 size={14} strokeWidth={1.8} />
                      <span className="font-inter text-[11px] uppercase tracking-[0.16em]">
                        {path.pace}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-sm text-foreground/45 transition-colors group-hover:text-foreground">
                        Open path
                      </span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.8}
                        className="text-foreground/25 transition-colors group-hover:text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        )}
      </section>

    </main>
  );
}



 function ComingSoonCard() {
  return (
    <div className="mx-auto max-w-6xl rounded-2xl border border-dashed border-black/10 px-8 py-16 text-center dark:border-white/10">

      {/* flame / heat SVG — "cooking something great" */}
      <div className="mx-auto mb-8 flex items-end justify-center gap-3">
        {/* left flame — smaller */}
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none" aria-hidden className="opacity-40 dark:opacity-30">
          <path
            d="M12 2C12 2 6 10 6 17c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3-2-6-2-6s0 4-4 4c0 0 2-6 0-13z"
            fill="#c4622d"
          />
        </svg>

        {/* center flame — main, tall */}
        <svg width="36" height="54" viewBox="0 0 36 54" fill="none" aria-hidden className="opacity-80 dark:opacity-70">
          <path
            d="M18 2C18 2 4 16 4 28c0 7.73 6.27 14 14 14s14-6.27 14-14c0-6-4-11-4-11s1 8-6 10c0 0 4-12 0-25z"
            fill="#c4622d"
          />
          <path
            d="M18 16C18 16 11 24 11 30c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3-2-5.5-2-5.5s0 4-3 5c0 0 2-6 0-13.5z"
            fill="#e8855a"
            opacity="0.6"
          />
        </svg>

        {/* right flame — smaller */}
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none" aria-hidden className="opacity-40 dark:opacity-30">
          <path
            d="M12 2C12 2 6 10 6 17c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3-2-6-2-6s0 4-4 4c0 0 2-6 0-13z"
            fill="#c4622d"
          />
        </svg>
      </div>

      {/* label */}
      <span className="font-space text-[10.5px] font-medium tracking-[0.22em] text-muted-foreground/50 uppercase">
        Coming soon
      </span>

      {/* heading */}
      <h2 className="mt-3 font-space text-[1.75rem] font-bold leading-[1.1] tracking-[-0.03em] text-foreground md:text-3xl">
        We&apos;re cooking something{" "}
        <span className="text-foreground/40">insanely great.</span>
      </h2>

      {/* body */}
      <p className="mx-auto mt-4 max-w-sm font-space text-[14px] font-light leading-relaxed text-foreground/45">
        The paths are still under wraps. A few beautiful things need heat,
        patience, and one more thing.
      </p>

      {/* subtle progress dots — "heat & patience" */}
      <div className="mx-auto mt-8 flex items-center justify-center gap-2">
        <span className="size-1.5 rounded-full bg-secondary/80" />
        <span className="size-1.5 rounded-full bg-secondary/40" />
        <span className="size-1.5 rounded-full bg-foreground/10" />
      </div>

    </div>
  );
}