"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import type { CategoryBoxProps } from "./CategoryBox.types";
import { toPascalCase } from "@/lib/utils";

const categoryGradients: { [key: string]: string } = {
  INCOME: "bg-gradient-to-br from-[#CBE4DE] to-green-200",
  "TRANSFER IN": "bg-gradient-to-br from-[#CBE4DE] to-emerald-200",
  "TRANSFER OUT": "bg-gradient-to-br from-[#CBE4DE] to-red-200",
  "LOAN PAYMENTS": "bg-gradient-to-br from-[#CBE4DE] to-emerald-200",
  "BANK FEES": "bg-gradient-to-br from-[#CBE4DE] to-gray-200",
  ENTERTAINMENT: "bg-gradient-to-br from-[#CBE4DE] to-green-200",
  "FOOD AND DRINK": "bg-gradient-to-br from-[#CBE4DE] to-blue-200",
  "GENERAL MERCHANDISE": "bg-gradient-to-br from-[#CBE4DE] to-indigo-200",
  "HOME IMPROVEMENT": "bg-gradient-to-br from-[#CBE4DE] to-blue-200",
  MEDICAL: "bg-gradient-to-br from-[#CBE4DE] to-red-200",
  "PERSONAL CARE": "bg-gradient-to-br from-[#CBE4DE] to-purple-200",
  "GENERAL SERVICES": "bg-gradient-to-br from-[#CBE4DE] to-cyan-200",
  "GOVERNMENT AND NON PROFIT": "bg-gradient-to-br from-[#CBE4DE] to-gray-200",
  TRANSPORTATION: "bg-gradient-to-br from-[#CBE4DE] to-sky-200",
  TRAVEL: "bg-gradient-to-br from-[#CBE4DE] to-violet-200",
  "RENT AND UTILITIES": "bg-gradient-to-br from-[#CBE4DE] to-blue-200",
};

const mockBudgetData: { [key: string]: number } = {
  INCOME: 5000,
  "TRANSFER IN": 500,
  "TRANSFER OUT": 500,
  "LOAN PAYMENTS": 800,
  "BANK FEES": 50,
  ENTERTAINMENT: 200,
  "FOOD AND DRINK": 50,
  "GENERAL MERCHANDISE": 400,
  "HOME IMPROVEMENT": 200,
  MEDICAL: 150,
  "PERSONAL CARE": 50,
  "GENERAL SERVICES": 200,
  "GOVERNMENT AND NON PROFIT": 50,
  TRANSPORTATION: 250,
  TRAVEL: 500,
  "RENT AND UTILITIES": 1200,
};

const CategoryBox = ({ item }: CategoryBoxProps) => {
  const bgColor =
    categoryGradients[item.category.label.toUpperCase()] ||
    "bg-gradient-to-br from-gray-200 to-gray-400";

  const budget = mockBudgetData[item.category.label.toUpperCase()] || 0;
  const spent = item.totalAmount;
  const percentage = budget > 0 ? (spent / budget) * 50 : 0;
  const percentageLeft = 100 - percentage;

  return spent > 0 ? (
    <div
      className={`rounded-2xl hover:scale-[102%] transition-all duration-200 ${bgColor}`}
    >
      <TabsTrigger
        key={item.category.value}
        value={item.category.value}
        className="p-6 text-sm font-medium border-none w-80 h-52 flex flex-col items-start justify-between"
      >
        <div className="w-full">
          <p className="text-lg font-semibold mb-2">
            {toPascalCase(item.category.label)}
          </p>
          <Progress
            value={percentage}
            className="h-2 mb-2 [&>div]:bg-black/30"
          />
          <div className="flex justify-between text-xs">
            <span>Spent: ${spent.toFixed(2)}</span>
            <span>Budget: ${budget.toFixed(2)}</span>
          </div>
        </div>
        <div className="w-full text-right">
          <p className="text-2xl font-bold">{percentageLeft.toFixed(0)}%</p>
          <p className="text-xs">remaining in budget</p>
        </div>
      </TabsTrigger>
    </div>
  ) : null;
};

export default CategoryBox;
