import { neon } from "@neondatabase/serverless";
import {drizzle} from 'drizzle-orm/neon-http'
import { config } from "dotenv";
import * as schema from './schema'



config({path: "../../.env"});

export * from "drizzle-orm";
export * from "./functions";

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql,{schema})