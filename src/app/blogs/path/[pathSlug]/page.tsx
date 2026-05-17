import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { getDb } from "@/db";
import { blogPosts, learningPaths } from "@/db/schema";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ pathSlug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pathSlug } = await params;
  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.slug, pathSlug),
  });

  if (!path) {
    return { title: "Path not found | TheOddOnes" };
  }

  return pageMetadata({
    title: `${path.name} Field Notes`,
    description: path.description || `Field notes and build logs for ${path.name}.`,
    path: `/blogs/path/${path.slug}`,
  });
}

export default async function BlogsByPathPage({ params }: Props) {
  const { pathSlug } = await params;
  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.slug, pathSlug),
  });

  if (!path) {
    notFound();
  }

  const blogs = await getDb()
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.pathId, path.id))
    .orderBy(desc(blogPosts.createdAt));

  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground font-space">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs font-semibold text-foreground/40">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <ArrowLeft size={14} />
            Blogs
          </Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-foreground/70">{path.name}</span>
        </nav>

        <header className="border-b border-border pb-10">
          <h1 className="text-5xl font-bold tracking-tight">{path.name} blogs</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-foreground/55">{path.description || "Path-specific field notes and learning essays."}</p>
        </header>

        {blogs.length === 0 ? (
          <section className="py-20 text-sm text-muted-foreground">No blogs for this path yet.</section>
        ) : (
          <section className="grid gap-5 py-16 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="rounded-lg border border-border bg-card p-6 hover:bg-muted/35">
                {blog.thumbnailUrl ? (
                  <img src={blog.thumbnailUrl} alt="" className="mb-5 aspect-video w-full rounded-lg border border-border object-cover" />
                ) : null}
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/55">{blog.excerpt}</p>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
