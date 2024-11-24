import { SearchParams } from "@/lib/types";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function ViewUserPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="w-screen flex flex-row h-[calc(100dvh-4rem)] items-center justify-center">
      <h1 className="font-black text-5xl">User</h1>
    </main>
  );
}
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";