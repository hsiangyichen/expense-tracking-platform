import { HeaderBox } from "@/components/HeaderBox";
import { RightSidebar } from "@/components/RightSidebar";
import { RecentTransactions } from "@/components/RecentTransactions";
import { HeroBox } from "@/components/HeroBox";
import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountStats } from "@/lib/actions/account.action";
import { PlaidAccountItem, PlaidTransaction } from "@/types";
import { getTransactionStats } from "@/lib/actions/transaction.action";

const Home = async () => {
  const loggedIn = await currentUser();

  if (!loggedIn) {
    redirect("/");
  }

  const user = {
    id: loggedIn?.id ?? "",
    firstName: loggedIn?.firstName ?? "Guest",
    lastName: loggedIn?.lastName ?? "",
    email: loggedIn?.emailAddresses?.[0]?.emailAddress ?? "",
  };

  let accounts: PlaidAccountItem[] = [];
  let totalAccounts = 0;
  let totalCurrentBalance = 0;
  let transactions: PlaidTransaction[] = [];

  try {
    // Fetch account statistics
    const accountStats = await getAccountStats(user.id);
    accounts = accountStats.accounts;
    totalAccounts = accountStats.totalAccounts;
    totalCurrentBalance = accountStats.totalCurrentBalance;

    // Fetch transaction statistics
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
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <HeroBox
            accounts={accounts}
            totalAccounts={totalAccounts}
            totalCurrentBalance={totalCurrentBalance}
          />
        </header>
        <RecentTransactions accounts={accounts} transactions={transactions} />
      </div>
      <RightSidebar
        user={user}
        transactions={transactions}
        accounts={accounts}
      />
    </section>
  );
};

export default Home;
