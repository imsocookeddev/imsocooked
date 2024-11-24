import ProblemsView from "@/components/problems/ProblemsView";
import BasicLoader from "@/components/shared/Loader";
import { Suspense } from "react";
export default function ProblemsPage() {
  return (
    <main className="w-screen flex flex-row h-[calc(100dvh-4rem)] items-center justify-center">
      <Suspense fallback={<BasicLoader />}>
        <ProblemsView />
      </Suspense>
    </main>
  );
}
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";