import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import { cuisine} from "./schema";
import z from "zod";

export const createCuisineSchema = createInsertSchema(cuisine,{
  cuisineName:z.string().min(1).max(100),
  cuisineDescription:z.string().min(1).max(500),
}).omit({
  cuisineID:true,
});