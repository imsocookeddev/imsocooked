CREATE TABLE IF NOT EXISTS "problem_category" (
	"categoryID" serial PRIMARY KEY NOT NULL,
	"categoryName" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problem_completion" (
	"id" serial PRIMARY KEY NOT NULL,
	"problemID" varchar(255) NOT NULL,
	"userID" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problems_to_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"problemID" varchar(255) NOT NULL,
	"categoryID" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS "lessons_progress";--> statement-breakpoint
DROP TABLE if EXISTS "lessons_to_problems";--> statement-breakpoint
ALTER TABLE IF EXISTS "regions" RENAME TO "country";--> statement-breakpoint
ALTER TABLE IF EXISTS "region_progress" RENAME TO "country_progress";--> statement-breakpoint
ALTER TABLE IF EXISTS "cuisines" RENAME TO "cuisine";--> statement-breakpoint
ALTER TABLE IF EXISTS "cuisines_to_regions" RENAME TO "cuisines_to_countries";--> statement-breakpoint
ALTER TABLE IF EXISTS "lessons" RENAME TO "lesson";--> statement-breakpoint
ALTER TABLE IF EXISTS "problems" RENAME TO "problem";--> statement-breakpoint
ALTER TABLE IF EXISTS "users" RENAME TO "user";--> statement-breakpoint
-- ALTER TABLE IF EXISTS "cuisines_to_countries" RENAME COLUMN IF EXISTS "regionID" TO "countryID";--> statement-breakpoint
-- ALTER TABLE IF EXISTS "lesson" RENAME COLUMN IF EXISTS "regionID" TO "countryID";--> statement-breakpoint
-- ALTER TABLE IF EXISTS "country_progress" RENAME COLUMN IF EXISTS "regionID" TO "countryID";--> statement-breakpoint
-- ALTER TABLE IF EXISTS "country" RENAME COLUMN IF EXISTS "regionID" TO "countryID";--> statement-breakpoint
-- ALTER TABLE IF EXISTS "country" RENAME COLUMN "regionName" TO "countryName";--> statement-breakpoint
-- ALTER TABLE IF EXISTS "user" RENAME COLUMN "profilePhoto" TO "profileUrl";--> statement-breakpoint
-- ALTER TABLE IF EXISTS"user" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
-- ALTER TABLE IF EXISTS "user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint

-- Sertial type is not supported in alter, we need to manually fix this
-- ALTER TABLE "cuisines_to_countries" ALTER COLUMN "id" SET DATA TYPE integer USING id::integer; --> statement-breakpoint
-- CREATE SEQUENCE cuisines_to_countries_id_seq;--> statement-breakpoint
-- ALTER TABLE cuisines_to_countries ALTER COLUMN id
-- SET DEFAULT nextval('cuisines_to_countries_id_seq');--> statement-breakpoint
-- SELECT setval('cuisines_to_countries_id_seq', COALESCE(max(id), 1)) FROM cuisines_to_countries;--> statement-breakpoint
-- ALTER TABLE cuisines_to_countries ALTER COLUMN id SET NOT NULL;--> statement-breakpoint
-- ALTER TABLE cuisines_to_countries ADD PRIMARY KEY (id);--> statement-breakpoint
-- ALTER TABLE "cuisines_to_countries" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
-- ALTER TABLE lesson DROP CONSTRAINT lesson_pkey;

-- ALTER TABLE "lesson" ALTER COLUMN "lessonID" SET DATA TYPE uuid USING "lessonID"::uuid;--> statement-breakpoint
-- ALTER TABLE "lesson" ALTER COLUMN "lessonID" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "profileUrl" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "cuisine" ADD COLUMN "imageUrl" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cuisine" ADD COLUMN "cuisineDescription" text NOT NULL;--> statement-breakpoint
-- ALTER TABLE "lesson" ADD COLUMN "problemOrder" uuid[] NOT NULL;--> statement-breakpoint
-- ALTER TABLE "lesson" ADD COLUMN "recipeUrl" text NOT NULL;--> statement-breakpoint
ALTER TABLE "problem" ADD COLUMN "categoryID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "country" ADD COLUMN "imageUrl" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cuisine_progress" DROP COLUMN IF EXISTS "isCompleted";--> statement-breakpoint
ALTER TABLE "cuisine_progress" DROP COLUMN IF EXISTS "lastSeen";--> statement-breakpoint
ALTER TABLE "country_progress" DROP COLUMN IF EXISTS "isCompleted";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");