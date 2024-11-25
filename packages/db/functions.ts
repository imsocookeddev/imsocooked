import { db, eq, and } from ".";
import { cuisine, user,cuisinesToCountries, country, problem, lesson } from "./schema";
import { CreateCuisineProps,CreateCountryActionProps,problemType } from "./types";
import { getDbWebSocket } from ".";
import c from "@cooked/config";
import z from "zod"
export async function createUser({
  id,
  firstName,
  lastName,
  email,
  username,
}: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}) {
  let success = true;

  try {
    await db.insert(user).values({
      userID: id,
      role: "user",
      hearts: c.defaultHearts,
      email,
      lastName,
      firstName,
      username,
    });
  } catch (e) {
    console.error("Error occurred while inserting user data: " + e); // TODO: Verify this logic works.
    success = false;
  }

  return success;
}

export async function getUser(id: string) {
  return db.query.user.findFirst({
    where: eq(user.userID, id),
  });
}

export async function updateUser({
  id,
  firstName,
  lastName,
  email,
}: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  let success = true;

  try {
    await db
      .update(user)
      .set({
        firstName,
        lastName,
        email,
      })
      .where(eq(user.userID, id));
  } catch (e) {
    console.error("Error occurred while inserting user data: " + e); // TODO: Verify this logic works.
    success = false;
  }
  return success;
}

export async function getAllCuisines() {
  return db.query.cuisine.findMany();
}

export async function getCuisineByCuisineID(id: string) {
  return db.query.cuisine.findFirst({ where: eq(cuisine.cuisineID, id) });
}

export async function getInProgressCuisines(userID: string) {
  try {
    const progressForUser = await db.query.cuisineProgress.findMany({
      where: eq(cuisineProgress.userID, userID),
      with: {
        cuisines: true,
      },
    });

    const cuisines = progressForUser.map((progress) => progress.cuisines);
    return cuisines;
  } catch (e) {
    // Only reaches this when schema issues occur.
    console.error(e);
    return [];
  }
}

export async function getLessonsByCuisineID(cuisineID: string) {
  return db.query.lesson.findMany({ where: eq(lesson.cuisineID, cuisineID) });
}

export async function getAdminUser(id: string) {
  return db.query.user.findFirst({
    where: and(eq(user.userID, id), eq(user.role, "admin")),
  });
}

export async function getAllUsers(){
  return db.query.user.findMany();
}

export async function getAllCuisines(){
  return db.query.cuisine.findMany();
}

export async function createCuisine(props:CreateCuisineProps){
  return db.insert(cuisine).values({
    ...props
  }).returning({ id:cuisine.cuisineID});
}

export async function getAllCountries(){
  return db.query.country.findMany();
}

export async function createCountry(props:CreateCountryActionProps){
  const {countryName, cuisinesToCountry} = props;
  console.log('props from create country',props);
  const dbWebsocket = getDbWebSocket();
  return dbWebsocket.transaction(async (tx)=>{
    console.log('inserting country');
   const countryRes = await tx.insert(country).values({
      countryName,
    }).returning({id:country.countryID});
    console.log('countryRes',countryRes);
    // If this fails, we will throw an error and the transaction will be rolled back
     const countryID = countryRes[0]!.id;
     console.log('countries are',cuisinesToCountry);
     const toInsert = cuisinesToCountry.map((cuisineID) => ({
       cuisineID,
       countryID,
     }));
     console.log('toInsert',toInsert);
     await tx.insert(cuisinesToCountries).values(toInsert);
     return countryID;
  });
}

export async function addCuisinesToCountry(countryID:string,cuisineIDs:string[]){
  return db.insert(cuisinesToCountries).values(cuisineIDs.map((cuisineID)=>({
    cuisineID,
    countryID
  })));
}

export async function getAllProblemCategories(){
  return db.query.problemCategory.findMany();
}

export async function getAllProblems(){
  return db.query.problem.findMany({
    with:{
      problemsToCategories:{
        with:{
          problems:true
        }
      }
    }
  });
}



// Helpers 
export function bucketSortProblems(problems:problemType[]){
  const buckets = new Map();
  for (const problem of problems){
    const bucket = problem.categoryID;
    if (!buckets.has(bucket)){
      buckets.set(bucket,[]);
    }
    buckets.get(bucket).push(problem);
  }
  return buckets;
}

// Implementing from the Durstenfeld shuffle algorithm
export function shuffleArray(array:any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Swap elements
  }
}

export function validateProblemType(problemType:string,problemContent:string, problemAnswer:string){
  const categoryValidatorMapper = c.problemTypes;
  type CategoryValidatorType = typeof categoryValidatorMapper
  const hasValue = problemType in categoryValidatorMapper
  if (!hasValue){
    return {
      success:false,
      message:`Problem Type Validation not implemented for ${problemType}`,
      reason:"problemType"
    }
  }
  const problem = categoryValidatorMapper[problemType as keyof CategoryValidatorType];
  try{
    const parsedContent = JSON.parse(problemContent);
    const parsedContentResults = problem.contentSchema.safeParse(parsedContent);
    if (!parsedContentResults.success){
      console.error("Failed parse on content. Error is: ",parsedContentResults.error);
      return {
        success: false,
        message:`Failed parse on content. Error is: ${parsedContentResults.error}`,
        reason:"problemContent"
      };
    }
    const parsedAnswer = JSON.parse(problemAnswer);
    const parsedAnswerResults = problem.answerSchema.safeParse(parsedAnswer);
    if (!parsedAnswerResults.success){
      console.error("Failed parse on the answer. Error is: ",parsedAnswerResults.error);
      return {
        success: false,
        message: `Failed parse on the answer. Error is: ${parsedAnswerResults.error}`,
        reason:"problemAnswer"
      };
    }
  }
  catch(e){
    console.error("An error occured.",e);
    return {
        success: false,
        message: `Failed JSON parse. Error is: ${e}`,
        reason:"parseError"
      };
  }
  return {
    success:true,
    message:"Parse and validation successful!",
    reason:"No errors present."
  };
  
}