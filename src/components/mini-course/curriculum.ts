import type { Slide } from "./types";

export type CourseQuizContent = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  hint: string;
  explanation: string;
};

export type CourseLessonContent = {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  thumbnail: string;
  notes: string;
  quizzes: CourseQuizContent[];
  project: { title: string; brief: string; steps: string[] } | null;
};

export type CourseData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  lessons: CourseLessonContent[];
};

/**
 * Turns a series into the ordered vertical slide deck: intro, then each lesson
 * as video → its quizzes → its project, followed by the outro.
 */
export function buildSeriesSlides(course: CourseData): Slide[] {
  const slides: Slide[] = [
    {
      kind: "intro",
      id: "intro",
      chapter: 0,
      title: course.title,
      subtitle: course.subtitle || "Watch a clip, answer a quick check, build something real. Swipe up to begin.",
    },
  ];

  course.lessons.forEach((lesson, index) => {
    const chapter = index + 1;

    slides.push({
      kind: "video",
      id: `video-${lesson.id}`,
      chapter,
      title: lesson.title,
      iframeUrl: lesson.iframeUrl,
      thumbnail: lesson.thumbnail,
      notes: lesson.notes || undefined,
    });

    for (const quiz of lesson.quizzes) {
      slides.push({
        kind: "quiz",
        id: `quiz-${quiz.id}`,
        chapter,
        question: quiz.question,
        options: quiz.options,
        answer: quiz.answerIndex,
        hint: quiz.hint || undefined,
        explanation: quiz.explanation,
      });
    }

    if (lesson.project) {
      slides.push({
        kind: "project",
        id: `project-${lesson.id}`,
        chapter,
        title: lesson.project.title,
        brief: lesson.project.brief,
        steps: lesson.project.steps,
      });
    }
  });

  slides.push({ kind: "outro", id: "outro", chapter: course.lessons.length + 1 });
  return slides;
}
