import { Suspense } from "react";
import BasicLoader from "@/components/shared/Loader";
import CountriesOverview from "@/components/countries/CountriesOverview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function CountriesPage() {
  return (
    <main className="w-screen flex flex-col h-[calc(100dvh-4rem)] space-y-5">
      <div className="w-full flex flex-row justify-center">
        <div className="flex flex-row justify-between w-[90%] mt-[2%]">
          <h1 className="font-black text-5xl">Countries</h1>
          <Link href="/countries/new">
            <Button className="flex flex-row justify-between py-2">
              <PlusCircle />
              Add Country
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full">
        <Suspense fallback={<BasicLoader />}>
          <CountriesOverview />
        </Suspense>
      </div>
    </main>
  );
}
