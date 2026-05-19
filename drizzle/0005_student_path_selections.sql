CREATE TABLE "user_path_selections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"path_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_path_selections" ADD CONSTRAINT "user_path_selections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_path_selections" ADD CONSTRAINT "user_path_selections_path_id_learning_paths_id_fk" FOREIGN KEY ("path_id") REFERENCES "public"."learning_paths"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_path_selections_user_id_unique" ON "user_path_selections" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_path_selections_path_id_idx" ON "user_path_selections" USING btree ("path_id");--> statement-breakpoint
CREATE INDEX "user_path_selections_created_at_idx" ON "user_path_selections" USING btree ("created_at");