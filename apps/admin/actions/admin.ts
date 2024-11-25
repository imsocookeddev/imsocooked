'use server'
import { adminAction } from "@/lib/safe-action"
import {
  db,
  eq,
  createCuisineSchema,
  createCountrySchemaAction,
  createProblemSchema,
  updateImageSchema,
  validateProblemType,
  createLessonSchema,
  getDbWebSocket
} from "@cooked/db";
import { createCuisine, createCountry, } from "@cooked/db/functions"
import { cuisine,country,problemCategory,problem,problemsToCategories,lesson } from "@cooked/db/schema"
import z from "zod"
import { revalidatePath } from "next/cache"
import { returnValidationErrors } from "next-safe-action";

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
export const createProblemAction = adminAction
  .schema(createProblemSchema)
  .action(async ({ parsedInput: problemsProps }) => {
    // We need to parse and validate the type of the problem
    const { message, reason, success } = validateProblemType(
      problemsProps.problemType,
      problemsProps.problemContent,
      problemsProps.correctAnswer
    );
    if (!success) {
      returnValidationErrors(createProblemSchema, {
        _errors: [`Reason is: ${reason} and error message is: ${message}`],
      });
    }

    // For certain ones, we will then parse, shuffle, and stringify again

    const dbWebsocket = getDbWebSocket();
    const res = await dbWebsocket.transaction(async (tx) => {
      const insertProblemResult = await tx
        .insert(problem)
        .values({
          ...problemsProps,
        })
        .returning({
          problemID: problem.problemID,
          categoryID: problem.categoryID,
        });

      const problemsToCategoriesValues = insertProblemResult[0]!;

      await tx.insert(problemsToCategories).values({
        ...problemsToCategoriesValues,
      });
      return problemsToCategoriesValues.problemID;
    });
    return {
      success: true,
      id: res,
    };
  });

  // Lesson actions (REMEMBER THAT WE ONLY NEED THE CATEGORY IDS AND NOT THE PROBLEM IDS AS THE PROBLEMS FOR A LESSON WILL BE GENERATED AT RUNTIME)

  export const createLessonAction = adminAction
  .schema(createLessonSchema)
  .action(async ({parsedInput:props})=>{
    db.insert(lesson).values({
      ...props
    });
  });
