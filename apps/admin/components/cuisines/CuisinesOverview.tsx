import { getAllCuisines } from "@cooked/db";
import GeneralViewCard from "../shared/GeneralViewCard";
import { unstable_noStore as noStore} from "next/cache";

export default async function CuisinesOverview(){
  noStore();
  const cuisines = await getAllCuisines();
  
  return (
    <div className="w-full grid grid-cols-3 px-7 gap-x-5 gap-y-5">
      {cuisines.map((cuisine) => (
        <GeneralViewCard
          key={cuisine.cuisineID}
          name={cuisine.cuisineName}
          id={cuisine.cuisineID}
          imgUrl={cuisine.imageUrl}
          />
      ))}
    </div>
  );

}