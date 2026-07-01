ALTER TABLE "blog_posts" ADD COLUMN "author_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_role" varchar(120) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blog_posts_author_id_idx" ON "blog_posts" USING btree ("author_id");