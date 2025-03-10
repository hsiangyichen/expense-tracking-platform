"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
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
import { CategoryListProps } from "./CategoryList.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  icon: <ChevronRight className="w-3 h-3" />,
};

const CategoryList = ({ categorizedTransactions }: CategoryListProps) => {
  const topCategories = [...categorizedTransactions.categories].sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  const getCategoryStyle = (name: string) => {
    const normalizedName = name.toUpperCase().replace(/\s+/g, "_");
    return (
      categoryStyles[normalizedName as keyof typeof categoryStyles] ||
      defaultCategoryStyle
    );
  };

  const getCategorySlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-");

  const prepareMonthlyCategoryData = () => {
    const topChartCategories = [...categorizedTransactions.categories];
    const allTransactions = topChartCategories.flatMap((cat) =>
      cat.transactions.map((t) => ({ ...t, categoryName: cat.name }))
    );

    const monthlyDataMap = allTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthName = date.toLocaleString("default", { month: "short" });
      const displayLabel = `${monthName} ${date.getFullYear()}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { label: displayLabel, categoryAmounts: {} };
      }
      if (!acc[monthYear].categoryAmounts[transaction.categoryName]) {
        acc[monthYear].categoryAmounts[transaction.categoryName] = 0;
      }
      acc[monthYear].categoryAmounts[transaction.categoryName] +=
        transaction.amount;

      return acc;
    }, {} as Record<string, { label: string; categoryAmounts: Record<string, number> }>);

    const sortedMonths = Object.keys(monthlyDataMap).sort();
    const labels = sortedMonths.map((month) => monthlyDataMap[month].label);

    const datasets = topChartCategories.map((category) => ({
      label: category.name,
      data: sortedMonths.map(
        (month) => monthlyDataMap[month].categoryAmounts[category.name] || 0
      ),
      backgroundColor: getCategoryStyle(category.name).chartColor,
      barPercentage: 0.4,
      categoryPercentage: 0.6,
      borderRadius: 2,
    }));

    return { labels, datasets };
  };

  const chartData = prepareMonthlyCategoryData();

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: "Month" },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { callback: (value) => `$${value}` },
        title: { display: true, text: "Amount ($)" },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`,
          footer: (tooltipItems) => {
            const total = tooltipItems.reduce(
              (sum, item) => sum + item.parsed.y,
              0
            );
            return `Total: ${formatCurrency(total)}`;
          },
        },
      },
      legend: {
        position: "top",
        labels: { boxWidth: 12, usePointStyle: true },
      },
    },
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="border-stone-200 shadow-sm mb-6">
        <CardHeader>
          <CardTitle>
            Total Spent: {formatCurrency(categorizedTransactions.totalSpent)}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-48 mb-6 overflow-auto">
          <div>
            {topCategories.map((category) => {
              const style = getCategoryStyle(category.name);
              return (
                <Link
                  href={`/budget-and-categories/${getCategorySlug(
                    category.name
                  )}`}
                  key={category.name}
                >
                  <div className="space-y-2 hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer transition-colors">
                    <div className="flex justify-between text-sm">
                      <div className="font-medium flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full ${style.bgClass} ${style.textClass} flex items-center justify-center mr-2`}
                        >
                          {style.icon}
                        </div>
                        {category.name}
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-right">
                          {category.percentage.toFixed(1)}%
                        </span>
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <Progress
                        value={category.percentage}
                        className="inline-block [&>div]:bg-stone-800/20 flex-1"
                      />
                      <span className="text-xs text-right">
                        Total Spending: {formatCurrency(category.totalAmount)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card className="border-stone-200 shadow-sm flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="self-center md:self-start">
            Monthly Spending for Top 5 Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <div className="h-full w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryList;
