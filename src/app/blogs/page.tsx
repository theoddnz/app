import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { ArrowUpRight, ChevronRight, FileText, Home } from "@/components/ui/huge-icons";

import { getDb } from "@/db";
import { blogPosts, learningPaths } from "@/db/schema";
import { absoluteUrl, jsonLd, pageMetadata, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

const categoryCardStyles = [
  "bg-[#fff4d8] text-[#1f1a10] border-[#f2d27c]",
  "bg-[#e0f2fe] text-[#102033] border-[#8ec7e8]",
  "bg-[#dcfce7] text-[#102217] border-[#86d39b]",
  "bg-[#ffe4e6] text-[#2c1218] border-[#f0a7b0]",
  "bg-[#ede9fe] text-[#1f1735] border-[#b8a8ee]",
  "bg-[#fef3c7] text-[#251709] border-[#e8bc5f]",
];

export const metadata: Metadata = pageMetadata({
  title: "Field Notes",
  description:
    "Field notes from TheOddOnes: practical essays, build logs, and learning reflections from a focused builder community.",
  path: "/blogs",
  keywords: ["TheOddOnes field notes", "learning essays", "build logs", "builder community blog"],
});

export default async function BlogPage() {
  const [blogs, paths] = await Promise.all([
    getDb().select().from(blogPosts).orderBy(desc(blogPosts.createdAt)),
    getDb().select().from(learningPaths).orderBy(desc(learningPaths.createdAt)),
  ]);
  const pathNames = new Map(paths.map((path) => [path.id, path.name]));
  const featured = blogs[0];
  const rest = blogs.slice(1);
  const blogCountByPath = blogs.reduce<Record<string, number>>((counts, blog) => {
    counts[blog.pathId] = (counts[blog.pathId] ?? 0) + 1;
    return counts;
  }, {});
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blogs#blog"),
    name: "TheOddOnes Field Notes",
    description:
      "Practical essays, build logs, learning reflections, and field notes from TheOddOnes.",
    url: absoluteUrl("/blogs"),
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    blogPost: blogs.slice(0, 12).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      url: absoluteUrl(`/blogs/${blog.slug}`),
      image: blog.thumbnailUrl ? absoluteUrl(blog.thumbnailUrl) : undefined,
      datePublished: blog.createdAt.toISOString(),
      dateModified: blog.updatedAt.toISOString(),
    })),
  };

  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground font-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs font-semibold text-foreground/40">
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-foreground/70">Blogs</span>
        </nav>

        <section className="border-b border-border pb-12">
          <h1 className="font-space text-5xl font-bold tracking-tight">Field notes.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-foreground/55">
            Blogs connected to learning paths, written in markdown with practical notes and images from the middle of the work.
          </p>
        </section>

        {paths.length > 0 ? (
          <section className="border-b border-border py-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Categories</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Pick a path.</h2>
              </div>
              <p className="hidden text-sm text-muted-foreground sm:block">Each card opens only the blogs for that category.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paths.map((path, index) => {
                const count = blogCountByPath[path.id] ?? 0;
                const style = categoryCardStyles[index % categoryCardStyles.length];

                return (
                  <Link
                    key={path.id}
                    href={`/blogs/path/${path.slug}`}
                    className={`group relative flex min-h-[168px] items-center justify-center overflow-hidden rounded-lg border p-6 text-center transition duration-200  ${style}`}
                  >
                    <span className="absolute left-5 top-4 text-xs font-semibold uppercase tracking-[0.18em] opacity-55">
                      {count} {count === 1 ? "post" : "posts"}
                    </span>
                  
                    <span className="relative max-w-[14rem] text-balance text-2xl font-bold leading-tight tracking-tight">
                      {path.name}
                    </span>
                    <span className="absolute bottom-4 right-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] opacity-60 transition-opacity group-hover:opacity-100">
                      Open <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {blogs.length === 0 ? (
          <section className="py-20 text-sm text-muted-foreground">No blogs published yet.</section>
        ) : (
          <section className="grid gap-5 py-16 md:grid-cols-2 lg:grid-cols-3">
            {featured ? (
              <Link
                href={`/blogs/${featured.slug}`}
                className="group flex min-h-[320px] flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-7 transition-colors hover:bg-muted/35 lg:col-span-2"
              >
                <div>
                  {featured.thumbnailUrl ? (
                    <img src={featured.thumbnailUrl} alt="" className="mb-7 aspect-video w-full rounded-lg border border-border object-cover" />
                  ) : null}
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <FileText className="size-3" />
                    {pathNames.get(featured.pathId) ?? "Blog"}
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight">{featured.title}</h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-foreground/60">{featured.excerpt}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground">
                  Read post <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ) : null}

            {rest.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex min-h-[280px] flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:bg-muted/35"
              >
                <div>
                  {blog.thumbnailUrl ? (
                    <img src={blog.thumbnailUrl} alt="" className="mb-5 aspect-video w-full rounded-lg border border-border object-cover" />
                  ) : null}
                  <p className="mb-3 text-xs text-muted-foreground">{pathNames.get(blog.pathId) ?? "Blog"}</p>
                  <h3 className="text-xl font-semibold leading-snug">{blog.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/55">{blog.excerpt}</p>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-sm text-foreground/50 group-hover:text-foreground">
                  Read <ChevronRight className="size-4" />
                </span>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
