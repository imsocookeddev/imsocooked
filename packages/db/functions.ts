import { db,eq,and } from ".";
import { cuisine, user } from "./schema";
import z from "zod";
import { CreateCuisineProps } from "./types";

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