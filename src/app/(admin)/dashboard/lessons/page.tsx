import { desc } from "drizzle-orm";
import { Clock, LinkIcon, PauseCircle, PlayCircle, Trash2 } from "@/components/ui/huge-icons";

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

  return (
      <div className="space-y-8">
        <AdminHeader
          title="Lessons"
          description="Add lessons under paths. Videos are stored as Bunny/public URLs, not uploaded through the app."
        />

        <LessonForm paths={paths.map((path) => ({ id: path.id, name: path.name }))} />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">All lessons</h2>
            <span className="text-sm text-muted-foreground">{allLessons.length} total</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {allLessons.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No lessons yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[900px] space-y-2 p-4">
                  {allLessons.map((lesson) => (
                    <div key={lesson.id} className="grid grid-cols-[80px_1.4fr_1fr_140px_140px] items-center gap-3 rounded-lg border border-border bg-background p-3">
                      {lesson.thumbnailUrl ? (
                        <img src={lesson.thumbnailUrl} alt="" className="aspect-video w-16 rounded-md border border-border object-cover" />
                      ) : (
                        <div className="aspect-video w-16 rounded-md border border-dashed border-border bg-muted" />
                      )}

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-medium">{lesson.name}</p>
                          {lesson.isHold ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-xs">
                              <PauseCircle className="size-3" />
                              Hold
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                              <PlayCircle className="size-3" />
                              Ready
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{pathNames.get(lesson.pathId) ?? "Unknown path"}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{lesson.description || "No description"}</p>
                      </div>

                      <div className="min-w-0">
                        {lesson.videoUrl ? (
                          <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 truncate text-xs text-foreground/70 hover:text-foreground">
                            <LinkIcon className="size-3 shrink-0" />
                            Video link
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">No video link</span>
                        )}
                      </div>

                      <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        {lesson.durationMinutes} min
                      </p>

                      <div className="flex items-center gap-2">
                        <form action={updateLessonHoldAction}>
                          <input type="hidden" name="id" value={lesson.id} />
                          <input type="checkbox" name="isHold" defaultChecked={lesson.isHold} className="size-4 accent-foreground" />
                          <Button type="submit" variant="outline" size="sm" className="ml-2">
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
  );
}
