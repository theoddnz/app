CREATE TABLE "learning_paths" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"thumbnail_url" text DEFAULT '' NOT NULL,
	"is_launched" boolean DEFAULT false NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "learning_paths_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "learning_paths_slug_idx" ON "learning_paths" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "learning_paths_visible_idx" ON "learning_paths" USING btree ("is_visible");--> statement-breakpoint
CREATE INDEX "learning_paths_launched_idx" ON "learning_paths" USING btree ("is_launched");--> statement-breakpoint
CREATE INDEX "learning_paths_created_at_idx" ON "learning_paths" USING btree ("created_at");