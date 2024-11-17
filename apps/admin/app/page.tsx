import c from "@cooked/config"
import { getAdminUser } from "@cooked/db";
import { auth } from "@clerk/nextjs/server";
export default async function Home() {
  const { userId } = auth()
  const user = await getAdminUser(userId!)

  return (
    // got annoyed and did a bs calculation here instead 
    <main className="w-screen flex flex-row h-[calc(100dvh-4rem)] items-center justify-center">
      <h1 className="font-black text-5xl">I'm So Cooked Admin</h1>
    </main>
  );
}
