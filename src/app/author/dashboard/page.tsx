import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { ExternalLink, LogOut, PenLine, Trash2 } from "@/components/ui/tabler-icons";

import { createAuthorBlogPostAction, deleteAuthorBlogPostAction, logoutAction, updateOwnAuthorProfileAction } from "@/app/admin-actions";
import { AuthorProfileForm } from "@/components/admin/AuthorProfileForm";
import { BlogForm } from "@/components/admin/BlogForm";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { blogPosts, learningPaths, users } from "@/db/schema";
import { requireAuthorSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AuthorDashboardPage() {
  const session = await requireAuthorSession();

  const [author, paths, blogs] = await Promise.all([
    getDb().query.users.findFirst({
      where: eq(users.id, session.userId),
      columns: {
        id: true,
        name: true,
        email: true,
        profileRole: true,
      },
    }),
    getDb()
      .select({
        id: learningPaths.id,
        name: learningPaths.name,
      })
      .from(learningPaths)
      .orderBy(desc(learningPaths.createdAt)),
    getDb()
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        thumbnailUrl: blogPosts.thumbnailUrl,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.authorId, session.userId))
      .orderBy(desc(blogPosts.createdAt)),
  ]);

  return (
    <main className="mt-20 min-h-[80svh] bg-background px-5 py-8 font-space text-foreground md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Author dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome, {author?.name ?? session.email}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {author?.profileRole || "Blog author"} <span aria-hidden>&middot;</span> {session.email}
            </p>
          </div>

          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="h-9">
              <LogOut className="size-4" />
              Log out
            </Button>
          </form>
        </header>

        {author ? (
          <AuthorProfileForm
            action={updateOwnAuthorProfileAction}
            initialValues={{
              id: author.id,
              name: author.name,
              email: author.email,
              profileRole: author.profileRole,
            }}
            heading="Your profile"
            description="Update the name, role, email, and optional password shown on your public blog profile."
            submitLabel="Save profile"
          />
        ) : null}

        <BlogForm
          paths={paths}
          action={createAuthorBlogPostAction}
          heading="Write a blog"
          description="Publish a blog to the public blog page using markdown and optional cover images."
          submitLabel="Publish blog"
        />

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
                      <p className="mt-1 text-xs text-muted-foreground">/{blog.slug}</p>
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
    </main>
  );
}
