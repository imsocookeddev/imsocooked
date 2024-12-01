import CreateCuisineForm from "@/components/cuisines/CreateCuisineForm";
export default function NewCuisinePage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-black">Add New Cuisine</h1>
      <CreateCuisineForm />
    </main>
  );
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";