import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { ArrowUpRight, ChevronRight, FileText, Home } from "lucide-react";

import { getDb } from "@/db";
import { blogPosts, learningPaths } from "@/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Field Notes | TheOddOnes",
  description: "Path-specific notes, essays, and practical build logs from TheOddOnes.",
};

export default async function BlogPage() {
  const [blogs, paths] = await Promise.all([
    getDb().select().from(blogPosts).orderBy(desc(blogPosts.createdAt)),
    getDb().select().from(learningPaths).orderBy(desc(learningPaths.createdAt)),
  ]);
  const pathNames = new Map(paths.map((path) => [path.id, path.name]));
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground font-space">
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

          <div className="mt-8 flex flex-wrap gap-2">
            {paths.map((path) => (
              <Link
                key={path.id}
                href={`/blogs/path/${path.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-foreground/65 transition-colors hover:bg-muted hover:text-foreground"
              >
                {path.name}
              </Link>
            ))}
          </div>
        </section>

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
