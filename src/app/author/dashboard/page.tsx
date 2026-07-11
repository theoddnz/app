import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { ExternalLink, PenLine, Trash2 } from "@/components/ui/tabler-icons";

import { createAuthorBlogPostAction, deleteAuthorBlogPostAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogCreateDialog } from "@/components/admin/BlogCreateDialog";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { blogCategories, blogPosts, learningPaths } from "@/db/schema";
import { requireAuthorSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

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

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Your blogs"
        description="Create, edit, preview, and manage your public blog posts."
      />
        <div className="flex justify-start">
          <BlogCreateDialog
            paths={paths}
            categories={categories}
            action={createAuthorBlogPostAction}
            buttonLabel="Add new blog"
            heading="Write a blog"
            description="Publish a blog with markdown. Upload images or videos to Bunny, then copy or insert the returned URL into your content."
            submitLabel="Publish blog"
          />
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your blogs</h2>
            <span className="text-sm text-muted-foreground">{blogs.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {blogs.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No blogs yet.</div>
            ) : (
              <div className="divide-y divide-border">
                {blogs.map((blog) => (
                  <div key={blog.id} className="grid gap-4 p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                    {blog.thumbnailUrl ? (
                      <img src={blog.thumbnailUrl} alt="" className="aspect-video w-20 rounded-md border border-border object-cover" />
                    ) : (
                      <div className="aspect-video w-20 rounded-md border border-dashed border-border bg-muted" />
                    )}

                    <div className="min-w-0">
                      <p className="truncate font-medium">{blog.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">/{blog.slug} {blog.categoryName ? `- ${blog.categoryName}` : ""}</p>
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
