import CreateCountryView from "@/components/countries/CreateCountryView";
import { Suspense } from "react";
import BasicLoader from "@/components/shared/Loader";
export default function NewCountryPage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-black">Create New Country</h1>
      <Suspense fallback={<BasicLoader />}>
        <CreateCountryView />
      </Suspense>
    </main>
  );
}
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";