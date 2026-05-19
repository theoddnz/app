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
} from "lucide-react";
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
          <div className="mx-auto max-w-6xl rounded-2xl border border-dashed border-black/10 px-8 py-16 text-center dark:border-white/10">
            <h2 className="font-space text-3xl font-bold">We&apos;re cooking something insanely great.</h2>
            <p className="mx-auto mt-4 max-w-md font-inter text-sm leading-6 text-foreground/45">
              The paths are still under wraps. A few beautiful things need heat, patience, and one more thing.
            </p>
          </div>
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
