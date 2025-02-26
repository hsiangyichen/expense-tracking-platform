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
    <section className="flex flex-col w-full gap-5 lg:gap-8 px-5 sm:px-8 pb-10 lg:pt-12">
      <header className="flex flex-col justify-between">
        <HeaderBox
          type="title"
          title="Budget and Categories"
          subtext="Analyze your transactions and optimize your financial goals."
        />
      </header>
      <CategoryList categorizedTransactions={categorizedTransactions} />
    </section>
  );
};

export default BudgetAndCategories;
