"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChartProps } from "./DoughnutChart.types";
import { colorPalette } from "@/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const dataValues = accounts.map((account) => account.balanceCurrent);
  const dataLabels = accounts.map(
    (account) => `${account.subtype} - ${account.mask}`
  );

  const colors = accounts.map(
    (_, index) => colorPalette[index % colorPalette.length]
  );

  const data = {
    datasets: [
      {
        label: "Balance",
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
      options={{
        cutout: "60%",
        plugins: {
          legend: { display: false },
          tooltip: {
            titleFont: {
              size: 11,
            },
            bodyFont: {
              size: 11,
            },
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || "";
                const value = context.parsed;
                return ` ${label}: $${value}`;
              },
            },
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
