import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import { cuisine, country, problemCategory} from "./schema";
import z from "zod";

export const updateImageSchema = z.object({
  id:z.string().min(1).max(100),
  imageUrl:z.string().min(1).max(500)
});

export const createCuisineSchema = createInsertSchema(cuisine,{
  cuisineName:z.string().min(1).max(100),
  cuisineDescription:z.string().min(1).max(500),
}).omit({
  cuisineID:true,
});

export const createCountrySchemaForm = createInsertSchema(country,{
  countryName:z.string().min(1).max(100),
}).omit({
  countryID:true,
});

export const createCountrySchemaAction = createCountrySchemaForm.extend({
  cuisinesToCountry: z.array(z.string())
})

export const selectCountriesSchema = createSelectSchema(country).array();

export const selectProblemCategorySchema = createSelectSchema(problemCategory);