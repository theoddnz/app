import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { PenLine, Trash2 } from "@/components/ui/tabler-icons";

import { deleteAuthorProfileAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AuthorProfileForm } from "@/components/admin/AuthorProfileForm";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AuthorsAdminPage() {
  await requireAdminSession();

  const authors = await getDb()
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      profileRole: users.profileRole,
      profileImageUrl: users.profileImageUrl,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, "author"))
    .orderBy(desc(users.createdAt));

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Author profiles"
        description="Create blog author accounts and give them access to their own publishing dashboard."
      />

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total authors</p>
          <p className="mt-3 text-2xl font-semibold">{authors.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Publishing access</p>
          <p className="mt-3 text-2xl font-semibold">{authors.length}</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <div>
              <h2 className="text-xl font-semibold">All authors</h2>
              <p className="mt-1 text-sm text-muted-foreground">Manage author profiles and publishing dashboard access.</p>
            </div>
            <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">{authors.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {authors.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No author profiles yet.</div>
            ) : (
              <div className="max-h-[calc(100svh-18rem)] overflow-auto">
                <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 border-b border-border bg-muted/80 text-xs uppercase text-muted-foreground backdrop-blur">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Author</th>
                      <th scope="col" className="px-4 py-3 font-medium">Email</th>
                      <th scope="col" className="px-4 py-3 font-medium">Profile role</th>
                      <th scope="col" className="px-4 py-3 font-medium">Created</th>
                      <th scope="col" className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {authors.map((author) => (
                      <tr key={author.id} className="transition-colors hover:bg-muted/45">
                        <td className="max-w-[220px] px-4 py-4 align-middle">
                          <div className="flex items-center gap-3">
                            {author.profileImageUrl ? (
                              <img src={author.profileImageUrl} alt="" className="size-9 shrink-0 rounded-md border border-border object-cover" />
                            ) : (
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold uppercase text-muted-foreground">
                                {(author.name || author.email).slice(0, 1)}
                              </span>
                            )}
                            <span className="truncate font-medium">{author.name || "Unnamed author"}</span>
                          </div>
                        </td>
                        <td className="max-w-[240px] px-4 py-4 align-middle text-muted-foreground">
                          <span className="block truncate">{author.email}</span>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <span className="inline-flex h-7 items-center rounded-md bg-muted px-2.5 text-xs font-medium text-muted-foreground">
                            {author.profileRole || "No role"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 align-middle text-muted-foreground">{formatDate(author.createdAt)}</td>
                        <td className="px-4 py-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/dashboard/authors/${author.id}/edit`}>
                                <PenLine className="size-4" />
                                Edit
                              </Link>
                            </Button>
                            <form action={deleteAuthorProfileAction}>
                              <input type="hidden" name="id" value={author.id} />
                              <Button type="submit" variant="destructive" size="icon-sm" aria-label={`Delete ${author.name}`}>
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
          <AuthorProfileForm />
        </aside>
      </div>
    </div>
  );
}
