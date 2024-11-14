import { clerkClient } from "@clerk/nextjs/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

// Get the user data from the bearer and add it to the trpc context
export async function createContext({ req }: FetchCreateContextFnOptions) {
  async function getUserFromHeader() {
    const authorization = req.headers.get("Authorization");
    if (authorization) {
      const userID = authorization.split(" ")[1];

      if (!userID) {
        return null;
      }

      const user = await clerkClient.users.getUser(userID);

      return user;
    }

    return null;
  }

  const user = await getUserFromHeader();

  return {
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
