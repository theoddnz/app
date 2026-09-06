"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowBigDown, Lock, X } from "@/components/ui/tabler-icons";
import { cn } from "@/lib/utils";
import { isCheckpoint, type CourseProgress, type Slide } from "./types";
import {
  IntroSlideView,
  OutroSlideView,
  ProjectSlideView,
  QuizSlideView,
  VideoSlideView,
} from "./Slides";

const SPRING = { type: "spring" as const, stiffness: 260, damping: 34, mass: 0.8 };

export function CoursePlayer({
  slides,
  progress,
  onUnlock,
  onCompleteCheckpoint,
  onExit,
}: {
  slides: Slide[];
  progress: CourseProgress;
  onUnlock: (index: number) => void;
  onCompleteCheckpoint: (id: string, answer?: number) => void;
  onExit: () => void;
}) {
  const [index, setIndex] = useState(() =>
    Math.min(progress.unlockedIndex, slides.length - 1),
  );
  const [height, setHeight] = useState(0);
  const [nudge, setNudge] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const wheelLock = useRef(false);
  const nudgeTimer = useRef<number | null>(null);

  const current = slides[index];
  const blocked =
    isCheckpoint(current) && !progress.completed.includes(current.id);

  // Measure the viewport height and keep the track aligned on resize.
  useEffect(() => {
    const measure = () => {
      const h = containerRef.current?.clientHeight ?? window.innerHeight;
      setHeight(h);
      y.set(-index * h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerNudge = useCallback(() => {
    setNudge(true);
    if (nudgeTimer.current) window.clearTimeout(nudgeTimer.current);
    nudgeTimer.current = window.setTimeout(() => setNudge(false), 1600);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      let target = index;
      if (next >= 0 && next < slides.length) {
        if (next > index && blocked) {
          triggerNudge();
        } else {
          target = next;
        }
      }
      if (target !== index) {
        setIndex(target);
        if (target > progress.unlockedIndex) onUnlock(target);
      }
      if (height > 0) animate(y, -target * height, SPRING);
    },
    [index, blocked, slides.length, height, progress.unlockedIndex, onUnlock, triggerNudge, y],
  );

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const onWheel = (e: React.WheelEvent) => {
    if (wheelLock.current || Math.abs(e.deltaY) < 14) return;
    wheelLock.current = true;
    window.setTimeout(() => (wheelLock.current = false), 620);
    goTo(e.deltaY > 0 ? index + 1 : index - 1);
  };

  const restart = useCallback(() => {
    setIndex(0);
    if (height > 0) animate(y, 0, SPRING);
  }, [height, y]);

  const progressPct =
    slides.length > 1 ? (index / (slides.length - 1)) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onWheel={onWheel}
      data-lenis-prevent
      className="relative h-dvh w-full touch-none overflow-hidden bg-black"
    >
      {/* progress bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1 bg-white/15">
        <motion.div
          className="h-full bg-[#c4622d]"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* top controls */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 pt-4">
        <button
          type="button"
          onClick={onExit}
          aria-label="Exit course"
          className="grid size-9 place-items-center rounded-full bg-black/40 text-white/90 backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <X className="size-5" />
        </button>
        <span className="rounded-full bg-black/40 px-3 py-1 font-space text-[11px] font-medium text-white/80 backdrop-blur-md">
          {index + 1} / {slides.length}
        </span>
      </div>

      {/* the vertical track */}
      <motion.div
        drag="y"
        dragElastic={0.16}
        dragMomentum={false}
        dragConstraints={{
          top: -(slides.length - 1) * height,
          bottom: 0,
        }}
        style={{ y }}
        onDragEnd={(_, info) => {
          const threshold = Math.max(60, height * 0.16);
          if (info.offset.y < -threshold || info.velocity.y < -650) {
            goTo(index + 1);
          } else if (info.offset.y > threshold || info.velocity.y > 650) {
            goTo(index - 1);
          } else if (height > 0) {
            animate(y, -index * height, SPRING);
          }
        }}
        className="absolute inset-x-0 top-0 flex w-full flex-col will-change-transform backface-hidden"
      >
        {slides.map((slide, i) => {
          const near = Math.abs(i - index) <= 1;
          return (
            <div key={slide.id} className="h-dvh w-full shrink-0">
              {near ? (
                <SlideRenderer
                  slide={slide}
                  active={i === index}
                  progress={progress}
                  onCompleteCheckpoint={onCompleteCheckpoint}
                  onRestart={restart}
                  goNext={() => goTo(index + 1)}
                />
              ) : null}
            </div>
          );
        })}
      </motion.div>

      {/* swipe / locked hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center">
        {blocked ? (
          <motion.span
            animate={
              nudge
                ? { x: [0, -6, 6, -6, 6, 0] }
                : { opacity: [0.6, 1, 0.6] }
            }
            transition={
              nudge
                ? { duration: 0.4 }
                : { duration: 2, repeat: Infinity }
            }
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-space text-[12px] font-medium backdrop-blur-md",
              nudge
                ? "bg-red-500/85 text-white"
                : "bg-black/45 text-white/85",
            )}
          >
            <Lock className="size-3.5" />
            Complete this to continue
          </motion.span>
        ) : index < slides.length - 1 ? (
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3.5 py-1.5 font-space text-[12px] font-medium text-white/85 backdrop-blur-md"
          >
            <ArrowBigDown className="size-3.5" />
            Swipe up
          </motion.span>
        ) : null}
      </div>
    </div>
  );
}

function SlideRenderer({
  slide,
  active,
  progress,
  onCompleteCheckpoint,
  onRestart,
  goNext,
}: {
  slide: Slide;
  active: boolean;
  progress: CourseProgress;
  onCompleteCheckpoint: (id: string, answer?: number) => void;
  onRestart: () => void;
  goNext: () => void;
}) {
  switch (slide.kind) {
    case "intro":
      return <IntroSlideView slide={slide} onStart={goNext} />;
    case "video":
      return <VideoSlideView slide={slide} active={active} />;
    case "quiz":
      return (
        <QuizSlideView
          slide={slide}
          completed={progress.completed.includes(slide.id)}
          savedAnswer={progress.answers[slide.id]}
          onComplete={(answer) => onCompleteCheckpoint(slide.id, answer)}
        />
      );
    case "project":
      return (
        <ProjectSlideView
          slide={slide}
          completed={progress.completed.includes(slide.id)}
          onComplete={() => onCompleteCheckpoint(slide.id)}
        />
      );
    case "outro":
      return <OutroSlideView onRestart={onRestart} />;
    default:
      return null;
  }
}
