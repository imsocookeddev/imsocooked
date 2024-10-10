import { clerkMiddleware } from "@clerk/nextjs/server";
import {config as envConfig} from "dotenv"
import {getUser} from "@repo/db"

envConfig({ path: "../../.env" });

export default clerkMiddleware(async (auth,req)=>{
  const authObject = auth();
  const id = authObject.userId;
  if (!id){
    authObject.redirectToSignIn();
  }
  // Else we get our user object
  const user = await getUser(id!);
 

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
