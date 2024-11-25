ALTER TABLE "cuisine" ALTER COLUMN "imageUrl" SET DEFAULT 'https://cpsaxb6waydelzll.public.blob.vercel-storage.com/kitty-UVMd9CJBBFxJ1MUifj0lysaqPkUGUT.jpeg';
-- ALTER TABLE "country_progress" ALTER COLUMN "countryID" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
-- ALTER TABLE "cuisine_progress" ALTER COLUMN "cuisineID" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
-- ALTER TABLE "cuisines_to_countries" ALTER COLUMN "cuisineID" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
-- ALTER TABLE "cuisines_to_countries" ALTER COLUMN "countryID" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
-- ALTER TABLE "lesson" ALTER COLUMN "countryID" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
-- ALTER TABLE "lesson" ALTER COLUMN "cuisineID" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
-- ALTER TABLE "country_progress" DROP COLUMN IF EXISTS "cuisineID";