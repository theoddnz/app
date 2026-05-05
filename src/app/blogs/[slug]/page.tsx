import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  Share2,
  ChevronRight,
  ArrowUpRight,
  BookOpen,
  Hash,
} from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPost, posts, tagColors } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found | TheOddOnes" };
  return {
    title: `${post.title} | TheOddOnes`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO HEADER ── */}
      <header className="relative overflow-hidden px-6 pb-0 pt-32">
        {/* faint dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="mx-auto max-w-3xl">
          {/* breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Field notes
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">{post.tag}</span>
          </nav>

          {/* meta row */}
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1.5 font-inter text-[10px] uppercase tracking-[0.22em] ${tagColors[post.tag]}`}
            >
              {post.tag}
            </span>
            <span className="h-px w-4 bg-foreground/15" />
            <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/32">
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/32">
              <Clock3 size={11} strokeWidth={1.8} />
              {post.readTime}
            </span>
          </div>

          {/* headline — editorial large */}
          <h1
            className="font-space font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.6rem)" }}
          >
            {post.title}
          </h1>

          {/* dek — article sub-headline */}
          <p className="mt-7 font-inter text-lg leading-[1.8] text-foreground/55 md:text-xl">
            {post.dek}
          </p>

          {/* author + share row */}
          <div className="mt-10 flex items-center justify-between border-y border-black/8 py-5 dark:border-white/[0.08]">
            <div className="flex items-center gap-4">
              {/* avatar placeholder */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/8 font-space text-sm font-bold text-foreground/40">
                {post.author?.charAt(0) ?? "O"}
              </div>
              <div>
                <p className="font-inter text-sm font-medium text-foreground/75">
                  {post.author}
                </p>
                <p className="font-inter text-xs text-foreground/32">
                  Built, broken, repaired, written down.
                </p>
              </div>
            </div>

            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/38 transition-colors hover:border-foreground/25 hover:text-foreground"
              aria-label="Share article"
            >
              <Share2 size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* bottom fade line */}
        <div className="mt-12 border-t border-black/6 dark:border-white/[0.06]" />
      </header>

      {/* ── COVER IMAGE SLOT ── */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[#0c0c0c] md:min-h-[340px]">
            {/* grid lines */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            {/* ghost tag word */}
            <p
              aria-hidden
              className="absolute bottom-6 left-8 select-none font-space text-[7rem] font-extrabold leading-none text-white/[0.055] md:text-[10rem]"
            >
              {post.tag}
            </p>
            {/* cover label */}
            <p className="relative p-7 font-inter text-[10px] uppercase tracking-[0.28em] text-white/22">
              Article cover · Coming soon
            </p>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      {/*
        Layout: narrow 3-col on desktop —
        [sticky side label] [prose] [nothing / future TOC]
        On mobile: single column, full width
      */}
      <article className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-16">
            {post.sections.map((section, i) => (
              <section key={section.heading} className="relative">
                {/* section number — decorative */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-inter text-[10px] uppercase tracking-[0.26em] text-foreground/22">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-foreground/8" />
                </div>

                {/* heading */}
                <h2 className="font-space text-2xl font-bold leading-tight md:text-[1.85rem]">
                  {section.heading}
                </h2>

                {/* body paragraphs */}
                <div className="mt-6 space-y-5">
                  {section.body.map((paragraph, pi) => (
                    <p
                      key={pi}
                      className="font-inter text-[1.05rem] leading-[1.95] text-foreground/68"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ── END OF ARTICLE MARK ── */}
          <div className="mt-20 flex items-center gap-5">
            <div className="h-px flex-1 bg-foreground/8" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10">
              <BookOpen size={13} strokeWidth={1.8} className="text-foreground/35" />
            </div>
            <div className="h-px flex-1 bg-foreground/8" />
          </div>

          {/* ── TAGS + SHARE ── */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {[post.tag, "TheOddOnes", "Field Notes"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full border border-foreground/10 px-3 py-1.5 font-inter text-[10px] uppercase tracking-[0.18em] text-foreground/38"
                >
                  <Hash size={9} strokeWidth={2} />
                  {t}
                </span>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 font-inter text-xs text-foreground/40 transition-colors hover:border-foreground/25 hover:text-foreground">
              <Share2 size={12} strokeWidth={1.8} />
              Share
            </button>
          </div>
        </div>
      </article>

      {/* ── RELATED POSTS ── */}
      <section className="border-t border-black/6 px-6 py-20 dark:border-white/[0.06]">
        <div className="mx-auto max-w-3xl">
          {/* label + cta */}
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/28">
                Keep reading
              </p>
              <h2 className="font-space text-2xl font-bold">More field notes.</h2>
            </div>
            <Link
              href="/blogs"
              className="flex items-center gap-1 font-inter text-xs text-foreground/35 transition-colors hover:text-foreground"
            >
              All posts <ArrowUpRight size={13} strokeWidth={1.8} />
            </Link>
          </div>

          {/* related card list — stacked vertical for readable focus */}
          <div className="space-y-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blogs/${item.slug}`}
                className="group flex items-start justify-between gap-6 rounded-2xl border border-black/7 bg-background p-6 transition-all hover:border-black/16 dark:border-white/[0.07] dark:hover:border-white/16"
              >
                <div className="flex-1 min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span
                      className={`rounded-full px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.18em] ${tagColors[item.tag]}`}
                    >
                      {item.tag}
                    </span>
                    <span className="font-inter text-[10px] uppercase tracking-[0.15em] text-foreground/28">
                      {item.readTime}
                    </span>
                  </div>
                  <h3 className="font-space text-lg font-semibold leading-snug text-foreground transition-opacity group-hover:opacity-65">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 font-inter text-sm leading-relaxed text-foreground/45">
                    {item.excerpt}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                  className="mt-1 shrink-0 text-foreground/20 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
