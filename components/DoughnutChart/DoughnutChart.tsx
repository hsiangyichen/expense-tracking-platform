"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChartProps } from "./DoughnutChart.types";
import { colorPalette } from "@/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const dataValues = accounts.map((account) => account.balanceCurrent);
  const dataLabels = accounts.map(
    (account) => `${account.institutionName} - ${account.name}`
  );

  const colors = accounts.map(
    (_, index) => colorPalette[index % colorPalette.length]
  );

  const data = {
    datasets: [
      {
        label: "Bank Accounts",
        data: dataValues,
        backgroundColor: colors,
      },
    ],
    labels: dataLabels,
  };

  const fallbackData = {
    datasets: [
      {
        label: "No Accounts",
        data: [100],
        backgroundColor: ["#e0e0e0"],
      },
    ],
    labels: ["No linked accounts"],
  };

  return (
    <Doughnut
      data={accounts.length > 0 ? data : fallbackData}
      options={{ cutout: "60%", plugins: { legend: { display: false } } }}
    />
  );
};

export default DoughnutChart;
