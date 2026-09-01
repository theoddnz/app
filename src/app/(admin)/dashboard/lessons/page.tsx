import { desc } from "drizzle-orm";
import { BookOpen, Clock, LinkIcon, PauseCircle, PlayCircle, Route, Trash2 } from "@/components/ui/tabler-icons";

import {
  deleteLessonAction,
  updateLessonHoldAction,
} from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState, StatCard } from "@/components/admin/DashboardCards";
import { LessonCreateDialog } from "@/components/admin/LessonCreateDialog";
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

export default async function LessonsPage() {
  await requireAdminSession();
  const paths = await getDb()
    .select()
    .from(learningPaths)
    .orderBy(desc(learningPaths.createdAt));
  const allLessons = await getDb()
    .select()
    .from(lessons)
    .orderBy(desc(lessons.createdAt));
  const pathNames = new Map(paths.map((path) => [path.id, path.name]));
  const heldLessons = allLessons.filter((lesson) => lesson.isHold).length;

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Content"
        title="Lessons"
        description="Add lessons under paths. Videos are stored as Bunny/public URLs, not uploaded through the app."
        actions={<LessonCreateDialog paths={paths.map((path) => ({ id: path.id, name: path.name }))} />}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total lessons" value={allLessons.length} hint="All lessons" icon={BookOpen} accent />
        <StatCard label="On hold" value={heldLessons} hint="Not yet released" icon={PauseCircle} />
        <StatCard label="Paths available" value={paths.length} hint="Assignable tracks" icon={Route} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All lessons</h2>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{allLessons.length} total</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {allLessons.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No lessons yet"
              description="Add your first lesson to a path to get started."
              action={<LessonCreateDialog paths={paths.map((path) => ({ id: path.id, name: path.name }))} />}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-215 border-collapse text-left text-sm">
                <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium">Lesson</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium lg:table-cell">Path</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Video</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">Duration</th>
                    <th scope="col" className="px-5 py-3 font-medium">Status</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium xl:table-cell">Created</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allLessons.map((lesson) => (
                    <tr key={lesson.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-5 py-4 align-middle">
                        <div className="flex min-w-0 items-center gap-3">
                          {lesson.thumbnailUrl ? (
                            <img src={lesson.thumbnailUrl} alt="" className="aspect-video w-20 shrink-0 rounded-lg border border-border object-cover" />
                          ) : (
                            <div className="aspect-video w-20 shrink-0 rounded-lg border border-dashed border-border bg-muted" />
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-medium">{lesson.name}</p>
                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{lesson.description || "No description"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden max-w-45 px-5 py-4 align-middle text-muted-foreground lg:table-cell">
                        <span className="block truncate">{pathNames.get(lesson.pathId) ?? "Unknown path"}</span>
                      </td>
                      <td className="hidden px-5 py-4 align-middle md:table-cell">
                        {lesson.videoUrl ? (
                          <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                            <LinkIcon className="size-4" />
                            Open
                          </a>
                        ) : (
                          <span className="text-muted-foreground">Missing</span>
                        )}
                      </td>
                      <td className="hidden px-5 py-4 align-middle text-muted-foreground sm:table-cell">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-4" />
                          {lesson.durationMinutes} min
                        </span>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {lesson.isHold ? (
                          <span className="inline-flex h-7 items-center gap-1 rounded-full bg-[#c4622d]/10 px-2.5 text-xs font-medium text-[#c4622d]">
                            <PauseCircle className="size-3.5" />
                            Hold
                          </span>
                        ) : (
                          <span className="inline-flex h-7 items-center gap-1 rounded-full bg-muted px-2.5 text-xs font-medium text-muted-foreground">
                            <PlayCircle className="size-3.5" />
                            Ready
                          </span>
                        )}
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-4 align-middle text-muted-foreground xl:table-cell">{formatDate(lesson.createdAt)}</td>
                      <td className="px-5 py-4 align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <form action={updateLessonHoldAction} className="flex items-center gap-2">
                            <input type="hidden" name="id" value={lesson.id} />
                            <label className="inline-flex items-center gap-1.5 text-sm">
                              <input type="checkbox" name="isHold" defaultChecked={lesson.isHold} className="size-4 accent-[#c4622d]" />
                              Hold
                            </label>
                            <Button type="submit" variant="outline" size="sm">
                              Save
                            </Button>
                          </form>
                          <form action={deleteLessonAction}>
                            <input type="hidden" name="id" value={lesson.id} />
                            <Button type="submit" variant="destructive" size="icon-sm" aria-label={`Delete ${lesson.name}`}>
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
