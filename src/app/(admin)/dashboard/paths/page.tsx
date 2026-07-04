import { desc } from "drizzle-orm";
import { Eye, EyeOff, Rocket, Route, Trash2 } from "@/components/ui/tabler-icons";

import {
  deleteLearningPathAction,
  updateLearningPathStatusAction,
} from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PathForm } from "@/components/admin/PathForm";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { learningPaths, lessons } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function PathsPage() {
  await requireAdminSession();
  const paths = await getDb()
    .select()
    .from(learningPaths)
    .orderBy(desc(learningPaths.createdAt));
  const allLessons = await getDb().select({ pathId: lessons.pathId }).from(lessons);
  const lessonCounts = allLessons.reduce<Record<string, number>>((counts, lesson) => {
    counts[lesson.pathId] = (counts[lesson.pathId] ?? 0) + 1;
    return counts;
  }, {});
  const visiblePaths = paths.filter((path) => path.isVisible).length;
  const launchedPaths = paths.filter((path) => path.isLaunched).length;
  const totalLessons = allLessons.length;

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Paths"
        description="Create and manage paths. Slugs are generated automatically from each path name."
      />

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total paths</p>
            <Route className="size-5 text-muted-foreground" />
          </div>
          <p className="mt-3 text-2xl font-semibold">{paths.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Visible / launched</p>
            <Eye className="size-5 text-muted-foreground" />
          </div>
          <p className="mt-3 text-2xl font-semibold">
            {visiblePaths} / {launchedPaths}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total lessons</p>
            <Rocket className="size-5 text-muted-foreground" />
          </div>
          <p className="mt-3 text-2xl font-semibold">{totalLessons}</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <div>
              <h2 className="text-xl font-semibold">All paths</h2>
              <p className="mt-1 text-sm text-muted-foreground">Manage thumbnails, visibility, launch state, and lesson coverage.</p>
            </div>
            <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">{paths.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {paths.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No paths yet.</div>
            ) : (
              <div className="max-h-[calc(100svh-18rem)] overflow-auto">
                <table className="w-full min-w-[1060px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 border-b border-border bg-muted/80 text-xs uppercase text-muted-foreground backdrop-blur">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Path</th>
                      <th scope="col" className="px-4 py-3 font-medium">Description</th>
                      <th scope="col" className="px-4 py-3 font-medium">Lessons</th>
                      <th scope="col" className="px-4 py-3 font-medium">Status</th>
                      <th scope="col" className="px-4 py-3 font-medium">Created</th>
                      <th scope="col" className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paths.map((path) => (
                      <tr key={path.id} className="transition-colors hover:bg-muted/45">
                        <td className="px-4 py-4 align-middle">
                          <div className="flex min-w-0 items-center gap-3">
                            {path.thumbnailUrl ? (
                              <img src={path.thumbnailUrl} alt="" className="aspect-video w-20 shrink-0 rounded-md border border-border object-cover" />
                            ) : (
                              <div className="aspect-video w-20 shrink-0 rounded-md border border-dashed border-border bg-muted" />
                            )}
                            <div className="min-w-0">
                              <p className="truncate font-medium">{path.name}</p>
                              <p className="mt-1 truncate text-xs text-muted-foreground">/{path.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="max-w-[300px] px-4 py-4 align-middle text-muted-foreground">
                          <p className="line-clamp-2">{path.description || "No description"}</p>
                        </td>
                        <td className="px-4 py-4 align-middle text-muted-foreground">{lessonCounts[path.id] ?? 0}</td>
                        <td className="px-4 py-4 align-middle">
                          <form action={updateLearningPathStatusAction} className="flex min-w-[210px] items-center gap-3">
                            <input type="hidden" name="id" value={path.id} />
                            <label className="inline-flex items-center gap-1.5 text-sm">
                              <input type="checkbox" name="isLaunched" defaultChecked={path.isLaunched} className="size-4 accent-foreground" />
                              <Rocket className="size-4 text-muted-foreground" />
                              <span>Launched</span>
                            </label>
                            <label className="inline-flex items-center gap-1.5 text-sm">
                              <input type="checkbox" name="isVisible" defaultChecked={path.isVisible} className="size-4 accent-foreground" />
                              {path.isVisible ? <Eye className="size-4 text-muted-foreground" /> : <EyeOff className="size-4 text-muted-foreground" />}
                              <span>Visible</span>
                            </label>
                            <Button type="submit" variant="outline" size="sm">
                              Save
                            </Button>
                          </form>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 align-middle text-muted-foreground">{formatDate(path.createdAt)}</td>
                        <td className="px-4 py-4 align-middle">
                          <form action={deleteLearningPathAction}>
                            <input type="hidden" name="id" value={path.id} />
                            <Button type="submit" variant="destructive" size="icon" aria-label={`Delete ${path.name}`}>
                              <Trash2 className="size-4" />
                            </Button>
                          </form>
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
          <PathForm />
        </aside>
      </div>
    </div>
  );
}
