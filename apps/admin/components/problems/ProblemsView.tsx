import { getAllProblems } from "@cooked/db";

export default async function ProblemsView(){
  const problems = await getAllProblems();

  return (
    <>
      <h1 className="font-black text-5xl">Problems</h1>
    </>
  );

}