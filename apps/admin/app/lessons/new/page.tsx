import { Suspense } from "react";
import BasicLoader from "@/components/shared/Loader";
import CreateProblemView from "@/components/problems/CreateProblemView";
export default function CreateLessonPage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-row w-1/5">
        <h1 className="text-4xl">Create New Lesson</h1>
      </div>
      <Suspense fallback={<BasicLoader />}>
        <CreateProblemView />
      </Suspense>
    </main>
  );
}
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
