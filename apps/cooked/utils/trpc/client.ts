import type { AppRouter } from "@cooked/trpc";
import { createTRPCReact } from "@trpc/react-query";

export type { Question } from "@cooked/trpc";
export const trpc = createTRPCReact<AppRouter>();
