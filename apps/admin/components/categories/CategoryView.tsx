import { getAllProblemCategories } from "@cooked/db";
import ModifyCategory from "./ModifyCategory";
import AddCategory from "./AddCategory";
export default async function CategoryView(){
  const categories = await getAllProblemCategories();
  
  return (
    <div className="w-[94%] grid grid-cols-3 2xl:grid-cols-4 px-7 gap-x-5 gap-y-5">
      {categories.map((category) => (
        <ModifyCategory key={category.categoryID} category={category} />
      ))}
      <AddCategory/>
    </div>
  );
}