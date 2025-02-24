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
    <section className="flex w-full max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="flex w-full flex-col gap-8 px-5 sm:px-8 py-8 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="title"
            title="Budget and Categories"
            subtext="Analyze your transactions and optimize your financial goals."
          />
        </header>
        <CategoryList categorizedTransactions={categorizedTransactions} />
      </div>
    </section>
  );
};

export default BudgetAndCategories;
