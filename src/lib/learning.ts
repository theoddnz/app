import "server-only";

import { asc, desc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { blogPosts, learningPaths, lessons } from "@/db/schema";

export type CurriculumModule = {
  moduleName: string;
  topic: string;
  keyConcepts: string[];
};

export type LearningVideo = {
  title: string;
  length: string;
  status: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  isFallback?: boolean;
};

export type LearningArticle = {
  title: string;
  slug: string;
  excerpt: string;
  type: string;
  readTime: string;
};

export type LearningPath = {
  id: string;
  slug: string;
  name: string;
  label: string;
  description: string;
  outcome: string;
  pace: string;
  signal: string;
  thumbnailUrl: string;
  curriculum: CurriculumModule[];
  articles: LearningArticle[];
  videos: {
    available: boolean;
    note: string;
    items: LearningVideo[];
  };
  isLaunched: boolean;
  updatedAt: Date;
};

export const cookingFallbackVideo: LearningVideo = {
  title: "Chaotic Cooking Intermission",
  length: "8 min",
  status: "Fallback",
  videoUrl: "https://www.youtube.com/embed/QO_V3h14Fyc",
  thumbnailUrl: "",
  description:
    "No course videos are live yet, so the kitchen takes over for a minute.",
  isFallback: true,
};

function formatDuration(minutes: number) {
  if (minutes <= 0) return "Short watch";
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0
    ? `${hours} hr ${remainingMinutes} min`
    : `${hours} hr`;
}

function estimateReadTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  return `${minutes} min`;
}

function buildPathView(
  path: typeof learningPaths.$inferSelect,
  pathLessons: (typeof lessons.$inferSelect)[],
  pathBlogs: (typeof blogPosts.$inferSelect)[],
): LearningPath {
  const curriculum = pathLessons.map((lesson) => ({
    moduleName: lesson.name,
    topic: lesson.isHold ? "On hold" : "Lesson",
    keyConcepts: [
      lesson.description || "Details coming soon.",
      lesson.durationMinutes > 0 ? `${formatDuration(lesson.durationMinutes)} planned runtime` : "Runtime coming soon",
    ],
  }));

  const realVideos = pathLessons
    .filter((lesson) => lesson.videoUrl.trim().length > 0)
    .map((lesson) => ({
      title: lesson.name,
      length: formatDuration(lesson.durationMinutes),
      status: lesson.isHold ? "On hold" : "Available",
      videoUrl: lesson.videoUrl,
      thumbnailUrl: lesson.thumbnailUrl,
      description: lesson.description,
    }));

  const videos = realVideos.length > 0 ? realVideos : [cookingFallbackVideo];

  return {
    id: path.id,
    slug: path.slug,
    name: path.name,
    label: path.isLaunched ? "Live" : "Coming soon",
    description: path.description || "Details coming soon.",
    outcome: path.description || "Details coming soon.",
    pace: pathLessons.length === 1 ? "1 lesson" : `${pathLessons.length} lessons`,
    signal: path.isLaunched ? "Open for learning" : "Preparing",
    thumbnailUrl: path.thumbnailUrl,
    curriculum,
    articles: pathBlogs.map((blog) => ({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      type: "Field note",
      readTime: estimateReadTime(blog.content || blog.excerpt),
    })),
    videos: {
      available: realVideos.length > 0,
      note:
        realVideos.length > 0
          ? "Videos from this path's lessons."
          : "No lesson videos are attached yet, so a chaotic cooking fallback is standing in.",
      items: videos,
    },
    isLaunched: path.isLaunched,
    updatedAt: path.updatedAt,
  };
}

export async function getLearningPaths() {
  const rows = await getDb()
    .select()
    .from(learningPaths)
    .where(eq(learningPaths.isVisible, true))
    .orderBy(desc(learningPaths.createdAt));

  return rows.map((path) =>
    buildPathView(path, [], []),
  );
}

export async function getLearningPath(slug: string) {
  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.slug, slug),
  });

  if (!path || !path.isVisible) return null;

  const [pathLessons, pathBlogs] = await Promise.all([
    getDb()
      .select()
      .from(lessons)
      .where(eq(lessons.pathId, path.id))
      .orderBy(asc(lessons.createdAt)),
    getDb()
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.pathId, path.id))
      .orderBy(desc(blogPosts.createdAt)),
  ]);

  return buildPathView(path, pathLessons, pathBlogs);
}
