import { db,eq,and } from ".";
import { users } from "./schema";

export async function getUser(id:string){
  return db.query.users.findFirst({
    where:eq(users.userID,id)
  })
}

export async function getAdminUser(id:string){
  return db.query.users.findFirst({
    where:(
      and(eq(users.userID,id), eq(users.role,'admin'))
    )
  })
    
}