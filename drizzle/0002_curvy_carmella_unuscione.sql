CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"path_id" uuid NOT NULL,
	"name" varchar(180) NOT NULL,
	"duration_minutes" integer DEFAULT 0 NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"is_hold" boolean DEFAULT false NOT NULL,
	"thumbnail_url" text DEFAULT '' NOT NULL,
	"video_url" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_path_id_learning_paths_id_fk" FOREIGN KEY ("path_id") REFERENCES "public"."learning_paths"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lessons_path_id_idx" ON "lessons" USING btree ("path_id");--> statement-breakpoint
CREATE INDEX "lessons_is_hold_idx" ON "lessons" USING btree ("is_hold");--> statement-breakpoint
CREATE INDEX "lessons_created_at_idx" ON "lessons" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "lessons_path_created_at_idx" ON "lessons" USING btree ("path_id","created_at");