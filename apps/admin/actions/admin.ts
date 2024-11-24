'use server'
import { adminAction } from "@/lib/safe-action"
import { createCuisineSchema, createCountrySchemaAction } from "@cooked/db"
import { createCuisine, createCountry } from "@cooked/db"
import { db,eq } from "@cooked/db"
import { cuisine,country,problemCategory } from "@cooked/db/schema"
import z from "zod"
import { updateImageSchema } from "@cooked/db"
import { revalidatePath } from "next/cache"


// Cuisine actions  
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

export const deleteCuisineAction = adminAction.schema(
  z.object({
    id: z.string().min(1).max(100),
  })
)
.action(async ({parsedInput:{
  id
}})=>{
  await db.delete(cuisine).where(eq(cuisine.cuisineID,id));
  revalidatePath("/cuisines");
  return {
    success:true
  }
});


// Country actions
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

export const deleteCountryAction = adminAction.schema(
  z.object({
    id: z.string().min(1).max(100),
  })
)
.action(async ({parsedInput:{
  id
  }})=>{
    await db.delete(country).where(eq(country.countryID,id));
    revalidatePath("/countries");
    return {
      success:true
    }
  });

// Problem Category actions
export const deleteProblemCategoryAction = adminAction
.schema(z.object({
  id:z.number().positive()
}))
.action(async ({parsedInput:{
  id
}})=>{
  await db.delete(problemCategory).where(eq(problemCategory.categoryID,id));
  revalidatePath("/categories");
  return {
    success:true
  }
});

export const updateProblemCategoryAction = adminAction
.schema(z.object({
  id:z.number().positive(),
  name:z.string().min(1).max(255)
}))
.action(async ({parsedInput:{
  id,name
}})=>{
  await db.update(problemCategory).set({
    categoryName:name
  }).where(eq(problemCategory.categoryID,id));
  return {
    success:true
  }
});

export const createProblemCategoryAction = adminAction
.schema(z.object({
  name:z.string().min(1).max(255)
}))
.action(async ({parsedInput:{
  name
}})=>{
  await db.insert(problemCategory).values({
    categoryName:name
  }).returning({id:problemCategory.categoryID});
  revalidatePath("/categories");
  return {
    success:true,
  }
});

// Problem actions


