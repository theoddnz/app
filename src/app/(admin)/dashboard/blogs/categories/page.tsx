import { desc } from "drizzle-orm";

import { deleteBlogCategoryAction } from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogCategoryForm } from "@/components/admin/BlogCategoryForm";
import { Button } from "@/components/ui/button";
import { Trash2 } from "@/components/ui/tabler-icons";
import { getDb } from "@/db";
import { blogCategories } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function BlogCategoriesPage() {
  await requireAdminSession();

  const categories = await getDb()
    .select()
    .from(blogCategories)
    .orderBy(desc(blogCategories.createdAt));

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Blog categories"
        description="Create categories for blog posts. These show in the blog editor dropdown and public blog filters."
      />

      <BlogCategoryForm />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <div>
            <h2 className="text-xl font-semibold">Categories</h2>
            <p className="mt-1 text-sm text-muted-foreground">Manage labels used to group posts.</p>
          </div>
          <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">{categories.length} total</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {categories.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No categories yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {categories.map((category) => (
                <div key={category.id} className="grid gap-4 p-4 sm:grid-cols-[1fr_180px_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{category.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">/{category.slug}</p>
                    <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{category.description || "No description"}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(category.createdAt)}</p>
                  <form action={deleteBlogCategoryAction}>
                    <input type="hidden" name="id" value={category.id} />
                    <Button type="submit" variant="destructive" size="sm">
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
