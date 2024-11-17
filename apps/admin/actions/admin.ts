'use server'
import { adminAction } from "@/lib/safe-action"
import { createCuisineSchema } from "@cooked/db"
import { createCuisine } from "@cooked/db"
import { db,eq } from "@cooked/db"
import { cuisine } from "@cooked/db/schema"
import z from "zod"
export const createCuisineAction = adminAction
  .schema(createCuisineSchema)
  .action(async ( {parsedInput:props}) =>{
    // throw new Error('Not implemented');
    const res = await createCuisine(props);
    if (!res[0]?.id){
      throw new Error('Failed to create cuisine')
    }
    return {
      success:true,
      id:res[0].id
    }
  });

export const updateCuisineImageAction = adminAction
.schema(z.object({
  id:z.string().min(1).max(100),
  imageUrl:z.string().min(1).max(500)
}))
.action(async ({ parsedInput:{
  id, imageUrl
}})=>{
  await db.update(cuisine).set({
    imageUrl
  }).where(eq(cuisine.cuisineID,id));

  return {
    success:true
  }
});
