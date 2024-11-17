import { neon } from "@neondatabase/serverless";
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema from './schema'
export * from "drizzle-orm";
export * from "./functions";
export * from "./zod";
export * from "./types";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql,{schema});