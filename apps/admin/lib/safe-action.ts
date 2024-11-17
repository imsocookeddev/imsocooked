import { createSafeActionClient, returnValidationErrors } from "next-safe-action"
import { getAdminUser } from "@cooked/db";
import { auth } from "@clerk/nextjs/server";
import z from "zod"

export const actionClient = createSafeActionClient();

export const authenticatedAction = actionClient.use(
  // TODO: Add registration check here?
  async ({ next, }) => {
    const { userId } = auth();
    if (!userId)
      returnValidationErrors(z.null(), {
        _errors: ["Unauthorized (No User ID)"],
      });
    // TODO: add check for registration
    return next({ ctx: { userId } });
  }
);

export const adminAction = authenticatedAction.use(
  async ({ ctx, next }) => {
    const user = await getAdminUser(ctx.userId);
    if (!user)
      returnValidationErrors(z.null(), {
        _errors: ["Unauthorized (User is not an admin)"],
      });
      
    return next({ ctx: { user } });
  }



)