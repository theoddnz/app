import { desc } from "drizzle-orm";
import { ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

import { deleteBlogPostAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogForm } from "@/components/admin/BlogForm";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { blogPosts, learningPaths } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function BlogsAdminPage() {
  await requireAdminSession();
  const paths = await getDb()
    .select()
    .from(learningPaths)
    .orderBy(desc(learningPaths.createdAt));
  const blogs = await getDb()
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));
  const pathNames = new Map(paths.map((path) => [path.id, path.name]));

  return (
      <div className="space-y-8">
        <AdminHeader
          title="Blogs"
          description="Create path-specific blogs with a free MDX-style markdown editor and live preview."
        />

        <BlogForm paths={paths.map((path) => ({ id: path.id, name: path.name }))} />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">All blogs</h2>
            <span className="text-sm text-muted-foreground">{blogs.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {blogs.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No blogs yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[900px] divide-y divide-border">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="grid grid-cols-[96px_1fr_180px_120px] items-center gap-4 p-4">
                      {blog.thumbnailUrl ? (
                        <img src={blog.thumbnailUrl} alt="" className="aspect-video w-20 rounded-md border border-border object-cover" />
                      ) : (
                        <div className="aspect-video w-20 rounded-md border border-dashed border-border bg-muted" />
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-medium">{blog.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">/{blog.slug}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{pathNames.get(blog.pathId) ?? "Unknown path"}</p>
                        <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{blog.excerpt || "No description"}</p>
                      </div>

                      <Button asChild variant="outline" size="sm">
                        <Link href={`/blogs/${blog.slug}`} target="_blank">
                          <ExternalLink className="size-4" />
                          Preview page
                        </Link>
                      </Button>

                      <form action={deleteBlogPostAction}>
                        <input type="hidden" name="id" value={blog.id} />
                        <Button type="submit" variant="destructive" size="icon" aria-label={`Delete ${blog.title}`}>
                          <Trash2 className="size-4" />
                        </Button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
  );
}
