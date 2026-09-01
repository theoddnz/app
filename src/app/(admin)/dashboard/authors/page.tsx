import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { BadgeCheck, PenLine, Trash2, User } from "@/components/ui/tabler-icons";

import { deleteAuthorProfileAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState, StatCard } from "@/components/admin/DashboardCards";
import { AuthorCreateDialog } from "@/components/admin/AuthorCreateDialog";
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
        eyebrow="People"
        title="Author profiles"
        description="Create blog author accounts and give them access to their own publishing dashboard."
        actions={<AuthorCreateDialog />}
      />

      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total authors" value={authors.length} hint="Accounts created" icon={User} accent />
        <StatCard label="Publishing access" value={authors.length} hint="Can write blogs" icon={BadgeCheck} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All authors</h2>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{authors.length} total</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {authors.length === 0 ? (
            <EmptyState
              icon={User}
              title="No author profiles yet"
              description="Create an author account to grant publishing access."
              action={<AuthorCreateDialog />}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 border-collapse text-left text-sm">
                <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium">Author</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Profile role</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium lg:table-cell">Created</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {authors.map((author) => (
                    <tr key={author.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-5 py-4 align-middle">
                        <div className="flex items-center gap-3">
                          {author.profileImageUrl ? (
                            <img src={author.profileImageUrl} alt="" className="size-10 shrink-0 rounded-xl border border-border object-cover" />
                          ) : (
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#c4622d]/10 text-sm font-semibold uppercase text-[#c4622d] ring-1 ring-[#c4622d]/20">
                              {(author.name || author.email).slice(0, 1)}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-medium">{author.name || "Unnamed author"}</p>
                            <p className="truncate text-xs text-muted-foreground">{author.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-5 py-4 align-middle md:table-cell">
                        <span className="inline-flex h-7 items-center rounded-full bg-muted px-2.5 text-xs font-medium text-muted-foreground">
                          {author.profileRole || "No role"}
                        </span>
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-4 align-middle text-muted-foreground lg:table-cell">{formatDate(author.createdAt)}</td>
                      <td className="px-5 py-4 align-middle">
                        <div className="flex items-center justify-end gap-2">
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
    </div>
  );
}
