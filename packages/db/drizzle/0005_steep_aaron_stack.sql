CREATE TABLE IF NOT EXISTS "lesson" (
	"lessonID" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"countryID" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"cuisineID" varchar(255) NOT NULL,
	"problemOrder" uuid[] NOT NULL,
	"recipeUrl" text NOT NULL
);
