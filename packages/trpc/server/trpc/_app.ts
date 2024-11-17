import { publicProcedure, router, authenticatedProcedure } from "./trpc";
import { z } from "zod";
import { createUser } from "@cooked/db";

const newUser = publicProcedure
  .input(
    z.object({
      userID: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      username: z.string().max(32),
      email: z.string().email(),
    }),
  )
  .mutation(async ({ input }) => {
    const { userID, firstName, lastName, username, email } = input;

    const success = await createUser({
      id: userID,
      firstName,
      lastName,
      username,
      email,
    });

    const message = success
      ? "User created successfully"
      : "Unable to create new user";

    return {
      success,
      message,
    };
  });

/* Test Procedures */
const echoHello = publicProcedure.query(async () => {
  console.log("Hello world from react native");

  return { message: "hello world from trpc" };
});

const echoUserData = authenticatedProcedure.query(({ ctx: { user } }) => {
  const str = user.primaryEmailAddress?.emailAddress;
  console.log(user.primaryEmailAddress?.emailAddress);

  return { message: str };
});

export const appRouter = router({
  echoHello,
  echoUserData,
  newUser,
});

export type AppRouter = typeof appRouter;
