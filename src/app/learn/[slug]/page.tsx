import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Bot,
  Check,
  Clock3,
  Code2,
  FileText,
  FlaskConical,
  Layers3,
  Play,
  TestTube2,
  VideoOff,
  ChevronRight,
  Timer,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getLearningPath, learningPaths } from "@/lib/learning";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const pathIcons = {
  "go-lang": Code2,
  robotics: Bot,
  "manual-testing": TestTube2,
};

function getCurriculumTitle(
  item: (typeof learningPaths)[number]["curriculum"][number]
) {
  return typeof item === "string" ? item : item.moduleName;
}

export function generateStaticParams() {
  return learningPaths.map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) return { title: "Learning path not found | TheOddOnes" };
  return pageMetadata({
    title: path.name,
    description: path.description,
    path: `/learn/${path.slug}`,
  });
}

export default async function LearningDetailPage({ params }: Props) {
  const { slug } = await params;
  const path = getLearningPath(slug);
  if (!path) notFound();

  const Icon = pathIcons[path.slug as keyof typeof pathIcons] ?? Layers3;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: path.name,
    description: path.description,
    provider: {
      "@type": "Organization",
      name: "TheOddOnes",
    },
    coursePrerequisites: "Curiosity, persistence, and a willingness to build.",
    educationalCredentialAwarded: path.outcome,
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── HERO ── */}
      <section className="relative px-6 pb-0 pt-32 overflow-hidden">
        {/* faint grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto max-w-6xl">
          {/* breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              All paths
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">{path.name}</span>
          </nav>

          {/* two-col hero */}
          <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-end pb-16">
            {/* left — text */}
            <div>
              {/* pills */}
              <div className="mb-8 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 font-inter text-[10px] uppercase tracking-[0.2em] text-background">
                  <Icon size={12} strokeWidth={2.2} />
                  {path.label}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-foreground/12 px-3.5 py-1.5 font-inter text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  <Clock3 size={12} strokeWidth={1.8} />
                  {path.pace}
                </span>
              </div>

              {/* headline */}
              <h1
                className="font-space font-bold leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.4rem)" }}
              >
                {path.name}
              </h1>

              {/* description */}
              <p className="mt-8 max-w-xl font-inter text-base leading-relaxed text-foreground/55 md:text-[1.05rem]">
                {path.description}
              </p>

              {/* quick stats strip */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                {[
                  { icon: Layers3, label: path.signal },
                  { icon: FlaskConical, label: path.outcome },
                  {
                    icon: path.videos.available ? Play : VideoOff,
                    label: path.videos.available ? "Videos available" : "Videos coming soon",
                  },
                ].map(({ icon: StatIcon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-foreground/50">
                    <StatIcon size={14} strokeWidth={1.8} />
                    <span className="font-inter text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* right — thumbnail card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0c0c0c] p-8 text-white aspect-[4/3] flex flex-col justify-between">
              {/* dot-grid bg */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              {/* top row */}
              <div className="relative flex items-start justify-between">
                <span className="font-inter text-[10px] uppercase tracking-[0.28em] text-white/25">
                  Thumbnail · Soon
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 text-white/50">
                  <Icon size={18} strokeWidth={1.7} />
                </div>
              </div>
              {/* center placeholder */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.025] px-8 py-6 text-center w-full">
                  <p className="font-space text-2xl font-bold text-white/18">{path.name}</p>
                  <p className="mt-2 font-inter text-xs text-white/28 leading-relaxed">
                    Real thumbnail drops when videos go live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom border */}
        <div className="border-t border-black/8 dark:border-white/[0.07]" />
      </section>

      {/* ── STATS ROW ── */}
      <section className="px-6 py-0">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 divide-y divide-black/8 dark:divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { label: "Outcome", value: path.outcome, icon: FlaskConical },
              { label: "Signal", value: path.signal, icon: Layers3 },
              {
                label: "Videos",
                value: path.videos.available ? "Available soon" : "Not live yet",
                icon: path.videos.available ? Play : VideoOff,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-5 px-0 py-10 sm:px-10 first:pl-0 last:pr-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/6 text-foreground/50 dark:bg-white/6">
                  <item.icon size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-[0.22em] text-foreground/30">
                    {item.label}
                  </p>
                  <p className="mt-2 font-space text-lg font-semibold leading-snug">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-black/8 dark:border-white/[0.07] mx-auto max-w-6xl" />
      </section>

      {/* ── CURRICULUM ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* section header */}
          <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/30">
                Curriculum
              </p>
              <h2 className="font-space text-4xl font-bold leading-tight sm:text-5xl">
                What you&apos;ll
                actually learn.
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 w-fit">
              <BookOpen size={13} strokeWidth={1.8} className="text-foreground/40" />
              <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/40">
                {path.curriculum.length} Modules
              </span>
            </div>
          </div>

          {/* module list */}
          <div className="space-y-0 divide-y divide-black/7 dark:divide-white/[0.06] border-y border-black/7 dark:border-white/[0.06]">
            {path.curriculum.map((item, index) => (
              <div
                key={getCurriculumTitle(item)}
                className="group grid gap-6 py-8 sm:grid-cols-[5rem_1fr] sm:gap-10 transition-colors hover:bg-foreground/[0.025]"
              >
                {/* module number */}
                <div className="flex items-start gap-3 sm:flex-col sm:gap-0">
                  <p className="font-inter text-md md:text-xl uppercase tracking-[0.22em] text-foreground/25 pt-1 sm:pt-0">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>

                {/* content */}
                <div className="flex gap-5">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Check size={12} strokeWidth={2.5} />
                  </span>

                  {typeof item === "string" ? (
                    <p className="font-space text-xl font-semibold leading-snug pt-0.5">
                      {item}
                    </p>
                  ) : (
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="font-space text-xl font-semibold leading-snug">
                          {item.moduleName}
                        </h3>
                        <span className="shrink-0 rounded-full border border-foreground/10 px-2.5 py-1 font-inter text-[9px] uppercase tracking-[0.2em] text-foreground/35">
                          {item.topic}
                        </span>
                      </div>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {item.keyConcepts.map((concept) => (
                          <li key={concept} className="flex items-start gap-2.5 font-inter text-sm leading-relaxed text-foreground/55">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                            {concept}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section className="px-6 py-20 bg-background">
        <div className="mx-auto max-w-6xl">
          {/* section header */}
          <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/30">
                Videos
              </p>
              <h2 className="font-space text-4xl font-bold leading-tight sm:text-5xl">
                Watch & build.
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 w-fit">
              <Play size={13} strokeWidth={1.8} className="text-foreground/40" />
              <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/40">
                {path.videos.items.length} Videos
              </span>
            </div>
          </div>

          {/* video grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {path.videos.items.map((video, index) => (
              <Link
                key={video.title}
                href={`/learn/${slug}/watch?v=${index}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-foreground/[0.02] p-7 transition-all duration-200 hover:border-foreground/20 hover:bg-foreground/[0.04] dark:border-white/[0.07] dark:hover:border-white/20 dark:bg-white/[0.015] dark:hover:bg-white/[0.03]"
              >
                {/* status + length */}
                <div className="mb-6 flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 font-inter text-[10px] uppercase tracking-[0.18em] ${
                    video.status.toLowerCase().includes("available")
                      ? "bg-secondary text-white"
                      : "bg-foreground/7 text-foreground/60 dark:bg-white/10"
                  }`}>
                    {video.status}
                  </span>
                  <span className="flex items-center gap-1.5 font-inter text-[11px] text-foreground/30">
                    <Clock3 size={11} strokeWidth={1.8} />
                    {video.length}
                  </span>
                </div>

                {/* title */}
                <h3 className="font-space text-xl font-semibold leading-snug transition-opacity group-hover:opacity-75">
                  {video.title}
                </h3>

                {/* fake thumbnail area */}
                <div className="mt-6 aspect-video w-full rounded-xl bg-foreground/5 dark:bg-white/5 flex items-center justify-center border border-foreground/10 dark:border-white/10 group-hover:border-foreground/20 transition-colors">
                   <Play size={24} className="text-foreground/20 group-hover:text-foreground/40 transition-colors" />
                </div>

                {/* action */}
                <div className="mt-7 flex items-center justify-between font-inter text-xs text-foreground/30 transition-colors group-hover:text-foreground/60">
                  <span>Watch video</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 dark:bg-white/5 group-hover:bg-foreground/10 dark:group-hover:bg-white/10 transition-colors">
                    <Play size={13} strokeWidth={2} className="ml-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {path.videos.items.length === 0 && (
             <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-12 text-center">
                <p className="font-inter text-sm text-foreground/40">Videos are currently being drafted for this course.</p>
             </div>
          )}
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section className="px-6 py-20 bg-foreground/[0.02] dark:bg-white/[0.015]">
        <div className="mx-auto max-w-6xl">
          {/* section header */}
          <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            {/* <div>
              <p className="mb-3 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/30">
                Articles
              </p>
              <h2 className="font-space text-4xl font-bold leading-tight sm:text-5xl">
                Short like X.
                <br />
                Deep like Medium.
              </h2>
            </div> */}
            <div className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 w-fit">
              <FileText size={13} strokeWidth={1.8} className="text-foreground/40" />
              <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/40">
                {path.articles.length} Articles
              </span>
            </div>
          </div>

          {/* article grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {path.articles.map((article) => (
              <article
                key={article.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-background p-7 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm dark:border-white/[0.07] dark:hover:border-white/20"
              >
                {/* type + read time */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="rounded-full bg-foreground/7 px-3 py-1 font-inter text-[10px] uppercase tracking-[0.18em] text-foreground/60 dark:bg-white/10">
                    {article.type}
                  </span>
                  <span className="flex items-center gap-1.5 font-inter text-[11px] text-foreground/30">
                    <Timer size={11} strokeWidth={1.8} />
                    {article.readTime}
                  </span>
                </div>

                {/* title */}
                <h3 className="font-space text-xl font-semibold leading-snug transition-opacity group-hover:opacity-75">
                  {article.title}
                </h3>

                {/* excerpt */}
                <p className="mt-4 flex-1 font-inter text-sm leading-relaxed text-foreground/50">
                  {article.excerpt}
                </p>

                {/* arrow hint */}
                <div className="mt-7 flex items-center gap-1.5 font-inter text-xs text-foreground/30 transition-colors group-hover:text-foreground/60">
                  <span>Read article</span>
                  <ChevronRight size={13} strokeWidth={1.8} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>



    </main>
  );
}
