import z from "zod"
import { createCuisineSchema,createCountrySchemaAction, createCountrySchemaForm, selectCountriesSchema } from "./zod"
export type CreateCuisineProps = z.infer<typeof createCuisineSchema>;
export type CreateCountryFormProps = z.infer<typeof createCountrySchemaForm>;
export type CreateCountryActionProps = z.infer<typeof createCountrySchemaAction>;
export type SelectCountriesType = z.infer<typeof selectCountriesSchema>;

