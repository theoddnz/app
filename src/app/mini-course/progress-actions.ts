"use server";

import { getAppSession } from "@/lib/admin-auth";
import { hasActiveEntitlement, saveProgressForUser } from "@/lib/mini-course";
import type { CourseProgress } from "@/components/mini-course/types";

// Persists a learner's progress, but only for a series they're entitled to.
export async function saveMiniCourseProgressAction(seriesId: string, progress: CourseProgress): Promise<void> {
  const session = await getAppSession();
  if (!session) return;

  const entitled = await hasActiveEntitlement(session.userId, seriesId);
  if (!entitled) return;

  await saveProgressForUser(session.userId, seriesId, {
    unlockedIndex: Math.max(0, Math.floor(progress.unlockedIndex)),
    completed: Array.isArray(progress.completed) ? progress.completed.slice(0, 500) : [],
    answers: progress.answers && typeof progress.answers === "object" ? progress.answers : {},
  });
}
