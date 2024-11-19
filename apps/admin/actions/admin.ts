'use server'
import { adminAction } from "@/lib/safe-action"
import { createCuisineSchema, createCountrySchemaAction } from "@cooked/db"
import { createCuisine, createCountry } from "@cooked/db"
import { db,eq } from "@cooked/db"
import { cuisine,country } from "@cooked/db/schema"
import z from "zod"
import { updateImageSchema } from "@cooked/db"

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
.schema(updateImageSchema)
.action(async ({parsedInput:{
  id, imageUrl
}})=>{
  await db.update(cuisine).set({
    imageUrl
  }).where(eq(cuisine.cuisineID,id));

  return {
    success:true
  }
});

export const createCountryAction = adminAction
  .schema(createCountrySchemaAction)
  .action(async ({parsedInput:props}) =>{
    console.log('props',props);
    const id = await createCountry(props);
    return{
      success:true,
      id
    }
  });

export const updateCountryImageAction = adminAction
.schema(updateImageSchema)
.action(async ({parsedInput:{
  id, imageUrl
}})=>{
  await db.update(country).set({
    imageUrl
  }).where(eq(country.countryID,id));
  return {
    success:true
  }
});
