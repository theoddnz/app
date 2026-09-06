"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { asc, eq, sql } from "drizzle-orm";

import { getDb } from "@/db";
import {
  lessonNotes,
  lessonProjects,
  lessonQuizzes,
  miniSeries,
  miniSeriesLessons,
} from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";
import { deleteBunnyVideo } from "@/lib/bunny-stream";
import type { ActionState } from "@/types/admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 180);
}

function dollarsToCents(value: string) {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : 0;
}

function revalidateSeries(seriesId: string) {
  revalidatePath("/dashboard/mini-series");
  revalidatePath(`/dashboard/mini-series/${seriesId}/edit`);
}

// ── Series ──

export async function createMiniSeriesAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireAdminSession();

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { ok: false, message: "Title is required." };

  const slug = slugify(String(formData.get("slug") ?? "") || title);
  if (!slug) return { ok: false, message: "Could not derive a slug from the title." };

  const db = getDb();
  const [existing] = await db.select({ id: miniSeries.id }).from(miniSeries).where(eq(miniSeries.slug, slug)).limit(1);
  if (existing) return { ok: false, message: "A series with this slug already exists." };

  const [created] = await db
    .insert(miniSeries)
    .values({
      slug,
      title,
      subtitle: String(formData.get("subtitle") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      curriculum: String(formData.get("curriculum") ?? "").trim(),
      priceCents: dollarsToCents(String(formData.get("price") ?? "")),
      currency: (String(formData.get("currency") ?? "usd").trim() || "usd").toLowerCase().slice(0, 3),
      lessonCountOverride: Number.parseInt(String(formData.get("lessonCount") ?? "0"), 10) || 0,
      dodoProductId: String(formData.get("dodoProductId") ?? "").trim(),
      createdBy: session.userId,
    })
    .returning({ id: miniSeries.id });

  revalidatePath("/dashboard/mini-series");
  redirect(`/dashboard/mini-series/${created.id}/edit`);
}

export async function updateMiniSeriesAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminSession();

  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, message: "Missing series id." };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { ok: false, message: "Title is required." };

  const db = getDb();
  await db
    .update(miniSeries)
    .set({
      title,
      subtitle: String(formData.get("subtitle") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      curriculum: String(formData.get("curriculum") ?? "").trim(),
      priceCents: dollarsToCents(String(formData.get("price") ?? "")),
      currency: (String(formData.get("currency") ?? "usd").trim() || "usd").toLowerCase().slice(0, 3),
      lessonCountOverride: Number.parseInt(String(formData.get("lessonCount") ?? "0"), 10) || 0,
      dodoProductId: String(formData.get("dodoProductId") ?? "").trim(),
      thumbnailUrl: String(formData.get("thumbnailUrl") ?? "").trim(),
      status: String(formData.get("status") ?? "draft") === "published" ? "published" : "draft",
      updatedAt: new Date(),
    })
    .where(eq(miniSeries.id, id));

  revalidateSeries(id);
  return { ok: true, message: "Series saved." };
}

export async function deleteMiniSeriesAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const db = getDb();
  // Best-effort remove Bunny videos before the DB cascade drops the rows.
  const lessons = await db
    .select({ videoId: miniSeriesLessons.bunnyVideoId })
    .from(miniSeriesLessons)
    .where(eq(miniSeriesLessons.seriesId, id));
  await Promise.allSettled(lessons.filter((l) => l.videoId).map((l) => deleteBunnyVideo(l.videoId)));

  await db.delete(miniSeries).where(eq(miniSeries.id, id));
  revalidatePath("/dashboard/mini-series");
  redirect("/dashboard/mini-series");
}

// ── Lessons ──

export async function createLessonAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminSession();

  const seriesId = String(formData.get("seriesId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!seriesId) return { ok: false, message: "Missing series id." };
  if (!title) return { ok: false, message: "Lesson title is required." };

  const db = getDb();
  const [{ next } = { next: 0 }] = await db
    .select({ next: sql<number>`coalesce(max(${miniSeriesLessons.position}), -1) + 1` })
    .from(miniSeriesLessons)
    .where(eq(miniSeriesLessons.seriesId, seriesId));

  await db.insert(miniSeriesLessons).values({
    seriesId,
    position: next,
    title,
    description: String(formData.get("description") ?? "").trim(),
  });

  revalidateSeries(seriesId);
  return { ok: true, message: "Lesson added." };
}

export async function updateLessonAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminSession();

  const id = String(formData.get("id") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!id || !seriesId) return { ok: false, message: "Missing lesson id." };
  if (!title) return { ok: false, message: "Lesson title is required." };

  const db = getDb();
  await db
    .update(miniSeriesLessons)
    .set({
      title,
      description: String(formData.get("description") ?? "").trim(),
      updatedAt: new Date(),
    })
    .where(eq(miniSeriesLessons.id, id));

  revalidateSeries(seriesId);
  return { ok: true, message: "Lesson saved." };
}

export async function deleteLessonAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  if (!id || !seriesId) return;

  const db = getDb();
  const [lesson] = await db
    .select({ videoId: miniSeriesLessons.bunnyVideoId })
    .from(miniSeriesLessons)
    .where(eq(miniSeriesLessons.id, id))
    .limit(1);
  if (lesson?.videoId) await deleteBunnyVideo(lesson.videoId).catch(() => {});

  await db.delete(miniSeriesLessons).where(eq(miniSeriesLessons.id, id));
  revalidateSeries(seriesId);
}

