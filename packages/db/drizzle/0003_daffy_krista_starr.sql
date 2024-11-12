CREATE TABLE IF NOT EXISTS "cuisines_to_countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"cuisineID" varchar(255) NOT NULL,
	"countryID" varchar(255) NOT NULL
);
