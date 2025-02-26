import { HomeRecentTransactions } from "@/components/HomeRecentTransactions";
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
    /* ------------------------ Fetch account statistics ------------------------ */
    const accountStats = await getAccountStats(user.id);
    accounts = accountStats.accounts;
    totalAccounts = accountStats.totalAccounts;
    totalCurrentBalance = accountStats.totalCurrentBalance;

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
    <section className="flex flex-col w-full h-screen gap-5 lg:gap-8 px-5 sm:px-8 pb-10 pt-0 md:pt-8 lg:pt-12">
      <header className="flex flex-col justify-between">
        <HeroBox
          accounts={accounts}
          totalAccounts={totalAccounts}
          totalCurrentBalance={totalCurrentBalance}
        />
      </header>
      <HomeRecentTransactions accounts={accounts} transactions={transactions} />
    </section>
  );
};

export default Home;