/** Swaps a lesson's position with its neighbour in the given direction. */
export async function moveLessonAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !seriesId || (direction !== "up" && direction !== "down")) return;

  const db = getDb();
  const ordered = await db
    .select({ id: miniSeriesLessons.id, position: miniSeriesLessons.position })
    .from(miniSeriesLessons)
    .where(eq(miniSeriesLessons.seriesId, seriesId))
    .orderBy(asc(miniSeriesLessons.position));

  const index = ordered.findIndex((l) => l.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= ordered.length) return;

  const current = ordered[index];
  const neighbour = ordered[swapIndex];
  await db.update(miniSeriesLessons).set({ position: neighbour.position }).where(eq(miniSeriesLessons.id, current.id));
  await db.update(miniSeriesLessons).set({ position: current.position }).where(eq(miniSeriesLessons.id, neighbour.id));

  revalidateSeries(seriesId);
}

// ── Resources: notes / quiz / project ──

export async function saveNotesAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminSession();
  const lessonId = String(formData.get("lessonId") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  if (!lessonId || !seriesId) return { ok: false, message: "Missing lesson id." };

  const content = String(formData.get("content") ?? "").trim();
  const db = getDb();
  await db
    .insert(lessonNotes)
    .values({ lessonId, contentMarkdown: content })
    .onConflictDoUpdate({ target: lessonNotes.lessonId, set: { contentMarkdown: content, updatedAt: new Date() } });

  await db.update(miniSeriesLessons).set({ hasNotes: content.length > 0, updatedAt: new Date() }).where(eq(miniSeriesLessons.id, lessonId));
  revalidateSeries(seriesId);
  return { ok: true, message: "Notes saved." };
}

export async function addQuizAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminSession();
  const lessonId = String(formData.get("lessonId") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  if (!lessonId || !seriesId) return { ok: false, message: "Missing lesson id." };

  const question = String(formData.get("question") ?? "").trim();
  const options = formData.getAll("option").map((o) => String(o).trim()).filter(Boolean);
  const answerIndex = Number.parseInt(String(formData.get("answerIndex") ?? "0"), 10) || 0;
  if (!question) return { ok: false, message: "Question is required." };
  if (options.length < 2) return { ok: false, message: "Add at least two options." };
  if (answerIndex < 0 || answerIndex >= options.length) return { ok: false, message: "Correct answer is out of range." };

  const db = getDb();
  const [{ next } = { next: 0 }] = await db
    .select({ next: sql<number>`coalesce(max(${lessonQuizzes.position}), -1) + 1` })
    .from(lessonQuizzes)
    .where(eq(lessonQuizzes.lessonId, lessonId));

  await db.insert(lessonQuizzes).values({
    lessonId,
    position: next,
    question,
    options,
    answerIndex,
    hint: String(formData.get("hint") ?? "").trim(),
    explanation: String(formData.get("explanation") ?? "").trim(),
  });

  await db.update(miniSeriesLessons).set({ hasQuiz: true, updatedAt: new Date() }).where(eq(miniSeriesLessons.id, lessonId));
  revalidateSeries(seriesId);
  return { ok: true, message: "Question added." };
}

export async function deleteQuizAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const lessonId = String(formData.get("lessonId") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  if (!id || !lessonId || !seriesId) return;

  const db = getDb();
  await db.delete(lessonQuizzes).where(eq(lessonQuizzes.id, id));
  const [remaining] = await db.select({ id: lessonQuizzes.id }).from(lessonQuizzes).where(eq(lessonQuizzes.lessonId, lessonId)).limit(1);
  await db.update(miniSeriesLessons).set({ hasQuiz: Boolean(remaining), updatedAt: new Date() }).where(eq(miniSeriesLessons.id, lessonId));
  revalidateSeries(seriesId);
}

export async function saveProjectAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminSession();
  const lessonId = String(formData.get("lessonId") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  if (!lessonId || !seriesId) return { ok: false, message: "Missing lesson id." };

  const title = String(formData.get("title") ?? "").trim();
  const brief = String(formData.get("brief") ?? "").trim();
  const steps = String(formData.get("steps") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const db = getDb();
  const [existing] = await db
    .select({ id: lessonProjects.id })
    .from(lessonProjects)
    .where(eq(lessonProjects.lessonId, lessonId))
    .limit(1);

  if (existing) {
    await db.update(lessonProjects).set({ title, brief, steps, updatedAt: new Date() }).where(eq(lessonProjects.id, existing.id));
  } else {
    await db.insert(lessonProjects).values({ lessonId, position: 0, title, brief, steps });
  }

  const hasProject = Boolean(title || brief || steps.length);
  await db.update(miniSeriesLessons).set({ hasProject, updatedAt: new Date() }).where(eq(miniSeriesLessons.id, lessonId));
  revalidateSeries(seriesId);
  return { ok: true, message: "Project saved." };
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const lessonId = String(formData.get("lessonId") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  if (!lessonId || !seriesId) return;

  const db = getDb();
  await db.delete(lessonProjects).where(eq(lessonProjects.lessonId, lessonId));
  await db.update(miniSeriesLessons).set({ hasProject: false, updatedAt: new Date() }).where(eq(miniSeriesLessons.id, lessonId));
  revalidateSeries(seriesId);
}

// Marks a lesson ready once its Bunny upload completes (called from the client).
export async function markLessonUploadedAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const seriesId = String(formData.get("seriesId") ?? "");
  if (!id || !seriesId) return;

  const db = getDb();
  await db.update(miniSeriesLessons).set({ videoStatus: "processing", updatedAt: new Date() }).where(eq(miniSeriesLessons.id, id));
  revalidateSeries(seriesId);
}
