import { desc } from "drizzle-orm";
import { Clock, LinkIcon, PauseCircle, PlayCircle, Trash2 } from "@/components/ui/tabler-icons";

import {
  deleteLessonAction,
  updateLessonHoldAction,
} from "@/app/admin-actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LessonForm } from "@/components/admin/LessonForm";
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
        title="Lessons"
        description="Add lessons under paths. Videos are stored as Bunny/public URLs, not uploaded through the app."
      />

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total lessons</p>
          <p className="mt-3 text-2xl font-semibold">{allLessons.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">On hold</p>
          <p className="mt-3 text-2xl font-semibold">{heldLessons}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Paths available</p>
          <p className="mt-3 text-2xl font-semibold">{paths.length}</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <div>
              <h2 className="text-xl font-semibold">All lessons</h2>
              <p className="mt-1 text-sm text-muted-foreground">Review lesson videos, duration, path placement, and hold state.</p>
            </div>
            <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">{allLessons.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {allLessons.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No lessons yet.</div>
            ) : (
              <div className="max-h-[calc(100svh-18rem)] overflow-auto">
                <table className="w-full min-w-[1060px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 border-b border-border bg-muted/80 text-xs uppercase text-muted-foreground backdrop-blur">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Lesson</th>
                      <th scope="col" className="px-4 py-3 font-medium">Path</th>
                      <th scope="col" className="px-4 py-3 font-medium">Video</th>
                      <th scope="col" className="px-4 py-3 font-medium">Duration</th>
                      <th scope="col" className="px-4 py-3 font-medium">Status</th>
                      <th scope="col" className="px-4 py-3 font-medium">Created</th>
                      <th scope="col" className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {allLessons.map((lesson) => (
                      <tr key={lesson.id} className="transition-colors hover:bg-muted/45">
                        <td className="px-4 py-4 align-middle">
                          <div className="flex min-w-0 items-center gap-3">
                            {lesson.thumbnailUrl ? (
                              <img src={lesson.thumbnailUrl} alt="" className="aspect-video w-20 shrink-0 rounded-md border border-border object-cover" />
                            ) : (
                              <div className="aspect-video w-20 shrink-0 rounded-md border border-dashed border-border bg-muted" />
                            )}
                            <div className="min-w-0">
                              <p className="truncate font-medium">{lesson.name}</p>
                              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{lesson.description || "No description"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="max-w-[180px] px-4 py-4 align-middle text-muted-foreground">
                          <span className="block truncate">{pathNames.get(lesson.pathId) ?? "Unknown path"}</span>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          {lesson.videoUrl ? (
                            <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                              <LinkIcon className="size-4" />
                              Open
                            </a>
                          ) : (
                            <span className="text-muted-foreground">Missing</span>
                          )}
                        </td>
                        <td className="px-4 py-4 align-middle text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-4" />
                            {lesson.durationMinutes} min
                          </span>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          {lesson.isHold ? (
                            <span className="inline-flex h-7 items-center gap-1 rounded-md bg-secondary/20 px-2.5 text-xs font-medium">
                              <PauseCircle className="size-3.5" />
                              Hold
                            </span>
                          ) : (
                            <span className="inline-flex h-7 items-center gap-1 rounded-md bg-muted px-2.5 text-xs font-medium text-muted-foreground">
                              <PlayCircle className="size-3.5" />
                              Ready
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 align-middle text-muted-foreground">{formatDate(lesson.createdAt)}</td>
                        <td className="px-4 py-4 align-middle">
                          <div className="flex items-center gap-2">
                            <form action={updateLessonHoldAction} className="flex items-center gap-2">
                              <input type="hidden" name="id" value={lesson.id} />
                              <label className="inline-flex items-center gap-1.5 text-sm">
                                <input type="checkbox" name="isHold" defaultChecked={lesson.isHold} className="size-4 accent-foreground" />
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

        <aside className="xl:sticky xl:top-4">
          <LessonForm paths={paths.map((path) => ({ id: path.id, name: path.name }))} />
        </aside>
      </div>
    </div>
  );
}
