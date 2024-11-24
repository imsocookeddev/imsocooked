import CreateCuisineForm from "@/components/cuisines/CreateCuisineForm";
export default function NewCuisinePage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-row w-1/4">
        <h1 className="text-4xl">Create New Cuisine</h1>
      </div>
      <CreateCuisineForm />
    </main>
  );
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";