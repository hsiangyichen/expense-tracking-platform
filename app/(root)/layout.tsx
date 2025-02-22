import { MobileSidebar } from "@/components/MobileSidebar";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { getAccountStats } from "@/lib/actions/account.action";
import { PlaidAccountItem } from "@/types";

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
    const accountStats = await getAccountStats(user.id);
    accounts = accountStats.accounts;
  } catch (error) {
    console.error("Error fetching account stats:", error);
  }

  return (
    <main className="flex h-screen w-full">
      <Sidebar user={user} accounts={accounts} />

      <div className="flex size-full flex-col">
        <div className="flex h-20 items-center justify-between p-5 sm:p-8 md:hidden">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={200}
            height={30}
            className="w-28"
          />
          <div>
            <MobileSidebar user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
