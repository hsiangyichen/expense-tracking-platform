import { Home, Wallet2, Receipt, PieChart } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: Wallet2,
    route: "/banks-and-cards",
    label: "My Banks & Cards",
  },
  {
    icon: Receipt,
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    icon: PieChart,
    route: "/budget-and-categories",
    label: "Budget & Categories",
  },
];

export const colorPalette = [
  "#FFE1E8",
  "#F8D1E3",
  "#E9D5F0",
  "#DBC4E6",
  "#FFB1C8",
  "#F394B6",
  "#E5C1E5",
  "#D4B7DD",
];
