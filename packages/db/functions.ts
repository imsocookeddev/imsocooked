import { db, eq, and } from ".";
import { user, lesson } from "./schema";
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
    email
}: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  let success = true;

  try {
    await db.update(user)
        .set({
          firstName: firstName,
          lastName: lastName,
          email: email,
        })
        .where(eq(user.userID, id))
  } catch (e) {
    console.error("Error occurred while inserting user data: " + e); // TODO: Verify this logic works.
    success = false;
  }
  return success;
}

export async function getLessonsByCountryID(countryID: string) {
  return db.query.lesson.findMany({ where: eq(lesson.countryID, countryID) });
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
