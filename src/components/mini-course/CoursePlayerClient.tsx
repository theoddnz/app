"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { saveMiniCourseProgressAction } from "@/app/mini-course/progress-actions";
import { CoursePlayer } from "./CoursePlayer";
import type { CourseProgress, Slide } from "./types";

export function CoursePlayerClient({
  seriesId,
  slides,
  initialProgress,
}: {
  seriesId: string;
  slides: Slide[];
  initialProgress: CourseProgress;
}) {
  const router = useRouter();
  const [progress, setProgress] = useState<CourseProgress>(initialProgress);
  const saveTimer = useRef<number | null>(null);

  const persist = useCallback(
    (next: CourseProgress) => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        void saveMiniCourseProgressAction(seriesId, next).catch(() => {});
      }, 600);
    },
    [seriesId],
  );

  const unlockUpTo = useCallback(
    (index: number) => {
      setProgress((prev) => {
        if (index <= prev.unlockedIndex) return prev;
        const next = { ...prev, unlockedIndex: index };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const completeCheckpoint = useCallback(
    (id: string, answer?: number) => {
      setProgress((prev) => {
        const completed = prev.completed.includes(id) ? prev.completed : [...prev.completed, id];
        const answers = answer !== undefined ? { ...prev.answers, [id]: answer } : prev.answers;
        const next = { ...prev, completed, answers };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  return (
    <CoursePlayer
      slides={slides}
      progress={progress}
      onUnlock={unlockUpTo}
      onCompleteCheckpoint={completeCheckpoint}
      onExit={() => router.push("/mini-course")}
    />
  );
}
