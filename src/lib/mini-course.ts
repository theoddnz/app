import "server-only";

import { and, asc, eq, inArray } from "drizzle-orm";

import { getDb } from "@/db";
import {
  lessonNotes,
  lessonProjects,
  lessonQuizzes,
  miniSeries,
  miniSeriesLessons,
  miniSeriesProgress,
  miniSeriesPurchases,
} from "@/db/schema";
import { getDodoSubscription } from "@/lib/dodo";
import type { CourseData } from "@/components/mini-course/curriculum";
import type { CourseProgress } from "@/components/mini-course/types";

// A user may watch a series while their subscription is active and unexpired.
export async function hasActiveEntitlement(userId: string, seriesId: string): Promise<boolean> {
  const db = getDb();
  const [row] = await db
    .select({ status: miniSeriesPurchases.status, currentPeriodEnd: miniSeriesPurchases.currentPeriodEnd })
    .from(miniSeriesPurchases)
    .where(and(eq(miniSeriesPurchases.userId, userId), eq(miniSeriesPurchases.seriesId, seriesId)))
    .limit(1);

  if (!row || row.status !== "active") return false;
  if (row.currentPeriodEnd && row.currentPeriodEnd.getTime() < Date.now()) return false;
  return true;
}

/** Records a checkout attempt without downgrading an already-active subscription. */
export async function upsertPendingPurchase(params: {
  userId: string;
  seriesId: string;
  amountCents: number;
  currency: string;
}): Promise<void> {
  const db = getDb();
  await db
    .insert(miniSeriesPurchases)
    .values({
      userId: params.userId,
      seriesId: params.seriesId,
      status: "pending",
      amountCents: params.amountCents,
      currency: params.currency,
    })
    .onConflictDoNothing({
      target: [miniSeriesPurchases.seriesId, miniSeriesPurchases.userId],
    });
}

export type SubscriptionSync = {
  userId: string;
  seriesId: string;
  status: "active" | "cancelled" | "expired" | "past_due" | "pending";
  dodoSubscriptionId?: string;
  dodoPaymentId?: string;
  currentPeriodEnd?: Date | null;
  amountCents?: number;
  currency?: string;
};

/** Applies a subscription state change from a verified Dodo webhook. */
export async function syncSubscription(sync: SubscriptionSync): Promise<void> {  const db = getDb();

  const set = {
    status: sync.status,
    updatedAt: new Date(),
    ...(sync.dodoSubscriptionId ? { dodoSubscriptionId: sync.dodoSubscriptionId } : {}),
    ...(sync.dodoPaymentId ? { dodoPaymentId: sync.dodoPaymentId } : {}),
    ...(sync.currentPeriodEnd !== undefined ? { currentPeriodEnd: sync.currentPeriodEnd } : {}),
    ...(typeof sync.amountCents === "number" ? { amountCents: sync.amountCents } : {}),
    ...(sync.currency ? { currency: sync.currency } : {}),
  };

  await db
    .insert(miniSeriesPurchases)
    .values({
      userId: sync.userId,
      seriesId: sync.seriesId,
      status: sync.status,
      dodoSubscriptionId: sync.dodoSubscriptionId ?? "",
      dodoPaymentId: sync.dodoPaymentId ?? "",
      currentPeriodEnd: sync.currentPeriodEnd ?? null,
      amountCents: sync.amountCents ?? 0,
      currency: sync.currency ?? "usd",
    })
    .onConflictDoUpdate({
      target: [miniSeriesPurchases.seriesId, miniSeriesPurchases.userId],
      set,
    });
}

/**
 * Grants access straight after checkout by reading the subscription's true
 * state from Dodo — so it works even before the webhook arrives (e.g. locally).
 */
export async function reconcileEntitlement(
  userId: string,
  seriesId: string,
  subscriptionId: string,
): Promise<boolean> {
  try {
    const sub = (await getDodoSubscription(subscriptionId)) as {
      status?: string;
      metadata?: Record<string, string>;
      next_billing_date?: string;
      recurring_pre_tax_amount?: number;
      currency?: string;
    };

    const meta = sub.metadata ?? {};
    if (meta.userId && meta.userId !== userId) return false;
    if (meta.seriesId && meta.seriesId !== seriesId) return false;

    const status = String(sub.status ?? "");
    const active = status === "active" || status === "trialing";
    const mapped: SubscriptionSync["status"] = active
      ? "active"
      : status === "cancelled"
        ? "cancelled"
        : status === "expired"
          ? "expired"
          : "past_due";

    await syncSubscription({
      userId,
      seriesId,
      status: mapped,
      dodoSubscriptionId: subscriptionId,
      currentPeriodEnd: sub.next_billing_date ? new Date(sub.next_billing_date) : undefined,
      amountCents: typeof sub.recurring_pre_tax_amount === "number" ? sub.recurring_pre_tax_amount : undefined,
      currency: typeof sub.currency === "string" ? sub.currency.toLowerCase() : undefined,
    });

    return active;
  } catch {
    return false;
  }
}

