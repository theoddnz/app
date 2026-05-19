import "server-only";

import { asc, desc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { blogPosts, learningPaths, lessons, userPathSelections, users } from "@/db/schema";
import { requireStudentSession } from "@/lib/admin-auth";
import { getLearningPath } from "@/lib/learning";

export async function getStudentDashboard() {
  const session = await requireStudentSession();

  const [user, selection] = await Promise.all([
    getDb().query.users.findFirst({
      where: eq(users.id, session.userId),
      columns: {
        id: true,
        name: true,
        email: true,
      },
    }),
    getDb().query.userPathSelections.findFirst({
      where: eq(userPathSelections.userId, session.userId),
    }),
  ]);

  if (!selection) {
    return {
      user,
      selectedPath: null,
      lessons: [],
      blogs: [],
    };
  }

  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.id, selection.pathId),
  });

  if (!path || !path.isVisible) {
    return {
      user,
      selectedPath: null,
      lessons: [],
      blogs: [],
    };
  }

  const [selectedPath, pathLessons, pathBlogs] = await Promise.all([
    getLearningPath(path.slug),
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

  return {
    user,
    selectedPath,
    lessons: pathLessons,
    blogs: pathBlogs,
  };
}

export async function studentHasSelectedPath(pathId: string) {
  const session = await requireStudentSession();
  const selection = await getDb().query.userPathSelections.findFirst({
    where: eq(userPathSelections.userId, session.userId),
  });

  return selection?.pathId === pathId;
}
