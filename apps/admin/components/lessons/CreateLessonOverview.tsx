import { getAllProblemCategoriesWithProblems, getAllCuisinesWithCountries } from "@cooked/db";
import CreateLessonForm from "./CreateLessonForm";
import { problemCategory } from "@cooked/db/schema";
import { ProblemOrderProps } from "@/lib/types";
export default async function CreateLessonOverview() {
  // const categoriesQuery = db.select({
  //   id:problemCategory.categoryID,
  //   name:problemCategory.categoryName
  // }).from(problemCategory);
  
  
  const [cuisinesWithCountries,categories] = await Promise.all([getAllCuisinesWithCountries(),getAllProblemCategoriesWithProblems()]);
  const filteredCuisines = cuisinesWithCountries.filter(cuisine=>cuisine.countriesToCuisines.length>0);

  if (filteredCuisines.length === 0) {
    return <div>No cuisines with countries found. Please add some and continue</div>;
  }
  const filteredCategories:ProblemOrderProps[] = [];
  for (const category of categories){
    if (category.problemsToCategories.length>0){
      filteredCategories.push({id:category.categoryID,name:category.categoryName})
    }
  }

  if (filteredCategories.length === 0) { 
    return <div>No problem categories found. Please add some and continue</div>;
  }

  return <CreateLessonForm cuisinesWithCountries={filteredCuisines} categories={filteredCategories} />;


}