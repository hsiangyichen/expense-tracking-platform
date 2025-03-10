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

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ totalSpent, budget }: CategoryPieChartProps) => {
  const remaining = budget > totalSpent ? budget - totalSpent : 0;
  const overBudget =
    totalSpent > budget && budget > 0 ? totalSpent - budget : 0;

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
          "#75aca8",
          overBudget > 0
            ? "rgba(239, 68, 68, 0.8)"
            : "rgba(140, 140, 135, 0.7)",
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
    cutout: "60%",
  };

  const noBudgetSet = budget <= 0;

  return (
    <>
      <div className="h-48 w-1/2 relative border-r-[1.5px] border-stone-200">
        <Pie data={chartData} options={chartOptions} />
        <div className="absolute -top-8 inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold">
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
          <div className="w-1/2 pl-6">
            <div className="flex justify-between text-xl font-bold">
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
                <span className="text-[#4c888b]">Remaining:</span>
                <span className="font-medium text-[#4c888b]">
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
