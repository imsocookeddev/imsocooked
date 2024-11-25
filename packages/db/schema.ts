import {
  varchar,
  serial,
  pgTable,
  pgEnum,
  timestamp,
  uuid,
  real,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import c from "../config";

export const userRoles = pgEnum("roles", c.roles);
const problemTypesConfig = Object.keys(c.problemTypes) as
  | readonly [string, ...string[]]
  | [string, ...string[]];
export const problemTypes = pgEnum("problem_types",problemTypesConfig);

// Users table
export const user = pgTable("user", {
  userID: varchar({ length: 255 }).primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }).notNull().unique(),
  role: userRoles().notNull().default("user"),
  joinedOn: timestamp().defaultNow(),
  profileUrl: text().notNull().default("https://www.gravatar.com/avatar/"),
  hearts: integer().notNull().default(5),
});

// Fields and references are used to describe relations when the relation depends on a non-primary key value
// user relations
export const userRelations = relations(user, ({ many }) => ({
  countriesProgress: many(countryProgress),
  cuisinesProgress: many(cuisineProgress),
  problemCompletion: many(problemCompletion),
}));

// cuisines table
export const cuisine = pgTable("cuisine", {
  cuisineID: uuid().defaultRandom().primaryKey(),
  cuisineName: varchar({ length: 255 }).notNull(),
  imageUrl: text()
    .notNull()
    .default(
      c.defaultImageURL
    ),
  cuisineDescription: text().notNull(),
});

// cuisine relations
export const cuisineRelations = relations(cuisine, ({ many }) => ({
  countriesToCuisines: many(cuisinesToCountries),
  cuisinesProgress: many(cuisineProgress),
  lessons: many(lesson),
}));

// cuisineProgress table
export const cuisineProgress = pgTable("cuisine_progress", {
  id: serial().primaryKey(),
  cuisineID: uuid().notNull(),
  userID: varchar({ length: 255 }).notNull(),
  progress: real().notNull().default(0),
});

// cuisineProgress relations
export const cuisineProgressRelations = relations(
  cuisineProgress,
  ({ one }) => ({
    cuisines: one(cuisine, {
      fields: [cuisineProgress.cuisineID],
      references: [cuisine.cuisineID],
    }),
    users: one(user, {
      fields: [cuisineProgress.userID],
      references: [user.userID],
    }),
  }),
);

// Countries
export const country = pgTable("country", {
  countryID: uuid().defaultRandom().primaryKey(),
  countryName: varchar({length:255}).notNull(),
  imageUrl: text().notNull().default(c.defaultImageURL),
});

// country relations
export const countryRelations = relations(country, ({ many }) => ({
  cuisinesToCountries: many(cuisinesToCountries),
  lessons: many(lesson),
  countryProgress: many(countryProgress),
}));

// countryProgress table
export const countryProgress = pgTable("country_progress", {
  id: serial().primaryKey(),
  countryID: uuid().notNull(),
  userID: varchar({ length: 255 }).notNull(),
  progress: real().notNull().default(0),
});

// countryProgress relations
export const countryProgressRelations = relations(
  countryProgress,
  ({ one }) => ({
    countries: one(country, {
      fields: [countryProgress.countryID],
      references: [country.countryID],
    }),
    users: one(user, {
      fields: [countryProgress.userID],
      references: [user.userID],
    }),
  }),
);

// cuisinesToCountries table
export const cuisinesToCountries = pgTable("cuisines_to_countries", {
  id: serial().primaryKey(),
  cuisineID: uuid().notNull(),
  countryID: uuid().notNull(),
});

//cuinesToCountries relations
export const cuisinesToCountriesRelations = relations(
  cuisinesToCountries,
  ({ one }) => ({
    country: one(country, {
      fields: [cuisinesToCountries.countryID],
      references: [country.countryID],
    }),
    cuisines: one(cuisine, {
      fields: [cuisinesToCountries.cuisineID],
      references: [cuisine.cuisineID],
    }),
  }),
);

// lessons table
export const lesson = pgTable("lesson", {
  lessonID: uuid().defaultRandom().primaryKey(),
  countryID: uuid().notNull(),
  title: varchar({ length: 255 }).notNull(),
  cuisineID: uuid().notNull(),
  problemOrder: uuid().array().notNull(),
  recipeUrl: text().notNull(),
});

// // lesson relations
export const lessonRelations = relations(lesson, ({ one }) => ({
  countries: one(country, {
    fields: [lesson.countryID],
    references: [country.countryID],
  }),
  cuisines: one(cuisine, {
    fields: [lesson.cuisineID],
    references: [cuisine.cuisineID],
  }),
}));

// Problems table
export const problem = pgTable("problem", {
  problemID: uuid().defaultRandom().primaryKey(),
  prompt: varchar({ length: 255 }).notNull(),
  problemType: problemTypes().notNull(),
  categoryID: integer().notNull(),
  problemContent: text().notNull(), //This data will be stringified JSON
  correctAnswer: text().notNull(), //This data will be stringified JSON
});

// problem relations
export const problemsRelations = relations(problem, ({ many }) => ({
  problemCompletion: many(problemCompletion),
  problemsToCategories: many(problemsToCategories),
}));

// problems completions table
export const problemCompletion = pgTable("problem_completion", {
  id: serial().primaryKey(),
  problemID: uuid().notNull(),
  userID: varchar({ length: 255 }).notNull(),
});

// problem completion relations
export const problemCompletionRelations = relations(
  problemCompletion,
  ({ one }) => ({
    users: one(user, {
      fields: [problemCompletion.userID],
      references: [user.userID],
    }),
    problems: one(problem, {
      fields: [problemCompletion.problemID],
      references: [problem.problemID],
    }),
  }),
);

// problem category table
export const problemCategory = pgTable("problem_category", {
  categoryID: serial().primaryKey(),
  categoryName: varchar({ length: 255 }).notNull(),
});

// problem category relations
export const problemCategoryRelations = relations(
  problemCategory,
  ({ many }) => ({
    problemsToCategories: many(problemsToCategories),
  }),
);

// problemsToCategories table
export const problemsToCategories = pgTable("problems_to_categories", {
  id: serial().primaryKey(),
  problemID: uuid().notNull(),
  categoryID: integer().notNull(),
});

// problemsToCategories relations
export const problemsToCategoriesRelations = relations(
  problemsToCategories,
  ({ one }) => ({
    problems: one(problem, {
      fields: [problemsToCategories.problemID],
      references: [problem.problemID],
    }),
    categories: one(problemCategory, {
      fields: [problemsToCategories.categoryID],
      references: [problemCategory.categoryID],
    }),
  }),
);
