import { Suspense } from "react";
import BasicLoader from "@/components/shared/Loader";
import CreateProblemView from "@/components/problems/CreateProblemView";
export default function CreateProblemPage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-black">Create New Problem</h1>
      <Suspense fallback={<BasicLoader />}>
        <CreateProblemView />
      </Suspense>
    </main>
  );
}
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
