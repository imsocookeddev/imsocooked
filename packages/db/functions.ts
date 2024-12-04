import { db, eq, and, count } from ".";
import {
  user,
  lesson,
  cuisineProgress,
  cuisine,
  problem,
  problemCategory,
  problemCompletion,
} from "./schema";
import c from "@cooked/config";

export async function createUser({
  id,
  firstName,
  lastName,
  email,
  username,
}: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}) {
  let success = true;

  try {
    await db.insert(user).values({
      userID: id,
      role: "user",
      hearts: c.defaultHearts,
      email,
      lastName,
      firstName,
      username,
    });
  } catch (e) {
    console.error("Error occurred while inserting user data: " + e); // TODO: Verify this logic works.
    success = false;
  }

  return success;
}

export async function getUser(id: string) {
  return db.query.user.findFirst({
    where: eq(user.userID, id),
  });
}

export async function updateUser({
  id,
  firstName,
  lastName,
  email,
}: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  let success = true;

  try {
    await db
      .update(user)
      .set({
        firstName,
        lastName,
        email,
      })
      .where(eq(user.userID, id));
  } catch (e) {
    console.error("Error occurred while inserting user data: " + e); // TODO: Verify this logic works.
    success = false;
  }
  return success;
}

export async function getAllCuisines() {
  return db.query.cuisine.findMany();
}

export async function getCuisineByCuisineID(id: string) {
  return db.query.cuisine.findFirst({ where: eq(cuisine.cuisineID, id) });
}

export async function getInProgressCuisines(userID: string) {
  try {
    const progressForUser = await db.query.cuisineProgress.findMany({
      where: eq(cuisineProgress.userID, userID),
      with: {
        cuisines: true,
      },
    });

    const cuisines = progressForUser.map((progress) => progress.cuisines);
    return cuisines;
  } catch (e) {
    // Only reaches this when schema issues occur.
    console.error(e);
    return [];
  }
}

export async function getLessonByLessonID(lessonID: string) {
  return db.query.lesson.findFirst({ where: eq(lesson.lessonID, lessonID) });
}

export async function getLeastCompletedProblemsByLesson(
  lessonID: string,
  userID: string,
) {
  const lessonData = await db.query.lesson.findFirst({
    where: eq(lesson.lessonID, lessonID),
  });

  const problems = lessonData?.problemOrder.map(
    async (categoryID) =>
      await db.query.problem.findFirst({
        where: (problems, { eq }) =>
          eq(problems.categoryID, parseInt(categoryID)),
        orderBy: (problem, { asc }) => {
          const numCompletionsSubquery = db
            .select({
              completionCount: count(),
            })
            .from(problemCompletion)
            .where(
              and(
                eq(problemCompletion.userID, userID),
                eq(problemCompletion.problemID, problem.problemID),
              ),
            );

          return asc(numCompletionsSubquery);
        },
      }),
  );

  if (!problems) {
    return [];
  }

  return Promise.all(problems);
}

export async function getLessonsByCuisineID(cuisineID: string) {
  return db.query.lesson.findMany({ where: eq(lesson.cuisineID, cuisineID) });
}

export async function getAdminUser(id: string) {
  return db.query.user.findFirst({
    where: and(eq(user.userID, id), eq(user.role, "admin")),
  });
}

export async function getAllUsers() {
  return db.query.user.findMany();
}

export async function getAllCountries() {
  return db.query.country.findMany();
}
