import type { YouTubeShort } from "@/lib/youtube-shorts";

export type QuizSlide = {
  kind: "quiz";
  id: string;
  chapter: number;
  question: string;
  hint?: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  explanation: string;
};

export type ProjectSlide = {
  kind: "project";
  id: string;
  chapter: number;
  title: string;
  brief: string;
  steps: string[];
};

export type VideoSlide = {
  kind: "video";
  id: string;
  chapter: number;
  short: YouTubeShort;
};

export type IntroSlide = {
  kind: "intro";
  id: string;
  chapter: number;
  title: string;
  subtitle: string;
};

export type OutroSlide = {
  kind: "outro";
  id: string;
  chapter: number;
};

export type Slide =
  | IntroSlide
  | VideoSlide
  | QuizSlide
  | ProjectSlide
  | OutroSlide;

/** A checkpoint is any slide the learner must complete before moving on. */
export function isCheckpoint(slide: Slide): slide is QuizSlide | ProjectSlide {
  return slide.kind === "quiz" || slide.kind === "project";
}

export type CourseProgress = {
  /** Highest slide index the learner has unlocked. */
  unlockedIndex: number;
  /** Ids of completed checkpoint slides. */
  completed: string[];
  /** Recorded quiz answers keyed by slide id. */
  answers: Record<string, number>;
};
