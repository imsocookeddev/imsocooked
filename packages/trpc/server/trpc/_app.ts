import { publicProcedure, router, authenticatedProcedure } from "./trpc";
import { z } from "zod";
import {
  createUser,
  getUser,
  getAllCountries,
  getLessonsByCountryID, updateUser,
} from "@cooked/db";

const newUser = authenticatedProcedure
  .input(
    z.object({
      firstName: z.string().min(1).max(255),
      lastName: z.string().min(1).max(255),
      username: z.string().min(1).max(255),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { firstName, lastName, username } = input;
    const { id, primaryEmailAddress } = ctx.user;

    if (!primaryEmailAddress) {
      return {
        success: false,
        message: "A fatal error has occurred",
      };
    }

    const success = await createUser({
      id,
      firstName,
      lastName,
      username,
      email: primaryEmailAddress?.emailAddress,
    });

    const message = success
      ? "User data updated successfully!"
      : "Unable to update user data.";

    return {
      success,
      message,
    };
  });

// Determine whether the user has entered their personal data.
const checkExistingUser = authenticatedProcedure.query(async ({ ctx }) => {
  console.log("id: " + ctx.user.id);
  const user = await getUser(ctx.user.id);

  return user !== undefined;
});

const getCountryList = authenticatedProcedure.query(async () => {
  const countries = await getAllCountries();

  return countries;
});

const getLessonsByCountry = authenticatedProcedure
  .input(z.string())
  .query(async ({ input }) => {
    return await getLessonsByCountryID(input);
  });

/* Test Procedures */
const echoHello = publicProcedure.query(async () => {
  console.log("Hello world from react native");

  return { message: "hello world from trpc" };
});

const echoUserData = authenticatedProcedure.query(async ({ctx: {user}}) => {
  const str = user.primaryEmailAddress?.emailAddress;
  const u = await getUser(user.id)
  // console.log(user.primaryEmailAddress?.emailAddress);
  console.log("user: " + u.email);

  return {message: u};
});

const updateUserData = authenticatedProcedure
    .input(
    z.object({
      firstName: z.string().min(1).max(255),
      lastName: z.string().min(1).max(255),
      email: z.string().min(1).max(255),
    }))
    .mutation(async ({ input, ctx })=> {
      const { firstName, lastName, email } = input;
      const { id } = ctx.user;

      console.log("Updating: " + firstName);

      const success = await updateUser({id, firstName, lastName, email});

      const message = success
          ? "User data updated successfully!"
          : "Unable to update user data.";

      return {
        success,
        message,
      };

})

export const appRouter = router({
  echoHello,
  echoUserData,
  newUser,
  checkExistingUser,
  getCountryList,
  getLessonsByCountry,
  updateUserData,
});

export type AppRouter = typeof appRouter;
