import {
  Home,
  Receipt,
  PieChart,
  DollarSign,
  // Wallet2,
  Repeat,
  ArrowUpRight,
  Banknote,
  Music,
  Utensils,
  ShoppingCart,
  HeartPulse,
  User,
  Briefcase,
  Landmark,
  Car,
  Plane,
  Lightbulb,
} from "lucide-react";

/* ------------------------------ Sidebar Links ----------------------------- */
export const sidebarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  // {
  //   icon: Wallet2,
  //   route: "/banks-and-cards",
  //   label: "My Banks & Cards",
  // },
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
export const colorPalette = ["#75aca8", "#b1d2c8", "#cbe4de", "#4c888b"];

/* ------------------------------ Transaction Categories ----------------------------- */
export const transactionCategories = [
  {
    label: "Income",
    value: "INCOME",
  },
  {
    label: "Transfer In",
    value: "TRANSFER_IN",
  },
  {
    label: "Transfer Out",
    value: "TRANSFER_OUT",
  },
  {
    label: "Loan Payments",
    value: "LOAN_PAYMENTS",
  },
  {
    label: "Bank Fees",
    value: "BANK_FEES",
  },
  {
    label: "Entertainment",
    value: "ENTERTAINMENT",
  },
  {
    label: "Food And Drink",
    value: "FOOD_AND_DRINK",
  },
  {
    label: "General Merchandise",
    value: "GENERAL_MERCHANDISE",
  },
  {
    label: "Home Improvement",
    value: "HOME_IMPROVEMENT",
  },
  {
    label: "Medical",
    value: "MEDICAL",
  },
  {
    label: "Personal Care",
    value: "PERSONAL_CARE",
  },
  {
    label: "General Services",
    value: "GENERAL_SERVICES",
  },
  {
    label: "Government And Non Profit",
    value: "GOVERNMENT_AND_NON_PROFIT",
  },
  {
    label: "Transportation",
    value: "TRANSPORTATION",
  },
  {
    label: "Travel",
    value: "TRAVEL",
  },
  {
    label: "Rent And Utilities",
    value: "RENT_AND_UTILITIES",
  },
];

export const transactionCategoriesWithIcon = [
  {
    icon: DollarSign,
    label: "INCOME",
    value: "INCOME",
  },
  {
    icon: Repeat,
    label: "TRANSFER IN",
    value: "TRANSFER_IN",
  },
  {
    icon: ArrowUpRight,
    label: "TRANSFER OUT",
    value: "TRANSFER_OUT",
  },
  {
    icon: Banknote,
    label: "LOAN PAYMENTS",
    value: "LOAN_PAYMENTS",
  },
  {
    icon: Receipt,
    label: "BANK FEES",
    value: "BANK_FEES",
  },
  {
    icon: Music,
    label: "ENTERTAINMENT",
    value: "ENTERTAINMENT",
  },
  {
    icon: Utensils,
    label: "FOOD AND DRINK",
    value: "FOOD_AND_DRINK",
  },
  {
    icon: ShoppingCart,
    label: "GENERAL MERCHANDISE",
    value: "GENERAL_MERCHANDISE",
  },
  {
    icon: Home,
    label: "HOME IMPROVEMENT",
    value: "HOME_IMPROVEMENT",
  },
  {
    icon: HeartPulse,
    label: "MEDICAL",
    value: "MEDICAL",
  },
  {
    icon: User,
    label: "PERSONAL CARE",
    value: "PERSONAL_CARE",
  },
  {
    icon: Briefcase,
    label: "GENERAL SERVICES",
    value: "GENERAL_SERVICES",
  },
  {
    icon: Landmark,
    label: "GOVERNMENT AND NON PROFIT",
    value: "GOVERNMENT_AND_NON_PROFIT",
  },
  {
    icon: Car,
    label: "TRANSPORTATION",
    value: "TRANSPORTATION",
  },
  {
    icon: Plane,
    label: "TRAVEL",
    value: "TRAVEL",
  },
  {
    icon: Lightbulb,
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
