"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBigDown,
  BadgeCheck,
  Bot,
  Check,
  CheckCircle2,
  Rocket,
  Sparkles,
  Trophy,
  Wrench,
  X,
} from "@/components/ui/tabler-icons";
import { Button3D } from "@/components/ui/button-3d";
import { cn } from "@/lib/utils";
import type {
  IntroSlide,
  ProjectSlide,
  QuizSlide,
  VideoSlide,
} from "./types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Wraps every slide in a full-viewport, centered shell. */
function SlideShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-dvh w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IntroSlideView({
  slide,
  onStart,
}: {
  slide: IntroSlide;
  onStart: () => void;
}) {
  return (
    <SlideShell className="bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#c4622d]/20 blur-[110px]"
      />
      <div className="relative flex max-w-sm flex-col items-center gap-6 px-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted px-3 py-1 font-space text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="size-3.5 text-[#c4622d]" />
          Lesson 01
        </span>
        <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground">
          {slide.title}
        </h2>
        <p className="font-space text-[15px] leading-relaxed text-muted-foreground">
          {slide.subtitle}
        </p>
        <Button3D onClick={onStart} className="mt-2">
          <Rocket className="size-4" />
          Start learning
        </Button3D>
        <span className="mt-4 flex flex-col items-center gap-1 font-space text-[12px] text-muted-foreground">
          <ArrowBigDown className="size-5 animate-bounce text-[#c4622d]" />
          Swipe up
        </span>
      </div>
    </SlideShell>
  );
}

export function VideoSlideView({
  slide,
  active,
}: {
  slide: VideoSlide;
  active: boolean;
}) {
  const { short } = slide;

  return (
    <SlideShell className="bg-black">
      <div className="relative h-full w-full max-w-[min(100vw,calc(100dvh*9/16))]">
        {active ? (
          <iframe
            key={short.id}
            src={`https://www.youtube-nocookie.com/embed/${short.id}?autoplay=1&mute=1&loop=1&playlist=${short.id}&controls=0&modestbranding=1&playsinline=1&rel=0`}
            title={short.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        ) : short.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={short.thumbnail}
            alt={short.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-neutral-900" />
        )}

        {/* title + gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-5 pb-24">
          {short.title ? (
            <p className="line-clamp-2 font-space text-[14px] font-semibold leading-snug text-white/95">
              {short.title}
            </p>
          ) : null}
          <p className="mt-1 font-space text-[12px] text-white/60">
            TheOddOnes - muted autoplay
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

export function QuizSlideView({
  slide,
  completed,
  savedAnswer,
  onComplete,
}: {
  slide: QuizSlide;
  completed: boolean;
  savedAnswer?: number;
  onComplete: (answer: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(
    savedAnswer ?? null,
  );
  const revealed = selected !== null;
  const isCorrect = selected === slide.answer;

  const pick = (index: number) => {
    if (completed) return;
    setSelected(index);
    if (index === slide.answer) onComplete(index);
  };

  return (
    <SlideShell className="bg-background">
      <div className="relative flex w-full max-w-md flex-col gap-5 px-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#c4622d]/12 px-3 py-1 font-space text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c4622d]">
          <Sparkles className="size-3.5" />
          Quick check
        </span>

        <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground">
          {slide.question}
        </h3>

        <div className="flex flex-col gap-2.5">
          {slide.options.map((option, index) => {
            const isThis = selected === index;
            const showCorrect = revealed && index === slide.answer;
            const showWrong = revealed && isThis && index !== slide.answer;

            return (
              <button
                key={option}
                type="button"
                onClick={() => pick(index)}
                disabled={completed}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left font-space text-[14px] transition-all duration-200",
                  "border-border/70 bg-card text-foreground/85",
                  !completed && "hover:border-[#c4622d]/50 active:scale-[0.99]",
                  showCorrect &&
                    "border-emerald-500/70 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                  showWrong &&
                    "border-red-500/70 bg-red-500/10 text-red-600 dark:text-red-400",
                )}
              >
                <span>{option}</span>
                {showCorrect ? (
                  <Check className="size-4 shrink-0 text-emerald-500" />
                ) : showWrong ? (
                  <X className="size-4 shrink-0 text-red-500" />
                ) : null}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {revealed ? (
            <motion.div
              key={isCorrect ? "correct" : "retry"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={cn(
                "rounded-2xl border p-4 font-space text-[13px] leading-relaxed",
                isCorrect
                  ? "border-emerald-500/40 bg-emerald-500/8 text-foreground/80"
                  : "border-amber-500/40 bg-amber-500/8 text-foreground/80",
              )}
            >
              {isCorrect ? (
                <span className="mb-1 flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  Nailed it
                </span>
              ) : (
                <span className="mb-1 flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                  Not quite - try another option
                </span>
              )}
              {isCorrect ? slide.explanation : slide.hint ?? "Read the options again, carefully."}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!revealed && slide.hint ? (
          <p className="font-space text-[12px] text-muted-foreground">
            Hint: {slide.hint}
          </p>
        ) : null}
      </div>
    </SlideShell>
  );
}

export function ProjectSlideView({
  slide,
  completed,
  onComplete,
}: {
  slide: ProjectSlide;
  completed: boolean;
  onComplete: () => void;
}) {
  return (
    <SlideShell className="bg-background">
      <div className="relative flex w-full max-w-md flex-col gap-5 px-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#c4622d]/12 px-3 py-1 font-space text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c4622d]">
          <Wrench className="size-3.5" />
          Build it
        </span>

        <div>
          <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground">
            {slide.title}
          </h3>
          <p className="mt-2 font-space text-[14px] leading-relaxed text-muted-foreground">
            {slide.brief}
          </p>
        </div>

        <ol className="flex flex-col gap-2.5">
          {slide.steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted font-space text-[12px] font-bold text-foreground/70">
                {index + 1}
              </span>
              <span className="font-space text-[14px] text-foreground/80">
                {step}
              </span>
            </li>
          ))}
        </ol>

        {completed ? (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/8 px-4 py-3 font-space text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">
            <BadgeCheck className="size-4" />
            Logged - proud of you. Swipe up.
          </div>
        ) : (
          <Button3D onClick={onComplete} className="mt-1 w-full">
            <Bot className="size-4" />
            I built this
          </Button3D>
        )}
      </div>
    </SlideShell>
  );
}

export function OutroSlideView({ onRestart }: { onRestart: () => void }) {
  return (
    <SlideShell className="bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[110px]"
      />
      <div className="relative flex max-w-sm flex-col items-center gap-5 px-6 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-[#c4622d]/12 text-[#c4622d]">
          <Trophy className="size-8" />
        </span>
        <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground">
          Series complete.
        </h2>
        <p className="font-space text-[15px] leading-relaxed text-muted-foreground">
          You didn&apos;t just scroll - you watched, answered and built. That is
          how robotics actually clicks.
        </p>
        <Button3D onClick={onRestart} variant="ghost" className="mt-2">
          Watch again from the top
        </Button3D>
      </div>
    </SlideShell>
  );
}
