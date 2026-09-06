import {
  boolean,
  integer,
  index,
  jsonb,
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
    profileRole: varchar("profile_role", { length: 120 }).notNull().default(""),
    profileImageUrl: text("profile_image_url"),
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

export const blogCategories = pgTable(
  "blog_categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 140 }).notNull().unique(),
    description: text("description").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("blog_categories_slug_idx").on(table.slug),
    index("blog_categories_created_at_idx").on(table.createdAt),
  ],
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pathId: uuid("path_id")
      .notNull()
      .references(() => learningPaths.id, { onDelete: "cascade" }),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
    categoryId: uuid("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
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
    index("blog_posts_author_id_idx").on(table.authorId),
    index("blog_posts_category_id_idx").on(table.categoryId),
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

// ── Mini-series (paid, video-first mini courses) ──

export const miniSeries = pgTable(
  "mini_series",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),
    subtitle: varchar("subtitle", { length: 240 }).notNull().default(""),
    description: text("description").notNull().default(""),
    curriculum: text("curriculum").notNull().default(""),
    priceCents: integer("price_cents").notNull().default(0),
    currency: varchar("currency", { length: 3 }).notNull().default("usd"),
    lessonCountOverride: integer("lesson_count_override").notNull().default(0),
    status: varchar("status", { length: 16 }).notNull().default("draft"),
    dodoProductId: varchar("dodo_product_id", { length: 120 }).notNull().default(""),
    thumbnailUrl: text("thumbnail_url").notNull().default(""),
    bunnyLibraryId: varchar("bunny_library_id", { length: 32 }).notNull().default(""),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("mini_series_slug_idx").on(table.slug),
    index("mini_series_status_idx").on(table.status),
    index("mini_series_created_at_idx").on(table.createdAt),
  ],
);

export const miniSeriesLessons = pgTable(
  "mini_series_lessons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    seriesId: uuid("series_id")
      .notNull()
      .references(() => miniSeries.id, { onDelete: "cascade" }),
    position: integer("position").notNull().default(0),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description").notNull().default(""),
    bunnyVideoId: varchar("bunny_video_id", { length: 64 }).notNull().default(""),
    bunnyLibraryId: varchar("bunny_library_id", { length: 32 }).notNull().default(""),
    durationSeconds: integer("duration_seconds").notNull().default(0),
    // pending | uploading | processing | ready | error
    videoStatus: varchar("video_status", { length: 16 }).notNull().default("pending"),
    hasNotes: boolean("has_notes").notNull().default(false),
    hasQuiz: boolean("has_quiz").notNull().default(false),
    hasProject: boolean("has_project").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("mini_series_lessons_series_id_idx").on(table.seriesId),
    index("mini_series_lessons_series_position_idx").on(table.seriesId, table.position),
  ],
);

export const lessonNotes = pgTable(
  "lesson_notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => miniSeriesLessons.id, { onDelete: "cascade" }),
    contentMarkdown: text("content_markdown").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("lesson_notes_lesson_id_unique").on(table.lessonId)],
);

export const lessonQuizzes = pgTable(
  "lesson_quizzes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => miniSeriesLessons.id, { onDelete: "cascade" }),
    position: integer("position").notNull().default(0),
    question: text("question").notNull().default(""),
    options: jsonb("options").$type<string[]>().notNull().default([]),
    answerIndex: integer("answer_index").notNull().default(0),
    hint: text("hint").notNull().default(""),
    explanation: text("explanation").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("lesson_quizzes_lesson_id_idx").on(table.lessonId),
    index("lesson_quizzes_lesson_position_idx").on(table.lessonId, table.position),
  ],
);

export const lessonProjects = pgTable(
  "lesson_projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => miniSeriesLessons.id, { onDelete: "cascade" }),
    position: integer("position").notNull().default(0),
    title: varchar("title", { length: 200 }).notNull().default(""),
    brief: text("brief").notNull().default(""),
    steps: jsonb("steps").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("lesson_projects_lesson_id_idx").on(table.lessonId),
    index("lesson_projects_lesson_position_idx").on(table.lessonId, table.position),
  ],
);

export const miniSeriesPurchases = pgTable(
  "mini_series_purchases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    seriesId: uuid("series_id")
      .notNull()
      .references(() => miniSeries.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // pending | active | cancelled | expired | past_due | refunded
    status: varchar("status", { length: 16 }).notNull().default("pending"),
    dodoSubscriptionId: varchar("dodo_subscription_id", { length: 120 }).notNull().default(""),
    dodoPaymentId: varchar("dodo_payment_id", { length: 120 }).notNull().default(""),
    amountCents: integer("amount_cents").notNull().default(0),
    currency: varchar("currency", { length: 3 }).notNull().default("usd"),
    // End of the paid period; access stays granted until this passes.
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("mini_series_purchases_series_user_unique").on(table.seriesId, table.userId),
    index("mini_series_purchases_user_id_idx").on(table.userId),
    index("mini_series_purchases_status_idx").on(table.status),
    index("mini_series_purchases_subscription_idx").on(table.dodoSubscriptionId),
  ],
);

export const miniSeriesProgress = pgTable(
  "mini_series_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    seriesId: uuid("series_id")
      .notNull()
      .references(() => miniSeries.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    unlockedPosition: integer("unlocked_position").notNull().default(0),
    completed: jsonb("completed").$type<string[]>().notNull().default([]),
    answers: jsonb("answers").$type<Record<string, number>>().notNull().default({}),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("mini_series_progress_series_user_unique").on(table.seriesId, table.userId),
  ],
);

// Idempotency guard for incoming Dodo webhooks (keyed by webhook-id header).
export const processedWebhooks = pgTable("processed_webhooks", {
  id: varchar("id", { length: 120 }).primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
