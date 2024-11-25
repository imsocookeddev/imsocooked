import { getAllCuisines,getAllCountries,getAllProblemCategories } from "@cooked/db";
export default async function CreateLessonOverview() {
  const [cuisines,countries,problemCategories] = await Promise.all([getAllCuisines,getAllCountries,getAllProblemCategories]);
  


}