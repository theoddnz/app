CREATE TABLE "lesson_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"content_markdown" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"title" varchar(200) DEFAULT '' NOT NULL,
	"brief" text DEFAULT '' NOT NULL,
	"steps" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"question" text DEFAULT '' NOT NULL,
	"options" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"answer_index" integer DEFAULT 0 NOT NULL,
	"hint" text DEFAULT '' NOT NULL,
	"explanation" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mini_series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(200) NOT NULL,
	"subtitle" varchar(240) DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"curriculum" text DEFAULT '' NOT NULL,
	"price_cents" integer DEFAULT 0 NOT NULL,
	"currency" varchar(3) DEFAULT 'usd' NOT NULL,
	"lesson_count_override" integer DEFAULT 0 NOT NULL,
	"status" varchar(16) DEFAULT 'draft' NOT NULL,
	"dodo_product_id" varchar(120) DEFAULT '' NOT NULL,
	"thumbnail_url" text DEFAULT '' NOT NULL,
	"bunny_library_id" varchar(32) DEFAULT '' NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mini_series_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "mini_series_lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"series_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"bunny_video_id" varchar(64) DEFAULT '' NOT NULL,
	"bunny_library_id" varchar(32) DEFAULT '' NOT NULL,
	"duration_seconds" integer DEFAULT 0 NOT NULL,
	"video_status" varchar(16) DEFAULT 'pending' NOT NULL,
	"has_notes" boolean DEFAULT false NOT NULL,
	"has_quiz" boolean DEFAULT false NOT NULL,
	"has_project" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mini_series_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"series_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"unlocked_position" integer DEFAULT 0 NOT NULL,
	"completed" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mini_series_purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"series_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"status" varchar(16) DEFAULT 'pending' NOT NULL,
	"dodo_payment_id" varchar(120) DEFAULT '' NOT NULL,
	"amount_cents" integer DEFAULT 0 NOT NULL,
	"currency" varchar(3) DEFAULT 'usd' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processed_webhooks" (
	"id" varchar(120) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lesson_notes" ADD CONSTRAINT "lesson_notes_lesson_id_mini_series_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."mini_series_lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_projects" ADD CONSTRAINT "lesson_projects_lesson_id_mini_series_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."mini_series_lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_quizzes" ADD CONSTRAINT "lesson_quizzes_lesson_id_mini_series_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."mini_series_lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_series" ADD CONSTRAINT "mini_series_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_series_lessons" ADD CONSTRAINT "mini_series_lessons_series_id_mini_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."mini_series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_series_progress" ADD CONSTRAINT "mini_series_progress_series_id_mini_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."mini_series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_series_progress" ADD CONSTRAINT "mini_series_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_series_purchases" ADD CONSTRAINT "mini_series_purchases_series_id_mini_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."mini_series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_series_purchases" ADD CONSTRAINT "mini_series_purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_notes_lesson_id_unique" ON "lesson_notes" USING btree ("lesson_id");--> statement-breakpoint
CREATE INDEX "lesson_projects_lesson_id_idx" ON "lesson_projects" USING btree ("lesson_id");--> statement-breakpoint
CREATE INDEX "lesson_projects_lesson_position_idx" ON "lesson_projects" USING btree ("lesson_id","position");--> statement-breakpoint
CREATE INDEX "lesson_quizzes_lesson_id_idx" ON "lesson_quizzes" USING btree ("lesson_id");--> statement-breakpoint
CREATE INDEX "lesson_quizzes_lesson_position_idx" ON "lesson_quizzes" USING btree ("lesson_id","position");--> statement-breakpoint
CREATE INDEX "mini_series_slug_idx" ON "mini_series" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "mini_series_status_idx" ON "mini_series" USING btree ("status");--> statement-breakpoint
CREATE INDEX "mini_series_created_at_idx" ON "mini_series" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "mini_series_lessons_series_id_idx" ON "mini_series_lessons" USING btree ("series_id");--> statement-breakpoint
CREATE INDEX "mini_series_lessons_series_position_idx" ON "mini_series_lessons" USING btree ("series_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "mini_series_progress_series_user_unique" ON "mini_series_progress" USING btree ("series_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "mini_series_purchases_series_user_unique" ON "mini_series_purchases" USING btree ("series_id","user_id");--> statement-breakpoint
CREATE INDEX "mini_series_purchases_user_id_idx" ON "mini_series_purchases" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "mini_series_purchases_status_idx" ON "mini_series_purchases" USING btree ("status");