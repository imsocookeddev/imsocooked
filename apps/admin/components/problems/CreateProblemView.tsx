import { getAllProblemCategories } from "@cooked/db";
import CreateProblemForm from "./CreateProblemForm";
export default async function CreateProblemView(){
  const problemCategories = await getAllProblemCategories();


  return <CreateProblemForm categories={problemCategories} />;


}