ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "auth_provider" varchar(32) DEFAULT 'password' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "provider_account_id" varchar(120);--> statement-breakpoint
CREATE INDEX "users_provider_account_idx" ON "users" USING btree ("auth_provider","provider_account_id");