import type { InferSelectModel } from "drizzle-orm";

import type { blogPosts, learningPaths, lessons, users } from "@/db/schema";

export type UserRole = "admin" | "student";

export type AppSession = {
  userId: string;
  email: string;
  role: UserRole;
  expiresAt: string;
};

export type LearningPath = InferSelectModel<typeof learningPaths>;
export type Lesson = InferSelectModel<typeof lessons>;
export type BlogPost = InferSelectModel<typeof blogPosts>;
export type User = InferSelectModel<typeof users>;

export type ActionState = {
  ok: boolean;
  message: string;
};
