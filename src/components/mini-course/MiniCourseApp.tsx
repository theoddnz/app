"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { YouTubeShort } from "@/lib/youtube-shorts";
import { buildCurriculum } from "./curriculum";
import { CoursePlayer } from "./CoursePlayer";
import { Paywall } from "./Paywall";
import { useCourseState } from "./useCourseState";

export function MiniCourseApp({ shorts }: { shorts: YouTubeShort[] }) {
  const router = useRouter();
  const { hydrated, purchased, progress, purchase, unlockUpTo, completeCheckpoint } =
    useCourseState();

  const slides = useMemo(() => buildCurriculum(shorts), [shorts]);
  const lessonCount = useMemo(
    () => slides.filter((s) => s.kind === "video").length,
    [slides],
  );

  // Avoid a hydration flash between the persisted state and the first paint.
  if (!hydrated) {
    return <div className="h-dvh w-full bg-background" />;
  }

  if (!purchased) {
    return <Paywall onUnlock={purchase} lessonCount={lessonCount} />;
  }

  return (
    <CoursePlayer
      slides={slides}
      progress={progress}
      onUnlock={unlockUpTo}
      onCompleteCheckpoint={completeCheckpoint}
      onExit={() => router.push("/")}
    />
  );
}
