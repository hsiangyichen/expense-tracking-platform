"use client";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { TrendingUp, TrendingDown } from "lucide-react";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip);

export interface CategoryDoughnutProps {
  spent: number;
  budget: number;
  isIncome?: boolean;
}
const CategoryPieChart = ({
  spent,
  budget,
  isIncome = false,
}: CategoryDoughnutProps) => {
  // Calculate percentage of budget spent
  const percentage = Math.min(100, Math.max(0, (spent / budget) * 100));
  const remaining = 100 - percentage;

  // Determine chart colors based on category type and percentage
  const getChartColors = () => {
    if (isIncome) {
      return ["#10B981", "#E5E7EB"]; // Green for income
    } else if (percentage > 75) {
      return ["#EF4444", "#E5E7EB"]; // Red when over 75% of budget
    } else {
      return ["#3B82F6", "#E5E7EB"]; // Blue for normal spending
    }
  };

  const chartData = {
    datasets: [
      {
        data: [percentage, remaining > 0 ? remaining : 0],
        backgroundColor: getChartColors(),
        borderWidth: 0,
        hoverOffset: 2,
      },
    ],
    labels: ["Spent", "Remaining"],
  };

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem: { label: string; raw: unknown }) => {
            const label = tooltipItem.label || "";
            const value =
              typeof tooltipItem.raw === "number" ? tooltipItem.raw : 0;
            return `${label}: ${value.toFixed(0)}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="flex flex-col items-end w-24">
      <div className="flex items-center mb-1 text-xs">
        <span className="mr-1">${spent.toFixed(0)}</span>
        {isIncome ? (
          <TrendingUp className="w-3 h-3 text-green-600" />
        ) : percentage > 75 ? (
          <TrendingDown className="w-3 h-3 text-red-600" />
        ) : (
          <TrendingUp className="w-3 h-3 text-blue-600" />
        )}
      </div>

      <div className="h-12 w-12">
        <Doughnut data={chartData} options={options} />
      </div>

      <div className="text-xs text-gray-500 mt-1 text-center w-full">
        {percentage.toFixed(0)}% of budget
      </div>
    </div>
  );
};

export default CategoryPieChart;
