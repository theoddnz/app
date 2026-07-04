import { desc } from "drizzle-orm";
import { ExternalLink, Trash2 } from "@/components/ui/tabler-icons";
import Link from "next/link";

import { deleteBlogPostAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogForm } from "@/components/admin/BlogForm";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { blogPosts, learningPaths } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

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

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total blogs</p>
          <p className="mt-3 text-2xl font-semibold">{blogs.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Paths available</p>
          <p className="mt-3 text-2xl font-semibold">{paths.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">With thumbnail</p>
          <p className="mt-3 text-2xl font-semibold">{blogs.filter((blog) => blog.thumbnailUrl).length}</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px] xl:items-start">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <div>
              <h2 className="text-xl font-semibold">All blogs</h2>
              <p className="mt-1 text-sm text-muted-foreground">Review posts, thumbnails, linked paths, and public previews.</p>
            </div>
            <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">{blogs.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {blogs.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No blogs yet.</div>
            ) : (
              <div className="max-h-[calc(100svh-18rem)] overflow-auto">
                <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 border-b border-border bg-muted/80 text-xs uppercase text-muted-foreground backdrop-blur">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Blog</th>
                      <th scope="col" className="px-4 py-3 font-medium">Path</th>
                      <th scope="col" className="px-4 py-3 font-medium">Excerpt</th>
                      <th scope="col" className="px-4 py-3 font-medium">Created</th>
                      <th scope="col" className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="transition-colors hover:bg-muted/45">
                        <td className="px-4 py-4 align-middle">
                          <div className="flex min-w-0 items-center gap-3">
                            {blog.thumbnailUrl ? (
                              <img src={blog.thumbnailUrl} alt="" className="aspect-video w-20 shrink-0 rounded-md border border-border object-cover" />
                            ) : (
                              <div className="aspect-video w-20 shrink-0 rounded-md border border-dashed border-border bg-muted" />
                            )}
                            <div className="min-w-0">
                              <p className="truncate font-medium">{blog.title}</p>
                              <p className="mt-1 truncate text-xs text-muted-foreground">/{blog.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="max-w-[180px] px-4 py-4 align-middle text-muted-foreground">
                          <span className="block truncate">{pathNames.get(blog.pathId) ?? "Unknown path"}</span>
                        </td>
                        <td className="max-w-[280px] px-4 py-4 align-middle text-muted-foreground">
                          <p className="line-clamp-2">{blog.excerpt || "No description"}</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 align-middle text-muted-foreground">{formatDate(blog.createdAt)}</td>
                        <td className="px-4 py-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/blogs/${blog.slug}`} target="_blank">
                                <ExternalLink className="size-4" />
                                Preview
                              </Link>
                            </Button>
                            <form action={deleteBlogPostAction}>
                              <input type="hidden" name="id" value={blog.id} />
                              <Button type="submit" variant="destructive" size="icon-sm" aria-label={`Delete ${blog.title}`}>
                                <Trash2 className="size-3.5" />
                              </Button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <aside className="xl:sticky xl:top-4">
          <BlogForm paths={paths.map((path) => ({ id: path.id, name: path.name }))} />
        </aside>
      </div>
    </div>
  );
}
