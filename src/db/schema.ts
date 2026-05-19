import {
  boolean,
  integer,
  index,
  pgTable,
  uniqueIndex,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 120 }).notNull().default(""),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash"),
    role: varchar("role", { length: 24 }).notNull().default("student"),
    authProvider: varchar("auth_provider", { length: 32 }).notNull().default("password"),
    providerAccountId: varchar("provider_account_id", { length: 120 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("users_email_idx").on(table.email),
    index("users_role_idx").on(table.role),
    index("users_provider_account_idx").on(table.authProvider, table.providerAccountId),
  ],
);

export const learningPaths = pgTable(
  "learning_paths",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    description: text("description").notNull().default(""),
    thumbnailUrl: text("thumbnail_url").notNull().default(""),
    isLaunched: boolean("is_launched").notNull().default(false),
    isVisible: boolean("is_visible").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("learning_paths_slug_idx").on(table.slug),
    index("learning_paths_visible_idx").on(table.isVisible),
    index("learning_paths_launched_idx").on(table.isLaunched),
    index("learning_paths_created_at_idx").on(table.createdAt),
  ],
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pathId: uuid("path_id")
      .notNull()
      .references(() => learningPaths.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 180 }).notNull(),
    durationMinutes: integer("duration_minutes").notNull().default(0),
    description: text("description").notNull().default(""),
    isHold: boolean("is_hold").notNull().default(false),
    thumbnailUrl: text("thumbnail_url").notNull().default(""),
    videoUrl: text("video_url").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("lessons_path_id_idx").on(table.pathId),
    index("lessons_is_hold_idx").on(table.isHold),
    index("lessons_created_at_idx").on(table.createdAt),
    index("lessons_path_created_at_idx").on(table.pathId, table.createdAt),
  ],
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pathId: uuid("path_id")
      .notNull()
      .references(() => learningPaths.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 220 }).notNull(),
    slug: varchar("slug", { length: 240 }).notNull().unique(),
    excerpt: text("excerpt").notNull().default(""),
    content: text("content").notNull().default(""),
    thumbnailUrl: text("thumbnail_url").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("blog_posts_path_id_idx").on(table.pathId),
    index("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_created_at_idx").on(table.createdAt),
    index("blog_posts_path_created_at_idx").on(table.pathId, table.createdAt),
  ],
);

export const userPathSelections = pgTable(
  "user_path_selections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    pathId: uuid("path_id")
      .notNull()
      .references(() => learningPaths.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("user_path_selections_user_id_unique").on(table.userId),
    index("user_path_selections_path_id_idx").on(table.pathId),
    index("user_path_selections_created_at_idx").on(table.createdAt),
  ],
);
