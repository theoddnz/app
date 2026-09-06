ALTER TABLE "mini_series_purchases" ADD COLUMN "dodo_subscription_id" varchar(120) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "mini_series_purchases" ADD COLUMN "current_period_end" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "mini_series_purchases_subscription_idx" ON "mini_series_purchases" USING btree ("dodo_subscription_id");