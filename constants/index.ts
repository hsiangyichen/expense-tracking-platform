import { Home, Receipt, PieChart } from "lucide-react";

/* ------------------------------ Sidebar Links ----------------------------- */
export const sidebarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: Receipt,
    route: "/transaction-history",
    label: "Transaction History",
    requiresAccountId: true,
  },
  {
    icon: PieChart,
    route: "/budget-and-categories",
    label: "Budget & Categories",
  },
];

/* ------------------------------ Color Palette ----------------------------- */
export const colorPalette = [
  "#051537",
  "#04247C",
  "#003D7A",
  "#0458AB",
  "#145DA0",
  "#60A3D9",
  "#BFD7ED",
  "#003B73",
];

/* ------------------------------ Transaction Categories ----------------------------- */
export const transactionCategories = [
  {
    label: "INCOME",
    value: "INCOME",
  },
  {
    label: "TRANSFER IN",
    value: "TRANSFER_IN",
  },
  {
    label: "TRANSFER OUT",
    value: "TRANSFER_OUT",
  },
  {
    label: "LOAN PAYMENTS",
    value: "LOAN_PAYMENTS",
  },
  {
    label: "BANK FEES",
    value: "BANK_FEES",
  },
  {
    label: "ENTERTAINMENT",
    value: "ENTERTAINMENT",
  },
  {
    label: "FOOD AND DRINK",
    value: "FOOD_AND_DRINK",
  },
  {
    label: "GENERAL MERCHANDISE",
    value: "GENERAL_MERCHANDISE",
  },
  {
    label: "HOME IMPROVEMENT",
    value: "HOME_IMPROVEMENT",
  },
  {
    label: "MEDICAL",
    value: "MEDICAL",
  },
  {
    label: "PERSONAL CARE",
    value: "PERSONAL_CARE",
  },
  {
    label: "GENERAL SERVICES",
    value: "GENERAL_SERVICES",
  },
  {
    label: "GOVERNMENT AND NON PROFIT",
    value: "GOVERNMENT_AND_NON_PROFIT",
  },
  {
    label: "TRANSPORTATION",
    value: "TRANSPORTATION",
  },
  {
    label: "TRAVEL",
    value: "TRAVEL",
  },
  {
    label: "RENT AND UTILITIES",
    value: "RENT_AND_UTILITIES",
  },
];

export const categoryBudgets: { [key: string]: number } = {
  INCOME: 5000,
  "TRANSFER IN": 2000,
  "TRANSFER OUT": 2000,
  "LOAN PAYMENTS": 1000,
  "BANK FEES": 50,
  ENTERTAINMENT: 300,
  "FOOD AND DRINK": 500,
  "GENERAL MERCHANDISE": 400,
  "HOME IMPROVEMENT": 300,
  MEDICAL: 200,
  "PERSONAL CARE": 150,
  "GENERAL SERVICES": 200,
  "GOVERNMENT AND NON PROFIT": 100,
  TRANSPORTATION: 300,
  TRAVEL: 500,
  "RENT AND UTILITIES": 1500,
};
