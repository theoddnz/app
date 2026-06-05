import type { Metadata } from "next";
import Link from "next/link";
import { eq, ne } from "drizzle-orm";
import { ArrowLeft, ArrowUpRight, ChevronRight, Share2 } from "@/components/ui/tabler-icons";
import { notFound } from "next/navigation";

import { MarkdownPreview } from "@/components/blog/MarkdownPreview";
import { getDb } from "@/db";
import { blogPosts, learningPaths } from "@/db/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getDb().query.blogPosts.findFirst({
    where: eq(blogPosts.slug, slug),
  });

  if (!blog) {
    return { title: "Article not found | TheOddOnes" };
  }

  return {
    ...pageMetadata({
      title: blog.title,
      description: blog.excerpt,
      path: `/blogs/${blog.slug}`,
      images: blog.thumbnailUrl ? [blog.thumbnailUrl] : undefined,
      type: "article",
      keywords: [blog.title, "TheOddOnes field notes", "learning community essay", "build log"],
    }),
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: absoluteUrl(`/blogs/${blog.slug}`),
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: ["TheOddOnes"],
      images: blog.thumbnailUrl ? [absoluteUrl(blog.thumbnailUrl)] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getDb().query.blogPosts.findFirst({
    where: eq(blogPosts.slug, slug),
  });

  if (!blog) {
    notFound();
  }

  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.id, blog.pathId),
  });
  const related = await getDb()
    .select()
    .from(blogPosts)
    .where(ne(blogPosts.slug, blog.slug))
    .limit(3);
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.thumbnailUrl ? [absoluteUrl(blog.thumbnailUrl)] : undefined,
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "TheOddOnes",
    },
    publisher: {
      "@type": "Organization",
      name: "TheOddOnes",
    },
    mainEntityOfPage: absoluteUrl(`/blogs/${blog.slug}`),
  };

  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground font-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs font-semibold text-foreground/40">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <ArrowLeft size={14} />
            Field notes
          </Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-foreground/70">{path?.name ?? "Blog"}</span>
        </nav>

        <header className="border-b border-border pb-10">
          <p className="mb-5 inline-flex rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{path?.name ?? "Blog"}</p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">{blog.title}</h1>
          <p className="mt-6 text-lg leading-8 text-foreground/60">{blog.excerpt}</p>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">TheOddOnes</p>
            <button className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground" aria-label="Share article">
              <Share2 className="size-4" />
            </button>
          </div>
        </header>

        {blog.thumbnailUrl ? (
          <img src={blog.thumbnailUrl} alt="" className="my-12 aspect-video w-full rounded-lg border border-border object-cover" />
        ) : null}

        <div className="pb-24">
          <MarkdownPreview content={blog.content} />
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-5xl border-t border-border py-16">
          <h2 className="text-2xl font-semibold">More field notes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/blogs/${item.slug}`} className="rounded-lg border border-border bg-card p-5 hover:bg-muted/35">
                <h3 className="line-clamp-2 font-semibold">{item.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/60">
                  Read <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
