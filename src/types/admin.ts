import type { InferSelectModel } from "drizzle-orm";

import type { blogCategories, blogPosts, learningPaths, lessons, userPathSelections, users } from "@/db/schema";

export type UserRole = "admin" | "student" | "author";

export type AppSession = {
  userId: string;
  email: string;
  role: UserRole;
  expiresAt: string;
};

export type LearningPath = InferSelectModel<typeof learningPaths>;
export type Lesson = InferSelectModel<typeof lessons>;
export type BlogCategory = InferSelectModel<typeof blogCategories>;
export type BlogPost = InferSelectModel<typeof blogPosts>;
export type UserPathSelection = InferSelectModel<typeof userPathSelections>;
export type User = InferSelectModel<typeof users>;

export type ActionState = {
  ok: boolean;
  message: string;
};
