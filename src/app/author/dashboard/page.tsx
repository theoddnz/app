import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { ExternalLink, FileText, PenLine, Shapes, Trash2 } from "@/components/ui/tabler-icons";

import { createAuthorBlogPostAction, deleteAuthorBlogPostAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState, StatCard } from "@/components/admin/DashboardCards";
import { BlogCreateDialog } from "@/components/admin/BlogCreateDialog";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { blogCategories, blogPosts, learningPaths } from "@/db/schema";
import { requireAuthorSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AuthorDashboardPage() {
  const session = await requireAuthorSession();

  const [paths, categories, blogs] = await Promise.all([
    getDb()
      .select({
        id: learningPaths.id,
        name: learningPaths.name,
      })
      .from(learningPaths)
      .orderBy(desc(learningPaths.createdAt)),
    getDb()
      .select({
        id: blogCategories.id,
        name: blogCategories.name,
      })
      .from(blogCategories)
      .orderBy(desc(blogCategories.createdAt)),
    getDb()
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        thumbnailUrl: blogPosts.thumbnailUrl,
        createdAt: blogPosts.createdAt,
        categoryName: blogCategories.name,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(eq(blogPosts.authorId, session.userId))
      .orderBy(desc(blogPosts.createdAt)),
  ]);

  const categoriesUsed = new Set(blogs.map((blog) => blog.categoryName).filter(Boolean)).size;
  const latest = blogs[0];

  const createDialog = (
    <BlogCreateDialog
      paths={paths}
      categories={categories}
      action={createAuthorBlogPostAction}
      buttonLabel="Add new blog"
      heading="Write a blog"
      description="Publish a blog with markdown. Upload images or videos to Bunny, then copy or insert the returned URL into your content."
      submitLabel="Publish blog"
    />
  );

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Author"
        title="Your blogs"
        description="Create, edit, preview, and manage your public blog posts."
        actions={createDialog}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total blogs" value={blogs.length} hint="Published by you" icon={FileText} accent />
        <StatCard label="Categories used" value={categoriesUsed} hint="Across your posts" icon={Shapes} />
        <StatCard
          label="Latest post"
          value={latest ? formatDate(latest.createdAt) : "-"}
          hint={latest ? latest.title : "Nothing yet"}
          icon={PenLine}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your posts</h2>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {blogs.length} total
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {blogs.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No blogs yet"
              description="Write your first post to share it on your public author profile."
              action={createDialog}
            />
          ) : (
            <div className="divide-y divide-border">
              {blogs.map((blog) => (
                <div key={blog.id} className="grid gap-4 p-4 transition-colors hover:bg-muted/30 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                  {blog.thumbnailUrl ? (
                    <img src={blog.thumbnailUrl} alt="" className="aspect-video w-full max-w-30 rounded-lg border border-border object-cover" />
                  ) : (
                    <div className="flex aspect-video w-full max-w-30 items-center justify-center rounded-lg border border-dashed border-border bg-muted text-muted-foreground">
                      <FileText className="size-5" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-medium">{blog.title}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="truncate">/{blog.slug}</span>
                      {blog.categoryName ? (
                        <span className="inline-flex items-center rounded-full bg-[#c4622d]/10 px-2 py-0.5 font-medium text-[#c4622d]">
                          {blog.categoryName}
                        </span>
                      ) : null}
                      <span>{formatDate(blog.createdAt)}</span>
                    </p>
                    <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{blog.excerpt || "No description"}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blogs/${blog.slug}`} target="_blank">
                        <ExternalLink className="size-4" />
                        Preview
                      </Link>
                    </Button>

                    <Button asChild variant="outline" size="sm">
                      <Link href={`/author/dashboard/blogs/${blog.id}/edit`}>
                        <PenLine className="size-4" />
                        Edit
                      </Link>
                    </Button>

                    <form action={deleteAuthorBlogPostAction}>
                      <input type="hidden" name="id" value={blog.id} />
                      <Button type="submit" variant="destructive" size="sm">
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
