import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { max } from "drizzle-orm";

const runMigrations = async () => {
	dotenv.config({
		path: "../../.env",
	});

	console.log("⏳ Running migrations...");
	const start = Date.now();

	// TODO: Change this to use t3-env instead of dotenv for type checking
	const sql = neon(
		(process.env.DATABASE_URL!),
    // idk if this is right 
    {fetchOptions:{max:1}}
	);

	const db = drizzle(sql);

	await migrate(db, { migrationsFolder: "drizzle" });

	console.log(`✅ Migrations completed in ${Date.now() - start}ms`);

	process.exit(0);
};

runMigrations().catch((err) => {
	console.error("❌ Migration failed");
	console.error(err);
	process.exit(1);
});
