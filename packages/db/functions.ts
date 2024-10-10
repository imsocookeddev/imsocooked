import { db,eq } from ".";
import { users } from "./schema";

export async function getUser(id:string){
  return db.query.users.findFirst({
    where:eq(users.clerkID,id)
  })
}