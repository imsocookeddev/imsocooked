import z from "zod"
import { createCuisineSchema } from "./zod"
export type CreateCuisineProps = z.infer<typeof createCuisineSchema>;