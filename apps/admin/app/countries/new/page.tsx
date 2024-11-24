import CreateCountryView from "@/components/countries/CreateCountryView";
import { Suspense } from "react";
import BasicLoader from "@/components/shared/Loader";
export default function NewCountryPage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-row w-1/3">
        <h1 className="text-4xl">Add Country</h1>
      </div>
      <Suspense fallback={<BasicLoader />}>
        <CreateCountryView />
      </Suspense>
    </main>
  );
}
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";