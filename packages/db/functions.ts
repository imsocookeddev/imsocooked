import { db,eq,and } from ".";
import { cuisine, user,cuisinesToCountries, country, problem } from "./schema";
import { CreateCuisineProps,CreateCountryActionProps,problemType } from "./types";
import { getDbWebSocket } from ".";

export async function getUser(id:string){
  return db.query.user.findFirst({
    where:eq(user.userID,id)
  })
}

export async function getAdminUser(id:string){
  return db.query.user.findFirst({
    where:(
      and(eq(user.userID,id), eq(user.role,'admin'))
    )
  })
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
