import { desc } from "drizzle-orm";
import { Eye, EyeOff, Rocket, Trash2 } from "@/components/ui/huge-icons";

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

  return (
      <div className="space-y-8">
        <AdminHeader
          title="Paths"
          description="Create and manage paths. Slugs are generated automatically from each path name."
        />

        <PathForm />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">All paths</h2>
            <span className="text-sm text-muted-foreground">{paths.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="grid min-w-[860px] grid-cols-[88px_1.2fr_1fr_180px_120px] border-b border-border px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
              <span>Thumb</span>
              <span>Name</span>
              <span>Description</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {paths.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No paths yet.</div>
            ) : (
              <div className="overflow-x-auto">
                {paths.map((path) => (
                  <div
                    key={path.id}
                    className="grid min-w-[860px] grid-cols-[88px_1.2fr_1fr_180px_120px] items-center border-b border-border px-4 py-4 last:border-b-0"
                  >
                    <div>
                      {path.thumbnailUrl ? (
                        <img src={path.thumbnailUrl} alt="" className="aspect-video w-16 rounded-md border border-border object-cover" />
                      ) : (
                        <div className="aspect-video w-16 rounded-md border border-dashed border-border bg-muted" />
                      )}
                    </div>

                    <div className="pr-4">
                      <p className="font-medium">{path.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">/{path.slug}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{lessonCounts[path.id] ?? 0} lessons</p>
                    </div>

                    <p className="line-clamp-2 pr-4 text-sm text-muted-foreground">{path.description || "No description"}</p>

                    <form action={updateLearningPathStatusAction} className="flex flex-col gap-2 text-sm">
                      <input type="hidden" name="id" value={path.id} />
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" name="isLaunched" defaultChecked={path.isLaunched} className="size-4 accent-foreground" />
                        <Rocket className="size-4" />
                        Launched
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" name="isVisible" defaultChecked={path.isVisible} className="size-4 accent-foreground" />
                        {path.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                        Visible
                      </label>
                      <Button type="submit" variant="outline" size="sm" className="mt-1 w-fit">
                        Save
                      </Button>
                    </form>

                    <form action={deleteLearningPathAction}>
                      <input type="hidden" name="id" value={path.id} />
                      <Button type="submit" variant="destructive" size="icon" aria-label={`Delete ${path.name}`}>
                        <Trash2 className="size-4" />
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
