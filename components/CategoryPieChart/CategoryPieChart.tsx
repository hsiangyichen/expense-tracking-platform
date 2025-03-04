"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

interface CategoryPieChartProps {
  totalSpent: number;
  budget: number;
}

const CategoryPieChart = ({ totalSpent, budget }: CategoryPieChartProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const spentPercentage = Math.min((totalSpent / budget) * 100, 100);
  const remainingPercentage = 100 - spentPercentage;

  const data = [
    { name: "Spent", value: spentPercentage },
    { name: "Remaining", value: remainingPercentage },
  ];

  const COLORS = ["#adc1c4", "#e7e4de"];

  if (!isClient) {
    return <></>;
  }

  return (
    <div className="relative w-12 h-12">
      <PieChart width={48} height={48}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={16}
          outerRadius={24}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {Math.round(spentPercentage)}%
      </div>
    </div>
  );
};

export default CategoryPieChart;
