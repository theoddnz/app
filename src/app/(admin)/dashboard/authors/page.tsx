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

export default async function AuthorsAdminPage() {
  await requireAdminSession();

  const authors = await getDb()
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      profileRole: users.profileRole,
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

      <AuthorProfileForm />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All authors</h2>
          <span className="text-sm text-muted-foreground">{authors.length} total</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {authors.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No author profiles yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {authors.map((author) => (
                <div key={author.id} className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{author.name}</p>
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {author.profileRole}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{author.email}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/authors/${author.id}/edit`}>
                        <PenLine className="size-4" />
                        Edit
                      </Link>
                    </Button>

                    <form action={deleteAuthorProfileAction}>
                      <input type="hidden" name="id" value={author.id} />
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
