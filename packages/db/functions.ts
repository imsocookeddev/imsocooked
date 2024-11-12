import { db,eq,and } from ".";
import { user } from "./schema";

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
  return db.query.user.findMany()
}