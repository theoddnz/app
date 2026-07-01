import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/tabler-icons";
import { ShareButton } from "@/components/blog/ShareButton";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { MarkdownPreview } from "@/components/blog/MarkdownPreview";
import type { Block } from "@/lib/blog-data";
import { getPublicBlogPost, getPublicBlogPosts } from "@/lib/public-blogs";

export const dynamic = "force-dynamic";

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-10 mb-3 font-heading text-xl font-bold tracking-tight sm:mt-12 sm:mb-4 sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <figure
          key={index}
          className="my-10 rounded-2xl border border-border bg-card px-6 py-8 text-center sm:my-12 sm:px-10 sm:py-10"
        >
          <span
            aria-hidden
            className="block font-heading text-5xl leading-none text-[#c4622d] sm:text-6xl"
          >
            &ldquo;
          </span>
          <blockquote className="mt-2 font-heading text-xl font-semibold leading-snug tracking-tight text-foreground/90 sm:text-2xl">
            {block.text}
          </blockquote>
        </figure>
      );
    case "list":
      return (
        <ul key={index} className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-7 text-foreground/70 sm:text-[17px] sm:leading-8">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#c4622d]" />
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
        <p key={index} className="my-5 text-base leading-7 text-foreground/70 sm:text-[17px] sm:leading-8">
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
  const post = await getPublicBlogPost(slug);

  if (!post) {
    notFound();
  }

  const more = (await getPublicBlogPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background px-5 pt-28 pb-24 text-foreground font-space sm:px-6 sm:pt-32">
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

        <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-7 text-foreground/55 sm:mt-5 sm:text-lg">{post.excerpt}</p>

        <div className="mt-8 flex items-center gap-3 border-b border-border pb-8">
          <AuthorCard name={post.author} />
          <div className="min-w-0">
            <p className="truncate text-xs text-foreground/45">{post.role}</p>
          </div>
          <div className="ml-auto">
            <ShareButton title={post.title} />
          </div>
        </div>

        {post.thumbnailUrl ? (
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-muted sm:mt-10">
            <img src={post.thumbnailUrl} alt="" className="size-full object-cover" />
          </div>
        ) : (
          <div
            className={`mt-8 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br sm:mt-10 ${post.gradient}`}
          >
            <span className="px-6 text-center font-heading text-2xl font-bold leading-tight text-white/90 sm:px-8 sm:text-3xl lg:text-4xl">
              {post.title}
            </span>
          </div>
        )}

        <div className="mt-10 sm:mt-12">
          {post.content ? <MarkdownPreview content={post.content} empty="" /> : post.body?.map(renderBlock)}
        </div>
      </article>

      {/* More posts */}
      {more.length > 0 ? (
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
                  <span className="px-5 text-center font-heading text-lg font-bold leading-tight text-white/90 sm:px-6 sm:text-xl">
                    {p.title}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-[#c4622d] sm:text-lg">
                  {p.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-foreground/50 group-hover:text-foreground">
                  Read <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
