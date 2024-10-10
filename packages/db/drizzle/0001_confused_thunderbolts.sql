DO $$ BEGIN
 CREATE TYPE "public"."problem_types" AS ENUM('mulitple_choice', 'drag-n-drop', 'matching', 'single_word_response');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "roles" TO "role";