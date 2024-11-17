import { getAllCuisines } from "@cooked/db";
import { Card,CardContent,CardDescription,CardFooter,CardTitle,CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
export default async function CuisinesOverview(){
  const cuisines = await getAllCuisines();
  return (
    <div className="w-full grid grid-cols-3 px-7 gap-x-5">
      {cuisines.map((cuisine) => (
        <Link
          href={`/cuisines/${cuisine.cuisineID}`}
          key={cuisine.cuisineID}
          className="w-full h-full">
          <Card className="space-y-3">
            <CardHeader>
              <p className="w-full text-end text-xs">
                {cuisine.cuisineID}
              </p>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-3xl flex flex-row justify-between">
                <Image
            src={cuisine.imageUrl}
            alt={cuisine.cuisineName}
            width={50}
            height={50}
            className="rounded-full"
          />
                {cuisine.cuisineName}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );

}