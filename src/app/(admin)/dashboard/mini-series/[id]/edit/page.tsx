import { asc, eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/ui/tabler-icons";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { MiniSeriesForm } from "@/components/admin/MiniSeriesForm";
import {
  MiniSeriesLessonsManager,
  type AdminLesson,
} from "@/components/admin/MiniSeriesLessonsManager";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { lessonNotes, lessonProjects, lessonQuizzes, miniSeries, miniSeriesLessons } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";
import { getBunnyPlayback, getBunnyVideo, isBunnyStreamConfigured } from "@/lib/bunny-stream";

export const dynamic = "force-dynamic";

// Bunny VideoModelStatus: 4 = Finished (playable), 5 = Error, 6 = UploadFailed.
async function syncVideoStatus(
  db: ReturnType<typeof getDb>,
  lesson: { id: string; bunnyVideoId: string; videoStatus: string },
): Promise<string> {
  if (!lesson.bunnyVideoId || lesson.videoStatus === "ready" || !isBunnyStreamConfigured()) {
    return lesson.videoStatus;
  }

  try {
    const info = await getBunnyVideo(lesson.bunnyVideoId);
    if (!info) return lesson.videoStatus;

    const next = info.status === 4 ? "ready" : info.status === 5 || info.status === 6 ? "error" : "processing";
    if (next !== lesson.videoStatus) {
      await db
        .update(miniSeriesLessons)
        .set({ videoStatus: next, durationSeconds: info.length, updatedAt: new Date() })
        .where(eq(miniSeriesLessons.id, lesson.id));
    }
    return next;
  } catch {
    return lesson.videoStatus;
  }
}

export default async function EditMiniSeriesPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;

  const db = getDb();
  const [series] = await db.select().from(miniSeries).where(eq(miniSeries.id, id)).limit(1);
  if (!series) notFound();

  const lessonRows = await db
    .select()
    .from(miniSeriesLessons)
    .where(eq(miniSeriesLessons.seriesId, id))
    .orderBy(asc(miniSeriesLessons.position));

  const lessonIds = lessonRows.map((l) => l.id);
  const [notes, quizzes, projects] = lessonIds.length
    ? await Promise.all([
        db.select().from(lessonNotes).where(inArray(lessonNotes.lessonId, lessonIds)),
        db.select().from(lessonQuizzes).where(inArray(lessonQuizzes.lessonId, lessonIds)).orderBy(asc(lessonQuizzes.position)),
        db.select().from(lessonProjects).where(inArray(lessonProjects.lessonId, lessonIds)),
      ])
    : [[], [], []];

  const notesByLesson = new Map(notes.map((n) => [n.lessonId, n.contentMarkdown]));
  const projectByLesson = new Map(projects.map((p) => [p.lessonId, p]));

  const lessons: AdminLesson[] = await Promise.all(
    lessonRows.map(async (lesson) => {
      const videoStatus = await syncVideoStatus(db, lesson);
      const iframeUrl =
        lesson.bunnyVideoId && videoStatus === "ready"
          ? getBunnyPlayback(lesson.bunnyVideoId, lesson.bunnyLibraryId).iframe
          : "";
      const project = projectByLesson.get(lesson.id);

      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        position: lesson.position,
        bunnyVideoId: lesson.bunnyVideoId,
        videoStatus,
        hasNotes: lesson.hasNotes,
        hasQuiz: lesson.hasQuiz,
        hasProject: lesson.hasProject,
        notes: notesByLesson.get(lesson.id) ?? "",
        quizzes: quizzes
          .filter((q) => q.lessonId === lesson.id)
          .map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            answerIndex: q.answerIndex,
            hint: q.hint,
            explanation: q.explanation,
          })),
        project: project ? { title: project.title, brief: project.brief, steps: project.steps } : null,
        iframeUrl,
      };
    }),
  );

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-2 -ml-2 text-muted-foreground">
          <Link href="/dashboard/mini-series">
            <ArrowLeft className="size-4" />
            All series
          </Link>
        </Button>
        <AdminHeader eyebrow="Mini-series" title={series.title} description={`/${series.slug} · ${series.status}`} />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Details</h2>
        <MiniSeriesForm
          mode="edit"
          submitLabel="Save details"
          series={{
            id: series.id,
            title: series.title,
            slug: series.slug,
            subtitle: series.subtitle,
            description: series.description,
            curriculum: series.curriculum,
            priceCents: series.priceCents,
            currency: series.currency,
            lessonCountOverride: series.lessonCountOverride,
            dodoProductId: series.dodoProductId,
            thumbnailUrl: series.thumbnailUrl,
            status: series.status,
          }}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Lessons &amp; content</h2>
        {!isBunnyStreamConfigured() ? (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            Bunny Stream isn&apos;t configured yet. Add <code>BUNNY_STREAM_LIBRARY_ID</code> and <code>BUNNY_STREAM_API_KEY</code> to enable video uploads.
          </p>
        ) : null}
        <MiniSeriesLessonsManager seriesId={series.id} lessons={lessons} />
      </section>
    </div>
  );
}
