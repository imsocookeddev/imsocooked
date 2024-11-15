import { getAllUsers } from "@cooked/db";
import { UsersDataTable } from "./UsersDataTable";

export default async function MainUserContent() {
  const allUsers = await getAllUsers();



}