import { Suspense } from "react";
import BasicLoader from "@/components/shared/Loader";
import CategoryView from "@/components/categories/CategoryView";
export default function CategoriesPage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center space-y-4">
      <div className="flex flex-row justify-between w-[90%] mt-[2%]">
        <h1 className="font-black text-5xl">Problem Categories</h1>
      </div>
      <Suspense fallback={<BasicLoader />}>
        <CategoryView />
      </Suspense>
    </main>
  );
}
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";