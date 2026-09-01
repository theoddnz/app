import { desc } from "drizzle-orm";
import { Eye, EyeOff, Rocket, Route, Trash2 } from "@/components/ui/tabler-icons";

import {
  deleteLearningPathAction,
  updateLearningPathStatusAction,
} from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState, StatCard } from "@/components/admin/DashboardCards";
import { PathCreateDialog } from "@/components/admin/PathCreateDialog";
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
        eyebrow="Content"
        title="Paths"
        description="Create and manage paths. Slugs are generated automatically from each path name."
        actions={<PathCreateDialog />}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total paths" value={paths.length} hint="Learning tracks" icon={Route} accent />
        <StatCard label="Visible / launched" value={`${visiblePaths} / ${launchedPaths}`} hint="Public / live" icon={Eye} />
        <StatCard label="Total lessons" value={totalLessons} hint="Across all paths" icon={Rocket} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All paths</h2>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{paths.length} total</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {paths.length === 0 ? (
            <EmptyState
              icon={Route}
              title="No paths yet"
              description="Create your first learning path to get started."
              action={<PathCreateDialog />}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-215 border-collapse text-left text-sm">
                <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium">Path</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium xl:table-cell">Description</th>
                    <th scope="col" className="px-5 py-3 font-medium">Lessons</th>
                    <th scope="col" className="px-5 py-3 font-medium">Status</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium lg:table-cell">Created</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paths.map((path) => (
                    <tr key={path.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-5 py-4 align-middle">
                        <div className="flex min-w-0 items-center gap-3">
                          {path.thumbnailUrl ? (
                            <img src={path.thumbnailUrl} alt="" className="aspect-video w-20 shrink-0 rounded-lg border border-border object-cover" />
                          ) : (
                            <div className="aspect-video w-20 shrink-0 rounded-lg border border-dashed border-border bg-muted" />
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-medium">{path.name}</p>
                            <p className="mt-1 truncate text-xs text-muted-foreground">/{path.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden max-w-75 px-5 py-4 align-middle text-muted-foreground xl:table-cell">
                        <p className="line-clamp-2">{path.description || "No description"}</p>
                      </td>
                      <td className="px-5 py-4 align-middle text-muted-foreground">{lessonCounts[path.id] ?? 0}</td>
                      <td className="px-5 py-4 align-middle">
                        <form action={updateLearningPathStatusAction} className="flex min-w-52 items-center gap-3">
                          <input type="hidden" name="id" value={path.id} />
                          <label className="inline-flex items-center gap-1.5 text-sm">
                            <input type="checkbox" name="isLaunched" defaultChecked={path.isLaunched} className="size-4 accent-[#c4622d]" />
                            <Rocket className="size-4 text-muted-foreground" />
                            <span>Launched</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 text-sm">
                            <input type="checkbox" name="isVisible" defaultChecked={path.isVisible} className="size-4 accent-[#c4622d]" />
                            {path.isVisible ? <Eye className="size-4 text-muted-foreground" /> : <EyeOff className="size-4 text-muted-foreground" />}
                            <span>Visible</span>
                          </label>
                          <Button type="submit" variant="outline" size="sm">
                            Save
                          </Button>
                        </form>
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-4 align-middle text-muted-foreground lg:table-cell">{formatDate(path.createdAt)}</td>
                      <td className="px-5 py-4 align-middle">
                        <div className="flex justify-end">
                          <form action={deleteLearningPathAction}>
                            <input type="hidden" name="id" value={path.id} />
                            <Button type="submit" variant="destructive" size="icon-sm" aria-label={`Delete ${path.name}`}>
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
