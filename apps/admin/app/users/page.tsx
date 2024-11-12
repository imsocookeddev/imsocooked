import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersDataTable } from "@/components/users/UsersDataTable";

export default function UsersPage(){
  return (
    <main className="w-screen flex flex-col h-[calc(100dvh-4rem)]">
      <div className="w-full h-full flex flex-row justify-center mt-6">
        <div className="w-full max-w-[80%] max-h-screen">
          <h1 className="font-black text-5xl mt-4">Users</h1>
          <Suspense fallback={<UsersTableSuspense />}>
            <UsersDataTable />
          </Suspense>
        </div>
      </div>
    </main>
  );
}


function UsersTableSuspense(){
 return <Skeleton className="w-full h-full max-h-[500px]"></Skeleton>;
}