import { db, eq, and } from ".";
import { user } from "./schema";
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
    console.error("Error occurred while inserting user data: " + e);
    success = false;
  }

  return success;
}

export async function getUser(id: string) {
  return db.query.user.findFirst({
    where: eq(user.userID, id),
  });
}

export async function getAdminUser(id: string) {
  return db.query.user.findFirst({
    where: and(eq(user.userID, id), eq(user.role, "admin")),
  });
}

export async function getAllUsers() {
  return db.query.user.findMany();
}

