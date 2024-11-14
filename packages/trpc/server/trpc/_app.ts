import { publicProcedure, router } from "./trpc";
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

const echoHello = publicProcedure.query(() => {
  console.log("Hello world from react native");

  return "hello world from trpc";
});

export const appRouter = router({
  newUser,
  echoHello,
});

export type AppRouter = typeof appRouter;
