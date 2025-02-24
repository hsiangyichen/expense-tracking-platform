import { MobileSidebar } from "@/components/MobileSidebar";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { getAccountStats } from "@/lib/actions/account.action";
import { PlaidAccountItem, PlaidTransaction } from "@/types";
import { getTransactionStats } from "@/lib/actions/transaction.action";
import { RightSidebar } from "@/components/RightSidebar";

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
  let transactions: PlaidTransaction[] = [];

  try {
    /* ------------------------ Fetch account statistics ------------------------ */
    const accountStats = await getAccountStats(user.id);
    accounts = accountStats.accounts;

    /* ---------------------- Fetch transaction statistics ---------------------- */
    if (accounts.length > 0) {
      try {
        const transactionStats = await getTransactionStats(user.id);
        transactions = transactionStats.transactions;
      } catch (txError) {
        console.error("Error fetching transaction stats:", txError);
      }
    }
  } catch (error) {
    console.error("Error fetching account stats:", error);
  }

  return (
    <main className="flex h-screen overflow-hidden w-full bg-[#fafafb]">
      <Sidebar user={user} accounts={accounts} />
      <div className="flex flex-col overflow-x-auto flex-1 h-screen">
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
        <div className="flex flex-col flex-1 h-screen">{children}</div>
      </div>
      <RightSidebar
        user={user}
        transactions={transactions}
        accounts={accounts}
      />
    </main>
  );
}
