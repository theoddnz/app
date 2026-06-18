import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Sparkles } from "@/components/ui/tabler-icons";
import { ShareButton } from "@/components/blog/ShareButton";
import { POSTS, getPost, type Block } from "@/lib/blog-data";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-12 mb-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="my-10 border-l-2 border-[#c4622d] pl-6 font-heading text-xl font-medium leading-relaxed text-foreground/80 sm:text-2xl"
        >
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-lg leading-8 text-foreground/70">
              <span className="mt-3 size-1.5 shrink-0 rounded-full bg-[#c4622d]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "video":
      return (
        <figure key={index} className="my-10">
          <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
              title={block.caption ?? "Video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full"
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-center text-sm text-foreground/45">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    default:
      return (
        <p key={index} className="my-5 text-lg leading-8 text-foreground/70">
          {block.text}
        </p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background px-6 pt-32 pb-24 text-foreground font-space">
      <article className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to blog
          </Link>
          <ShareButton title={post.title} />
        </div>

        <div className="mt-10 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="inline-flex rounded-md bg-[#c4622d]/12 px-2.5 py-1 text-[#c4622d]">
            {post.category}
          </span>
          <span className="text-foreground/30">·</span>
          <span className="text-foreground/45">{post.readingTime}</span>
        </div>

        <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-lg leading-7 text-foreground/55">{post.excerpt}</p>

        <div className="mt-8 flex items-center gap-3 border-b border-border pb-8">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#c4622d]/15 text-sm font-bold text-[#c4622d]">
            {post.author.charAt(0)}
          </span>
          <div className="text-sm">
            <p className="font-semibold text-foreground/85">{post.author}</p>
            <p className="text-foreground/50">
              {post.role} · {post.date}
            </p>
          </div>
          <div className="ml-auto">
            <ShareButton title={post.title} />
          </div>
        </div>

        {/* Cover */}
        <div
          className={`mt-10 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br ${post.gradient}`}
        >
          <span className="px-8 text-center font-heading text-3xl font-bold leading-tight text-white/90 sm:text-4xl">
            {post.title}
          </span>
        </div>

        {/* Body */}
        <div className="mt-12">{post.body.map(renderBlock)}</div>

        {/* Subscribe CTA */}
        <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-xl font-bold tracking-tight">
              Enjoyed this?
            </p>
            <p className="mt-1 text-sm text-foreground/55">
              Get new field notes straight to your inbox.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#c4622d] px-5 py-2.5 text-sm font-semibold text-[#fff4ed] transition-opacity hover:opacity-90">
            <Sparkles size={15} />
            Subscribe
          </button>
        </div>
      </article>

      {/* More posts */}
      <section className="mx-auto mt-24 max-w-6xl">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/45">
          Keep reading
        </h2>
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <Link key={p.slug} href={`/blogs/${p.slug}`} className="group block">
              <div
                className={`relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br ${p.gradient}`}
              >
                <span className="absolute left-4 top-4 rounded-md bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
                  {p.category}
                </span>
                <span className="px-6 text-center font-heading text-xl font-bold leading-tight text-white/90">
                  {p.title}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-[#c4622d]">
                {p.title}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-foreground/50 group-hover:text-foreground">
                Read <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
