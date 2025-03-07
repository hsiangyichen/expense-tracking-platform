"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import type { CategoryBoxProps } from "./CategoryBox.types";
import { toPascalCase } from "@/lib/utils";
import { transactionCategoriesWithIcon } from "@/constants"; // Import the array with icons

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

const categoryGradients: { [key: string]: string } = {
  INCOME:
    "bg-gradient-to-br from-[#c7e6d2] from-10% via-[#c7e6d2] via-40% to-green-100 to-90%",
  "LOAN PAYMENTS":
    "bg-gradient-to-br from-stone-200 from-10% via-stone-200 via-40% to-stone-100 to-90%",
  "BANK FEES":
    "bg-gradient-to-br from-stone-200 from-10% via-stone-200 via-40% to-stone-100 to-90%",
  ENTERTAINMENT:
    "bg-gradient-to-br from-[#c7e6d2] from-10% via-[#c7e6d2] via-40% to-green-100 to-90%",
  "FOOD AND DRINK":
    "bg-gradient-to-br from-[#f4dcc0] from-10% via-[#f4dcc0] via-40% to-orange-100 to-90%",
  "GENERAL MERCHANDISE":
    "bg-gradient-to-br from-[#f4e0e4] from-10% via-[#f4e0e4] via-40% to-red-100 to-90%",
  "HOME IMPROVEMENT": "bg-blue-100",
  MEDICAL: "bg-red-100",
  "PERSONAL CARE":
    "bg-gradient-to-br from-purple-200 from-10% via-purple-200 via-40% to-purple-100 to-90%",
  "GENERAL SERVICES":
    "bg-gradient-to-br from-cyan-200 from-10% via-cyan-200 via-40% to-cyan-100 to-90%",
  "GOVERNMENT AND NON PROFIT":
    "bg-gradient-to-br from-stone-200 from-10% via-stone-200 via-40% to-stone-100 to-90%",
  TRANSPORTATION:
    "bg-gradient-to-br from-[#d3e3ed] from-10% via-[#d3e3ed] via-40% to-sky-100 to-90%",
  TRAVEL:
    "bg-gradient-to-br from-violet-200 from-10% via-violet-200 via-40% to-violet-100 to-90%",
  "RENT AND UTILITIES":
    "bg-gradient-to-br from-violet-200 from-10% via-violet-200 via-40% to-violet-100 to-90%",
};

const CategoryBox = ({ item }: CategoryBoxProps) => {
  const bgColor =
    categoryGradients[item.category.label.toUpperCase()] ||
    "bg-gradient-to-br from-stone-200 from-10% via-stone-200 via-40% to-stone-100 to-90%";
  const budget = mockBudgetData[item.category.label.toUpperCase()] || 0;
  const spent = item.totalAmount;
  const percentage = budget > 0 ? (spent / budget) * 50 : 0;
  const percentageLeft = 100 - percentage;

  // Find matching icon
  const categoryWithIcon = transactionCategoriesWithIcon.find(
    (cat) => cat.value === item.category.value
  );
  const IconComponent = categoryWithIcon?.icon;

  return spent > 0 ? (
    <div
      className={`rounded-2xl hover:scale-[102%] transition-all duration-200 shadow-sm bg-gradient-to-br ${bgColor} `}
    >
      <TabsTrigger
        key={item.category.value}
        value={item.category.value}
        className="p-6 text-sm font-medium border-none w-80 h-52 flex flex-col items-start justify-between"
      >
        <div className="w-full flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black">
            {IconComponent ? <IconComponent size={18} /> : <span></span>}
          </div>
          <p className="text-lg font-semibold">
            {toPascalCase(item.category.label)}
          </p>
        </div>

        <Progress
          value={percentage}
          className="h-2 mb-2 [&>div]:bg-stone-800/20"
        />
        <div className="flex justify-between w-full text-xs">
          <span>Spent: ${spent.toFixed(2)}</span>
          <span>Budget: ${budget.toFixed(2)}</span>
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
