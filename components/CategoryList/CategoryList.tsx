"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { CategoryListProps } from "./CategoryList.types";
import { CategoryBox } from "../CategoryBox";
import { toPascalCase } from "@/lib/utils";
import { Notfound } from "../Notfound";

const CategoryList = ({ categorizedTransactions }: CategoryListProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    categorizedTransactions[0]?.category.value || ""
  );

  const hasTransactions = categorizedTransactions.some(
    (item) => item.transactions.length > 0
  );

  if (!hasTransactions) {
    return <Notfound item="transactions" />;
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full overflow-x-scroll"
    >
      <ScrollArea className="w-full">
        <TabsList className="flex h-56 gap-6 p-0 px-5 sm:px-8">
          {categorizedTransactions.map((item) => (
            <CategoryBox key={item.category.value} item={item} />
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      {categorizedTransactions.map((item) => (
        <TabsContent key={item.category.value} value={item.category.value}>
          <Card className="border-none px-5 sm:px-8 ">
            <div className="space-y-4">
              {item.transactions.length > 0 ? (
                item.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-gray-900">
                        {transaction.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className={`font-medium ${
                        transaction.amount < 0
                          ? "text-green-600"
                          : "text-stone-900"
                      }`}
                    >
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-center text-sm justify-center py-8 text-stone-800">
                  No transactions found for {toPascalCase(item.category.label)}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryList;
