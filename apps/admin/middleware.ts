import { clerkMiddleware,createRouteMatcher, } from "@clerk/nextjs/server";
import {getAdminUser} from "@cooked/db"
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth,req) => {

  if (!isPublicRoute(req)){
    const { userId, redirectToSignIn } = auth();
    if (!userId) {
      redirectToSignIn();
    }
    // Else we get our user object
    const user = await getAdminUser(userId!);
    if (!user) {
      return NextResponse.rewrite(new URL('/not_found',req.url));
    }
    // If we use the 'next' functionality here, we should see if we can get what this passes from the layouts or something
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
