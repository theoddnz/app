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
} from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLearningPath, learningPaths } from "@/lib/learning";

type Props = {
  params: Promise<{ slug: string }>;
};

const pathIcons = {
  "go-lang": Code2,
  robotics: Bot,
  "manual-testing": TestTube2,
};

export function generateStaticParams() {
  return learningPaths.map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPath(slug);

  if (!path) {
    return {
      title: "Learning path not found | TheOddOnes",
    };
  }

  return {
    title: `${path.name} | TheOddOnes`,
    description: path.description,
  };
}

export default async function LearningDetailPage({ params }: Props) {
  const { slug } = await params;
  const path = getLearningPath(slug);

  if (!path) {
    notFound();
  }

  const Icon = pathIcons[path.slug as keyof typeof pathIcons] ?? Layers3;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="px-6 pb-10 pt-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/learn"
            className="mb-8 inline-flex items-center gap-2 font-inter text-sm text-foreground/45 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            All paths
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 font-inter text-[10px] uppercase tracking-[0.18em] text-background">
                  <Icon size={13} strokeWidth={2} />
                  {path.label}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-3 py-1.5 font-inter text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  <Clock3 size={13} strokeWidth={1.8} />
                  {path.pace}
                </span>
              </div>

              <h1
                className="font-space font-bold leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(3.4rem, 8vw, 6.8rem)" }}
              >
                {path.name}
              </h1>
              <p className="mt-7 max-w-2xl font-inter text-lg leading-relaxed text-foreground/60">
                {path.description}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-7 text-white">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
              />
              <div className="relative flex min-h-[340px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-white/35">
                    Thumbnail slot
                  </p>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/72">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>
                </div>

                <div className="rounded-xl border border-dashed border-white/16 bg-white/[0.03] p-6">
                  <p className="font-space text-3xl font-bold text-white/22">
                    {path.name}
                  </p>
                  <p className="mt-3 max-w-sm font-inter text-sm leading-relaxed text-white/42">
                    Empty now, ready for the real thumbnail later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-2xl bg-black/6 dark:bg-white/[0.08] md:grid-cols-3">
          {[
            { label: "Outcome", value: path.outcome, icon: FlaskConical },
            { label: "Signal", value: path.signal, icon: Layers3 },
            {
              label: "Videos",
              value: path.videos.available ? "Available soon" : "Not live yet",
              icon: path.videos.available ? Play : VideoOff,
            },
          ].map((item) => (
            <div key={item.label} className="bg-background p-7">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f3f0] text-foreground/70 dark:bg-white/8">
                <item.icon size={18} strokeWidth={1.8} />
              </div>
              <p className="font-inter text-[11px] uppercase tracking-[0.22em] text-foreground/35">
                {item.label}
              </p>
              <p className="mt-3 font-space text-lg font-semibold leading-snug">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background">
              <BookOpen size={19} strokeWidth={1.9} />
            </div>
            <p className="mb-4 font-inter text-[11px] uppercase tracking-[0.24em] text-foreground/35">
              Curriculum
            </p>
            <h2 className="font-space text-4xl font-bold leading-tight">
              One clean path.
              <br />
              Five real moves.
            </h2>
          </div>

          <div className="divide-y divide-black/8 border-y border-black/8 dark:divide-white/[0.08] dark:border-white/[0.08]">
            {path.curriculum.map((item, index) => (
              <div key={item} className="grid gap-4 py-6 sm:grid-cols-[7rem_1fr]">
                <p className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/30">
                  Module {index + 1}
                </p>
                <div className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Check size={14} strokeWidth={2} />
                  </span>
                  <p className="font-space text-xl font-semibold leading-snug">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f3f0] text-foreground/70 dark:bg-white/8">
              <FileText size={19} strokeWidth={1.9} />
            </div>
            <p className="mb-4 font-inter text-[11px] uppercase tracking-[0.24em] text-foreground/35">
              Articles
            </p>
            <h2 className="font-space text-4xl font-bold leading-tight">
              Short like X.
              <br />
              Deep like Medium.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-black/6 dark:bg-white/[0.08] md:grid-cols-2">
            {path.articles.map((article) => (
              <article
                key={article.title}
                className="group min-h-[260px] bg-background p-7 transition-colors hover:bg-[#f5f3f0] dark:hover:bg-white/[0.04]"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#f0eeeb] px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.18em] text-black dark:bg-white/10 dark:text-white/70">
                    {article.type}
                  </span>
                  <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/30">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-space text-2xl font-semibold leading-tight transition-opacity group-hover:opacity-65">
                  {article.title}
                </h3>
                <p className="mt-4 font-inter text-sm leading-relaxed text-foreground/55">
                  {article.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#0a0a0a] p-8 text-white md:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div>
              <p className="font-inter text-[11px] uppercase tracking-[0.24em] text-white/30">
                Video bench
              </p>
              <h2 className="mt-3 font-space text-3xl font-bold leading-tight">
                {path.videos.available
                  ? "Build-along videos are mapped."
                  : "Videos are not live yet."}
              </h2>
              <p className="mt-4 max-w-xl font-inter text-sm leading-relaxed text-white/48">
                {path.videos.note}
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70">
              {path.videos.available ? <Play size={20} /> : <VideoOff size={20} />}
            </div>
          </div>

          {path.videos.items.length > 0 && (
            <div className="mt-8 grid gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-2">
              {path.videos.items.map((video) => (
                <div key={video.title} className="bg-[#0a0a0a] p-5">
                  <p className="font-space text-lg font-semibold">{video.title}</p>
                  <p className="mt-3 font-inter text-[11px] uppercase tracking-[0.18em] text-white/32">
                    {video.length} / {video.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
