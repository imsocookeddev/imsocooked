import { 
  varchar,
  serial,
  pgTable,
  pgEnum,
  timestamp,
  uuid,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import c from "../config";

export const userRoles = pgEnum('roles',c.roles);
export const problemTypes = pgEnum('problem_types',c.problem_types);

// Users table
export const users = pgTable('users',{
  id: serial().primaryKey(),
  clerkID:varchar({length:255}).notNull(),
  firstName: varchar({length:255}).notNull(),
  lastName: varchar({length:255}).notNull(),
  username: varchar({length:255}).notNull(),  
  email: varchar( {length:255}).notNull(),
  role: userRoles().notNull().default('user'),
  createdAt: timestamp().defaultNow(),
  profilePhoto: varchar({length:255}).notNull().default('https://www.gravatar.com/avatar/')
});

// user relations
export const userRelations = relations(users,
  ({many}) =>({
    lessonsProgress: many(lessonsProgress),
    regionsProgress: many(regionProgress),
    cuisinesProgress: many(cuisineProgress),
  }));


// lessons table
export const lessons = pgTable('lessons',{
  lessonID: serial().primaryKey(),
  title: varchar({length:255}).notNull(),
  regionID: varchar({length:255}).notNull(),
  // techniqie id maybe?
});

// lesson relations
export const lessonRelations = relations(lessons,
  ({many}) =>({
    problems: many(problems),
    regions: many(regions),
    lessonsProgress: many(lessonsProgress),
  }));


// Regions
export const regions = pgTable('regions',{
  regionID: uuid().defaultRandom().primaryKey(),
  regionName: varchar({length:255}).notNull(),
  cuisineID: varchar({length:255}).notNull(),
});

// region relations
export const regionRelations = relations(regions,
  ({many}) =>({
    cuisines: many(cuisines),
    lessons: many(lessons),
    regionsProgress: many(regionProgress),
  }));


export const problems = pgTable('problems',{
  problemID: uuid().defaultRandom().primaryKey(),
  prompt: varchar({length:255}).notNull(),
  problemType: problemTypes().notNull(),
  correctAnswer: varchar({length:255}).notNull(),
});
// problem relations

export const problemsRelations = relations(problems,
  ({many}) =>({
    lessons: many(lessons),
  }));

// Maybe this one is needed? Either that or we do not allow users to have their progress in a kept for a lessson
export const problemsProgress = pgTable('problems_progress',{
  id: serial().primaryKey(),
  problemID: varchar({length:255}).notNull(),
  userID: varchar({length:255}).notNull(),
});

export const cuisinesToRegions = pgTable('cuisines_to_regions',{
  id: uuid().defaultRandom().primaryKey(),
  cuisineID: varchar({length:255}).notNull(),
  regionID: varchar({length:255}).notNull(),
});

//cuinesToRegions relations
export const cuisinesToRegionsRelations = relations(cuisinesToRegions,
  ({one}) =>({
    regions: one(regions),
    cuisines: one(cuisines),
  }));

export const lessonsToProblems = pgTable('lessons_to_problems',{
  id: uuid().defaultRandom().primaryKey(),
  lessonID: varchar({length:255}).notNull(),
  problemID: varchar({length:255}).notNull(),
});

// lessonsToProblems relations
export const lessonsToProblemsRelations = relations(lessonsToProblems,
  ({one}) => ({
    lessons: one(lessons),
    problems: one(problems),
}));

// cuisines table
export const cuisines = pgTable('cuisines',{
  cuisineID: uuid().defaultRandom().primaryKey(),
  cuisineName: varchar({length:255}).notNull(),
});

// cuisine relations
export const cuisineRelations = relations(cuisines,
  ({many}) =>({
    regions: many(regions),
    cuisinesProgress: many(cuisineProgress),
  }));

// cuisineProgress table
export const cuisineProgress = pgTable('cuisine_progress',{
  id: serial().primaryKey(),
  cuisineID: varchar({length:255}).notNull(),
  userID: varchar({length:255}).notNull(),
  progress: integer().notNull().default(0),
  isCompleted: boolean().notNull().default(false),
  lastSeen: timestamp().defaultNow(),
});

// cuisineProgress relations
export const cuisineProgressRelations = relations(cuisineProgress,
  ({one}) =>({
    cuisines: one(cuisines),
    users: one(users),
  }));

// regionProgress table
export const regionProgress = pgTable('region_progress',{
  id: serial().primaryKey(),
  regionID: varchar({length:255}).notNull(),
  userID: varchar({length:255}).notNull(),
  progress: integer().notNull().default(0),
  isCompleted: boolean().notNull().default(false),
});

// regionProgress relations
export const regionProgressRelations = relations(regionProgress,
  ({one}) =>({
    regions: one(regions),
    users: one(users),
  }));

// lessonProgress table
export const lessonsProgress = pgTable('lessons_progress',{
  id: serial().primaryKey(),
  lessonID: varchar({length:255}).notNull(),
  userID: varchar({length:255}).notNull(),
  progress: integer().notNull().default(0),
  isCompleted: boolean().notNull().default(false),
});

// lessonProgress relations
export const lessonsProgressRelations = relations(lessonsProgress,
  ({one}) =>({
    lessons: one(lessons),
    users: one(users),
  }));
