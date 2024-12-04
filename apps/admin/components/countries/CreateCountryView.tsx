import { getAllCountries, getAllCuisines } from "@cooked/db";
import CreateCountryForm from "./CreateCountryForm";
import { db } from "@cooked/db";
import { country, cuisine } from "@cooked/db/schema";


export default async function CreateCountryView(){
  const cuisines = await db.select({
    id:cuisine.cuisineID,
    name:cuisine.cuisineName,
  }).from(cuisine);
  

  return <CreateCountryForm cuisines={cuisines} />;
}