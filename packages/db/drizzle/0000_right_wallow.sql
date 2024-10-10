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

CREATE TABLE IF NOT EXISTS "cuisine_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"cuisineID" varchar(255) NOT NULL,
	"userID" varchar(255) NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"isCompleted" boolean DEFAULT false NOT NULL,
	"lastSeen" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cuisines" (
	"cuisineID" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cuisineName" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cuisines_to_regions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cuisineID" varchar(255) NOT NULL,
	"regionID" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lessons" (
	"lessonID" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"regionID" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lessons_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"lessonID" varchar(255) NOT NULL,
	"userID" varchar(255) NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"isCompleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lessons_to_problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lessonID" varchar(255) NOT NULL,
	"problemID" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problems" (
	"problemID" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prompt" varchar(255) NOT NULL,
	"problemType" "problem_types" NOT NULL,
	"correctAnswer" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problems_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"problemID" varchar(255) NOT NULL,
	"userID" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "region_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"regionID" varchar(255) NOT NULL,
	"userID" varchar(255) NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"isCompleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"regionID" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"regionName" varchar(255) NOT NULL,
	"cuisineID" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkID" varchar(255) NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"roles" "roles" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"profilePhoto" varchar(255) DEFAULT 'https://www.gravatar.com/avatar/' NOT NULL
);
