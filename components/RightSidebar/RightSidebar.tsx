import React from "react";
import { BankCard } from "@/components/BankCard";
import { RightSidebarProps } from "./RightSidebar.types";
import { PlaidLink } from "@/components/PlaidLink";
import { getCategorizedTransactions } from "@/lib/actions/category.action";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarPieChart } from "@/components/SidebarPieChart";
import { toPascalCase } from "@/lib/utils";

const RightSidebar = async ({ user, accounts }: RightSidebarProps) => {
  const categorizedData = await getCategorizedTransactions(user?.id);
  const mappedCategories = categorizedData.categories.map((category) => ({
    category: {
      value: category.name.toLowerCase().replace(/\s+/g, "-"),
      label: toPascalCase(category.name),
    },
    originalName: category.name,
    transactions: category.transactions,
    totalAmount: category.totalAmount,
    percentage: category.percentage,
    count: category.count,
  }));

  const categoriesWithTransactions = mappedCategories.filter(
    (item) => item.transactions.length > 0
  );

  const sortedCategories = [...categoriesWithTransactions].sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  return (
    <aside className="flex-col lg:flex hidden w-[375px] h-screen pr-5 sm:pr-8 pt-0 pb-5 sm:pb-8 md:py-6 lg:py-10">
      <section className="flex flex-col justify-between gap-8 px-6 p-12 pt-6 rounded-xl border border-stone-200 shadow-sm mb-8">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Cards</h2>
          <PlaidLink user={user} type="right-sidebar" />
        </div>
        {accounts?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10 right-3">
              <BankCard
                key={accounts[0].balanceCurrent}
                account={accounts[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {accounts[1] && (
              <div className="absolute -right-2 top-6 z-0 w-[90%]">
                <BankCard
                  key={accounts[1].balanceCurrent}
                  account={accounts[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
      <section className="flex-1 overflow-y-auto flex flex-col rounded-xl border border-stone-200 shadow-sm">
        <div className="flex-shrink-0 px-6 py-6 flex w-full justify-between">
          <h2 className="header-2">Categories</h2>
          <Link
            href={`/budget-and-categories`}
            className="text-14 flex items-center gap-2 font-medium text-stone-500 hover:text-stone-800"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {categoriesWithTransactions.length === 0 ? (
          <div className="py-6 text-center text-gray-500 text-sm">
            No categories available
          </div>
        ) : (
          <ScrollArea className="flex-grow px-6 pb-6">
            <div className="space-y-2">
              {sortedCategories.slice(0, 5).map((category, index) => (
                <Link
                  href={`/budget-and-categories/${category.category.value}`}
                  key={`${category.category.value}-${index}`}
                >
                  <SidebarPieChart
                    categoryName={category.category.label}
                    totalAmount={category.totalAmount}
                    percentage={category.percentage}
                    count={category.count}
                    originalCategoryName={category.originalName}
                  />
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;
