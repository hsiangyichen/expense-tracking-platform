"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from "chart.js";
import { SidebarPieChartProps } from "./SidebarPieChart.types";
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
  ChevronRight,
} from "lucide-react";

ChartJS.register(ArcElement, Tooltip);

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

interface ExtendedSidebarPieChartProps extends SidebarPieChartProps {
  originalCategoryName?: string;
}

const SidebarPieChart = ({
  categoryName,
  totalAmount,
  percentage,
  count,
  originalCategoryName,
}: ExtendedSidebarPieChartProps) => {
  const getCategoryStyle = (name: string) => {
    const normalizedName = name.toUpperCase().replace(/\s+/g, "_");
    return (
      categoryStyles[normalizedName as keyof typeof categoryStyles] ||
      defaultCategoryStyle
    );
  };

  const categoryKey = originalCategoryName || categoryName;
  const style = getCategoryStyle(categoryKey);
  const bgColor = "rgba(229, 231, 235, 0.5)";

  const chartData = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [style.chartColor, bgColor],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataIndex === 0) {
              return `${categoryName}: ${percentage.toFixed(1)}%`;
            }
            return "";
          },
        },
        enabled: true,
      },
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  return (
    <div className="flex items-center gap-4 py-3 rounded-lg hover:bg-stone-50 transition-colors">
      <div className="h-[54px] w-[54px] relative">
        <Pie data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium">{percentage.toFixed(0)}%</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-5 h-5 rounded-full ${style.bgClass} flex items-center justify-center`}
            >
              {style.icon}
            </div>
            <h3 className="font-medium text-[13px] truncate">{categoryName}</h3>
          </div>
          {/* <ChevronRight className="h-4 w-4 text-stone-400" /> */}
          <span className="font-medium text-[13px]">
            {formatCurrency(totalAmount)}
          </span>
        </div>
        <p className="text-xs text-stone-500">
          {count} transaction{count !== 1 ? "s" : ""}{" "}
        </p>
      </div>
    </div>
  );
};

export default SidebarPieChart;
