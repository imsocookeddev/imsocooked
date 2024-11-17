import {createInsertSchema, createSelectSchema} from "drizzle-zod"
import {users} from "./schema"
export const selectUserSchema = createSelectSchema(users);