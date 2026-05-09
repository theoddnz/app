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
  Image as ImageIcon
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
    <main className="min-h-screen bg-background text-foreground font-space">
      {/* ── HERO HEADER ── */}
      <header className="relative overflow-hidden px-6 pb-0 pt-32">
        {/* faint dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto max-w-4xl">
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
            <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/40">
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/40">
              <Clock3 size={11} strokeWidth={1.8} />
              {post.readTime} read
            </span>
          </div>

          {/* headline */}
          <h1
            className="font-space font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.6rem)" }}
          >
            {post.title}
          </h1>

          {/* dek */}
          <p className="mt-8 font-inter text-lg leading-[1.8] text-foreground/60 md:text-xl">
            {post.dek}
          </p>

          {/* author + share row */}
          <div className="mt-12 flex items-center justify-between border-y border-black/8 py-6 dark:border-white/[0.08]">
            <div className="flex items-center gap-4">
              {/* avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/5 dark:bg-white/5 font-space text-sm font-bold text-foreground/60 border border-foreground/10 dark:border-white/10">
                {post.author?.charAt(0) ?? "O"}
              </div>
              <div>
                <p className="font-inter text-sm font-medium text-foreground/80">
                  {post.author}
                </p>
                <p className="font-inter text-xs text-foreground/40 mt-0.5">
                  Built, broken, repaired, written down.
                </p>
              </div>
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 dark:bg-white/5 text-foreground/40 transition-colors hover:bg-foreground/10 dark:hover:bg-white/10 hover:text-foreground"
              aria-label="Share article"
            >
              <Share2 size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* ── COVER IMAGE SLOT ── */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="relative min-h-[300px] md:min-h-[440px] flex items-center justify-center overflow-hidden rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/[0.07]">
             <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="h-16 w-16 mb-4 rounded-full bg-foreground/5 dark:bg-white/5 flex items-center justify-center">
                   <ImageIcon size={24} strokeWidth={1.5} className="text-foreground/20" />
                </div>
                <p className="font-inter text-sm font-medium text-foreground/40">Article Cover</p>
                <p className="mt-1 font-inter text-xs text-foreground/30 uppercase tracking-widest">Coming soon</p>
             </div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <article className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-16">
            {post.sections.map((section) => (
              <section key={section.heading} className="relative">
                {/* heading */}
                <h2 className="font-space text-2xl font-bold leading-tight md:text-3xl text-foreground mb-6">
                  {section.heading}
                </h2>

                {/* body paragraphs */}
                <div className="space-y-6">
                  {section.body.map((paragraph, pi) => (
                    <p
                      key={pi}
                      className="font-inter text-lg leading-[1.8] text-foreground/70"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ── END OF ARTICLE MARK ── */}
          <div className="mt-24 flex items-center gap-5">
            <div className="h-px flex-1 bg-foreground/8 dark:bg-white/10" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 dark:border-white/10 bg-foreground/5 dark:bg-white/5">
              <BookOpen size={14} strokeWidth={1.8} className="text-foreground/40" />
            </div>
            <div className="h-px flex-1 bg-foreground/8 dark:bg-white/10" />
          </div>

          {/* ── TAGS + SHARE ── */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2.5">
              {[post.tag, "TheOddOnes", "Field Notes"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-4 py-2 font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/50 bg-foreground/5 dark:bg-white/5"
                >
                  <Hash size={10} strokeWidth={2} className="opacity-60" />
                  {t}
                </span>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-2 font-inter text-xs font-medium text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10">
              <Share2 size={13} strokeWidth={1.8} />
              Share Article
            </button>
          </div>
        </div>
      </article>

      {/* ── RELATED POSTS ── */}
      <section className="border-t border-black/8 px-6 py-24 dark:border-white/[0.07] bg-foreground/[0.015] dark:bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          {/* label + cta */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/40">
                Keep reading
              </p>
              <h2 className="font-space text-3xl font-bold">More field notes.</h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-2.5 font-inter text-xs font-medium text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10"
            >
              View all posts <ArrowUpRight size={14} strokeWidth={1.8} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blogs/${item.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-black/8 bg-background p-6 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm dark:border-white/[0.07] dark:hover:border-white/20 min-h-[260px]"
              >
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.18em] ${tagColors[item.tag]}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-space text-xl font-semibold leading-snug text-foreground transition-opacity group-hover:opacity-75">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 font-inter text-sm leading-relaxed text-foreground/50">
                    {item.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-black/8 pt-4 dark:border-white/[0.07]">
                  <div className="flex items-center gap-2 font-inter text-[10px] uppercase tracking-[0.15em] text-foreground/40">
                     <span className="flex items-center gap-1">
                        <Clock3 size={11} strokeWidth={1.8} />
                        {item.readTime}
                     </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    className="text-foreground/30 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
