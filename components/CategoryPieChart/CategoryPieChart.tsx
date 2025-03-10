"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { CategoryPieChartProps } from "./CategoryPieChart.types";
import {
  DollarSign,
  Banknote,
  Receipt,
  Music,
  Utensils,
  ShoppingCart,
  Home,
  HeartPulse,
  User,
  Briefcase,
  Landmark,
  Car,
  Plane,
  Lightbulb,
} from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryStyles = {
  INCOME: {
    bgClass: "bg-green-100",
    textClass: "text-green-800",
    chartColor: "rgba(94, 207, 124, 0.7)",
    icon: <DollarSign className="w-3 h-3" />,
  },
  LOAN_PAYMENTS: {
    bgClass: "bg-stone-200",
    textClass: "text-stone-800",
    chartColor: "rgba(140, 140, 135, 0.7)",
    icon: <Banknote className="w-3 h-3" />,
  },
  BANK_FEES: {
    bgClass: "bg-stone-100",
    textClass: "text-stone-800",
    chartColor: "rgba(130, 126, 120, 0.7)",
    icon: <Receipt className="w-3 h-3" />,
  },
  ENTERTAINMENT: {
    bgClass: "bg-green-100",
    textClass: "text-green-800",
    chartColor: "rgba(92, 183, 114, 0.7)",
    icon: <Music className="w-3 h-3" />,
  },
  FOOD_AND_DRINK: {
    bgClass: "bg-orange-100",
    textClass: "text-orange-800",
    chartColor: "rgba(249, 165, 82, 0.7)",
    icon: <Utensils className="w-3 h-3" />,
  },
  GENERAL_MERCHANDISE: {
    bgClass: "bg-red-100",
    textClass: "text-red-800",
    chartColor: "rgba(259, 138, 138, 0.7)",
    icon: <ShoppingCart className="w-3 h-3" />,
  },
  HOME_IMPROVEMENT: {
    bgClass: "bg-blue-100",
    textClass: "text-blue-800",
    chartColor: "rgba(109, 160, 246, 0.7)",
    icon: <Home className="w-3 h-3" />,
  },
  MEDICAL: {
    bgClass: "bg-red-100",
    textClass: "text-red-800",
    chartColor: "rgba(240, 98, 98, 0.7)",
    icon: <HeartPulse className="w-3 h-3" />,
  },
  PERSONAL_CARE: {
    bgClass: "bg-purple-100",
    textClass: "text-purple-800",
    chartColor: "rgba(188, 125, 247, 0.7)",
    icon: <User className="w-3 h-3" />,
  },
  GENERAL_SERVICES: {
    bgClass: "bg-green-100",
    textClass: "text-green-800",
    chartColor: "rgba(66, 205, 159, 0.7)",
    icon: <Briefcase className="w-3 h-3" />,
  },
  GOVERNMENT_AND_NON_PROFIT: {
    bgClass: "bg-cyan-100",
    textClass: "text-cyan-800",
    chartColor: "rgba(76, 212, 242, 0.7)",
    icon: <Landmark className="w-3 h-3" />,
  },
  TRANSPORTATION: {
    bgClass: "bg-sky-100",
    textClass: "text-sky-800",
    chartColor: "rgba(124, 205, 253, 0.7)",
    icon: <Car className="w-3 h-3" />,
  },
  TRAVEL: {
    bgClass: "bg-violet-100",
    textClass: "text-indigo-900",
    chartColor: "rgba(154, 108, 247, 0.7)",
    icon: <Plane className="w-3 h-3" />,
  },
  RENT_AND_UTILITIES: {
    bgClass: "bg-violet-100",
    textClass: "text-violet-800",
    chartColor: "rgba(169, 122, 246, 0.7)",
    icon: <Lightbulb className="w-3 h-3" />,
  },
};

const defaultCategoryStyle = {
  bgClass: "bg-gray-100",
  textClass: "text-gray-800",
  chartColor: "rgba(156, 163, 175, 0.7)",
  textColor: "text-gray-800",
};

const CategoryPieChart = ({
  totalSpent,
  budget,
  categoryName,
}: CategoryPieChartProps) => {
  const remaining = budget > totalSpent ? budget - totalSpent : 0;
  const overBudget =
    totalSpent > budget && budget > 0 ? totalSpent - budget : 0;

  const getCategoryStyle = (name: string) => {
    const normalizedName = name.toUpperCase().replace(/\s+/g, "_");
    return (
      categoryStyles[normalizedName as keyof typeof categoryStyles] ||
      defaultCategoryStyle
    );
  };

  const style = getCategoryStyle(categoryName);

  const textColorClass = style.textClass || "text-stone-800";

  const chartData = {
    labels:
      budget > 0
        ? ["Spent", overBudget > 0 ? "Over Budget" : "Remaining"]
        : ["Spent"],
    datasets: [
      {
        data:
          budget > 0
            ? [
                totalSpent > budget ? budget : totalSpent,
                overBudget > 0 ? overBudget : remaining,
              ]
            : [totalSpent],
        backgroundColor: [
          style.chartColor,
          overBudget > 0
            ? "#ef4444" // Keep red for over budget
            : "rgba(140, 140, 135, 0.7)", // Gray for remaining
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw as number;
            const percentage =
              budget > 0 ? ((value / budget) * 100).toFixed(1) + "%" : "";

            return `${label}: ${formatCurrency(value)} ${percentage}`;
          },
        },
      },
    },
    cutout: "65%",
  };

  const noBudgetSet = budget <= 0;

  return (
    <>
      <div className="h-44 w-1/2 relative border-r-[1.5px] border-stone-200">
        <Pie data={chartData} options={chartOptions} />
        <div className="absolute -top-16 md:-top-8 inset-0 flex flex-col items-center justify-center text-center">
          <span className="md:text-xl font-bold">
            {formatCurrency(totalSpent)}
          </span>
          <span className="text-xs text-muted-foreground">
            {budget > 0 ? `of ${formatCurrency(budget)}` : "Total Spent"}
          </span>
        </div>
      </div>

      {noBudgetSet && (
        <div className="w-full text-center text-sm">
          No budget set for this category
        </div>
      )}

      {!noBudgetSet && (
        <>
          <div className="w-1/2 pl-4 md:pl-6">
            <div className="flex justify-between md:text-xl font-bold">
              <span>Budget:</span>
              <span>{formatCurrency(budget)}</span>
            </div>

            {overBudget > 0 ? (
              <div className="flex justify-between text-sm">
                <span className="text-red-500">Over budget by:</span>
                <span className="font-medium text-red-500">
                  {formatCurrency(overBudget)}
                </span>
              </div>
            ) : (
              <div className="flex justify-between text-sm">
                <span className={textColorClass}>Remaining:</span>
                <span className={`font-medium ${textColorClass}`}>
                  {formatCurrency(remaining)}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CategoryPieChart;
