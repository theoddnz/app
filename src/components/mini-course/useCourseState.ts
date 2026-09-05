"use client";

import { useCallback, useEffect, useState } from "react";
import type { CourseProgress } from "./types";

const PURCHASE_KEY = "mini-course:purchased";
const PROGRESS_KEY = "mini-course:progress";

const EMPTY_PROGRESS: CourseProgress = {
  unlockedIndex: 0,
  completed: [],
  answers: {},
};

type State = {
  hydrated: boolean;
  purchased: boolean;
  progress: CourseProgress;
};

function readProgress(): CourseProgress {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return {
      unlockedIndex: parsed.unlockedIndex ?? 0,
      completed: parsed.completed ?? [],
      answers: parsed.answers ?? {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

/** Persistent purchase + progress state backed entirely by localStorage. */
export function useCourseState() {
  const [state, setState] = useState<State>({
    hydrated: false,
    purchased: false,
    progress: EMPTY_PROGRESS,
  });

  // One-time hydration from localStorage after mount (SSR-safe).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      hydrated: true,
      purchased: window.localStorage.getItem(PURCHASE_KEY) === "true",
      progress: readProgress(),
    });
  }, []);

  const saveProgress = useCallback((progress: CourseProgress) => {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, []);

  const purchase = useCallback(() => {
    window.localStorage.setItem(PURCHASE_KEY, "true");
    setState((prev) => ({ ...prev, purchased: true }));
  }, []);

  const unlockUpTo = useCallback(
    (index: number) => {
      setState((prev) => {
        if (index <= prev.progress.unlockedIndex) return prev;
        const progress = { ...prev.progress, unlockedIndex: index };
        saveProgress(progress);
        return { ...prev, progress };
      });
    },
    [saveProgress],
  );

  const completeCheckpoint = useCallback(
    (id: string, answer?: number) => {
      setState((prev) => {
        const completed = prev.progress.completed.includes(id)
          ? prev.progress.completed
          : [...prev.progress.completed, id];
        const answers =
          answer === undefined
            ? prev.progress.answers
            : { ...prev.progress.answers, [id]: answer };
        const progress = { ...prev.progress, completed, answers };
        saveProgress(progress);
        return { ...prev, progress };
      });
    },
    [saveProgress],
  );

  return {
    hydrated: state.hydrated,
    purchased: state.purchased,
    progress: state.progress,
    purchase,
    unlockUpTo,
    completeCheckpoint,
  };
}