// ── Public content ──

const IFRAME_BASE = "https://iframe.mediadelivery.net/embed";

function thumbnailUrl(videoId: string): string {
  const cdn = (process.env.BUNNY_STREAM_CDN_HOSTNAME ?? "").trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  return cdn ? `https://${cdn}/${videoId}/thumbnail.jpg` : "";
}

export type SeriesCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  priceCents: number;
  currency: string;
  thumbnailUrl: string;
  lessonCount: number;
};

export async function listPublishedSeries(): Promise<SeriesCard[]> {
  const db = getDb();
  const rows = await db
    .select({
      id: miniSeries.id,
      slug: miniSeries.slug,
      title: miniSeries.title,
      subtitle: miniSeries.subtitle,
      priceCents: miniSeries.priceCents,
      currency: miniSeries.currency,
      thumbnailUrl: miniSeries.thumbnailUrl,
      lessonCountOverride: miniSeries.lessonCountOverride,
    })
    .from(miniSeries)
    .where(eq(miniSeries.status, "published"))
    .orderBy(asc(miniSeries.createdAt));

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle,
    priceCents: r.priceCents,
    currency: r.currency,
    thumbnailUrl: r.thumbnailUrl,
    lessonCount: r.lessonCountOverride,
  }));
}

export type SeriesMeta = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  priceCents: number;
  currency: string;
  lessonCount: number;
};

export async function getPublishedSeriesMeta(slug: string): Promise<SeriesMeta | null> {
  const db = getDb();
  const [series] = await db
    .select()
    .from(miniSeries)
    .where(and(eq(miniSeries.slug, slug), eq(miniSeries.status, "published")))
    .limit(1);
  if (!series) return null;

  const [{ count } = { count: 0 }] = await db
    .select({ count: miniSeriesLessons.id })
    .from(miniSeriesLessons)
    .where(and(eq(miniSeriesLessons.seriesId, series.id), eq(miniSeriesLessons.videoStatus, "ready")));

  return {
    id: series.id,
    slug: series.slug,
    title: series.title,
    subtitle: series.subtitle,
    description: series.description,
    priceCents: series.priceCents,
    currency: series.currency,
    lessonCount: series.lessonCountOverride || (typeof count === "number" ? count : 0),
  };
}

/** Loads the full playable content for a published series, ready-videos only. */
export async function getSeriesContent(slug: string): Promise<CourseData | null> {
  const db = getDb();
  const [series] = await db
    .select()
    .from(miniSeries)
    .where(and(eq(miniSeries.slug, slug), eq(miniSeries.status, "published")))
    .limit(1);
  if (!series) return null;

  const lessonRows = await db
    .select()
    .from(miniSeriesLessons)
    .where(and(eq(miniSeriesLessons.seriesId, series.id), eq(miniSeriesLessons.videoStatus, "ready")))
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

  return {
    id: series.id,
    slug: series.slug,
    title: series.title,
    subtitle: series.subtitle,
    lessons: lessonRows.map((lesson) => {
      const project = projectByLesson.get(lesson.id);
      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        iframeUrl: `${IFRAME_BASE}/${lesson.bunnyLibraryId}/${lesson.bunnyVideoId}`,
        thumbnail: thumbnailUrl(lesson.bunnyVideoId),
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
      };
    }),
  };
}

// ── Progress ──

export async function getProgress(userId: string, seriesId: string): Promise<CourseProgress> {
  const db = getDb();
  const [row] = await db
    .select({
      unlockedPosition: miniSeriesProgress.unlockedPosition,
      completed: miniSeriesProgress.completed,
      answers: miniSeriesProgress.answers,
    })
    .from(miniSeriesProgress)
    .where(and(eq(miniSeriesProgress.userId, userId), eq(miniSeriesProgress.seriesId, seriesId)))
    .limit(1);

  return {
    unlockedIndex: row?.unlockedPosition ?? 0,
    completed: row?.completed ?? [],
    answers: row?.answers ?? {},
  };
}

export async function saveProgressForUser(userId: string, seriesId: string, progress: CourseProgress): Promise<void> {
  const db = getDb();
  await db
    .insert(miniSeriesProgress)
    .values({
      userId,
      seriesId,
      unlockedPosition: progress.unlockedIndex,
      completed: progress.completed,
      answers: progress.answers,
    })
    .onConflictDoUpdate({
      target: [miniSeriesProgress.seriesId, miniSeriesProgress.userId],
      set: {
        unlockedPosition: progress.unlockedIndex,
        completed: progress.completed,
        answers: progress.answers,
        updatedAt: new Date(),
      },
    });
}
