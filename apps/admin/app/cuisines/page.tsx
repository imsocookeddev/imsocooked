import { Suspense } from "react";
import BasicLoader from "@/components/shared/Loader";
import CuisinesOverview from "@/components/cuisines/CuisinesOverview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function CuisinesPage() {
  return (
    <main className="w-screen flex flex-col h-[calc(100dvh-4rem)] space-y-5">
      <div className="w-full flex flex-row justify-center">
        <div className="flex flex-row justify-between w-[90%] mt-[2%]">
          <h1 className="font-black text-5xl">Cuisines</h1>
          <Link href="/cuisines/new">
            <Button className="flex flex-row justify-between py-2">
              <PlusCircle />
              Create New Cuisine
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full">
        <Suspense fallback={<BasicLoader />}>
          <CuisinesOverview />
        </Suspense>
      </div>
    </main>
  );
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";