import { MobileSidebar } from "@/components/MobileSidebar";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { getAccountStats } from "@/lib/actions/account.action";
import { PlaidAccountItem } from "@/types";
// import { RightSidebar } from "@/components/RightSidebar";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedIn, { getToken }] = await Promise.all([currentUser(), auth()]);
  const token = await getToken();

  if (!loggedIn || !token) {
    redirect("/");
  }

  const user = {
    id: loggedIn?.id ?? "",
    firstName: loggedIn?.firstName ?? "Guest",
    lastName: loggedIn?.lastName ?? "",
    email: loggedIn?.emailAddresses?.[0]?.emailAddress ?? "",
  };

  let accounts: PlaidAccountItem[] = [];

  try {
    /* ------------------------ Fetch account statistics ------------------------ */
    const accountStats = await getAccountStats(user.id);
    accounts = accountStats.accounts;
  } catch (error) {
    console.error("Error fetching account stats:", error);
  }

  return (
    <main className="flex h-screen overflow-hidden w-full bg-[#fafafb]">
      <Sidebar user={user} accounts={accounts} />
      <div className="flex flex-col overflow-x-auto flex-1 h-screen">
        <div className="flex h-20 items-center justify-between p-5 sm:p-8 md:hidden">
          <Link href="/" className="flex cursor-pointer relative -top-1">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={200}
              height={30}
              className="w-28"
            />
          </Link>
          <div>
            <MobileSidebar user={user} />
          </div>
        </div>
        <div className="flex flex-col h-screen">{children}</div>
      </div>
      {/* <RightSidebar user={user} accounts={accounts} /> */}
    </main>
  );
}
