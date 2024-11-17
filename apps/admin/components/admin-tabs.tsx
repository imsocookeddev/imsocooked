'use client'
import c from "@cooked/config";
import { useSearchParams,usePathname } from "next/navigation";
import clsx from "clsx";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
export default function AdminTabs() {
  const pathname = usePathname();

  console.log("pathname is: ", pathname);

  return (
    <div className="flex flex-row items-end justify-center gap-x-4 h-full">
      {c.admin.tabs.map((tab) => (
        <AdminTab
          key={tab.name}
          name={tab.name}
          href={tab.url}
          isSelected={tab.url === pathname}
        />
      ))}
    </div>
  );
}


function AdminTab(
  {name, href,isSelected}:{
  name: string;
  href: string;
  isSelected: boolean;
}) {
    return (
      <Link
        href={href}
        className={
          `text-base whitespace-nowrap border-b-2 px-3 pb-2 transition-colors duration-150 ${isSelected? 'border-primary': 'border-transparent hover:border-muted'}`
        }>
        {name}
      </Link>
    );
  
}