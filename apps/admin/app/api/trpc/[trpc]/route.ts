import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext, appRouter } from "@cooked/trpc";

async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
}

export { handler as GET, handler as POST };
