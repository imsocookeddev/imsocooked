import "./globals.css"
import type { Metadata } from "next";
import { ClerkProvider} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Image from "next/image";
import chickenFreid from "../public/chef-freid-chicken.svg";
import Link from "next/link";
import AdminTabs from "@/components/admin-tabs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AdminUserButton from "@/components/AdminUserButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cooked Admin",
  description: "If you ain't cookin', you ain't livin'🗣️🔥",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.className}`}>
        <body className="dark">
          <div className="border-b border-muted px-4 flex w-full items-center justify-between h-16">
            <div className="flex flex-row items-center gap-x-4">
              <Link href="/">
                <Image
                  src={chickenFreid}
                  alt="Chef Freid Chicken"
                  className="w-12 h-auto"
                />
              </Link>
              <div className="h-10 w-[2px] rotate-[25deg] bg-white" />
              <h1 className="font-bold text-xl">Admin</h1>
            </div>
            <AdminTabs />
            {/* There is a small moment where this renders nothing. Need to see how we can fix this to prevent layout shifft */}
            <Suspense
              fallback={
                <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
              }>
              <AdminUserButton />
              </Suspense>
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
