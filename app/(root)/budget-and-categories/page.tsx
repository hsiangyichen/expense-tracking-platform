import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { HeaderBox } from "@/components/HeaderBox";
import { redirect } from "next/navigation";
import { getCategorizedTransactions } from "@/lib/actions/category.action";
import { CategoryList } from "@/components/CategoryList";

const BudgetAndCategories = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const categorizedTransactions = await getCategorizedTransactions(user?.id);

  return (
    <section className="flex flex-col w-full md:h-screen gap-5 lg:gap-6 px-5 sm:px-8 pt-0 pb-5 sm:pb-8 md:py-6 lg:py-10">
      <header className="flex flex-col justify-between flex-shrink-0">
        <HeaderBox
          type="title"
          title="Budget and Categories"
          subtext="Analyze your transactions and optimize your financial goals."
        />
      </header>
      <div className="flex-1 min-h-0">
        <CategoryList categorizedTransactions={categorizedTransactions} />
      </div>
    </section>
  );
};

export default BudgetAndCategories;
