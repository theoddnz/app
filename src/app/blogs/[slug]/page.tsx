import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, Share2 } from "lucide-react";
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

  if (!post) {
    return {
      title: "Article not found | TheOddOnes",
    };
  }

  return {
    title: `${post.title} | TheOddOnes`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <article className="px-6 pt-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/blogs"
            className="mb-10 inline-flex items-center gap-2 font-inter text-sm text-foreground/45 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            Field notes
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.18em] ${tagColors[post.tag]}`}
            >
              {post.tag}
            </span>
            <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/35">
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/35">
              <Clock3 size={13} strokeWidth={1.8} />
              {post.readTime}
            </span>
          </div>

          <h1
            className="font-space font-bold leading-[0.98] tracking-tight"
            style={{ fontSize: "clamp(2.7rem, 7vw, 5.4rem)" }}
          >
            {post.title}
          </h1>

          <p className="mt-7 font-inter text-xl leading-relaxed text-foreground/58">
            {post.dek}
          </p>

          <div className="mt-9 flex items-center justify-between border-y border-black/8 py-4 dark:border-white/[0.08]">
            <div>
              <p className="font-inter text-sm text-foreground/70">{post.author}</p>
              <p className="mt-1 font-inter text-xs text-foreground/35">
                Built, broken, repaired, written down.
              </p>
            </div>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground/45 transition-colors hover:border-foreground/25 hover:text-foreground"
              aria-label="Share article"
            >
              <Share2 size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="mx-auto my-12 max-w-6xl">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#0a0a0a] p-8 md:min-h-[360px] md:p-10">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative flex min-h-[220px] flex-col justify-between md:min-h-[280px]">
              <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-white/30">
                Article cover
              </p>
              <p className="max-w-xl font-space text-4xl font-bold leading-tight text-white/20 md:text-6xl">
                {post.tag}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto  max-w-6xl pb-20">
          {post.sections.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-space text-3xl font-bold leading-tight">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-6">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-inter text-[1.08rem] leading-[1.9] text-foreground/72"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <section className="border-t border-black/6 px-6 py-16 dark:border-white/[0.06]">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 font-inter text-[11px] uppercase tracking-[0.24em] text-foreground/35">
            Keep reading
          </p>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-black/6 dark:bg-white/[0.08] md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blogs/${item.slug}`}
                className="group bg-background p-7 transition-colors hover:bg-[#f5f3f0] dark:hover:bg-white/[0.04]"
              >
                <span
                  className={`rounded-full px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.18em] ${tagColors[item.tag]}`}
                >
                  {item.tag}
                </span>
                <h3 className="mt-5 font-space text-xl font-semibold leading-tight transition-opacity group-hover:opacity-65">
                  {item.title}
                </h3>
                <p className="mt-4 font-inter text-sm leading-relaxed text-foreground/50">
                  {item.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
