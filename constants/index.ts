import { Home, Wallet2, Receipt, PieChart } from "lucide-react";

/* ------------------------------ Sidebar Links ----------------------------- */
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
  "#FFE4E6",
  "#FDA4AF",
  "#F7CFCC",
  "#F2C2CE",
  "#D7C0DC",
  "#F2D3DD",
  "#EFD2ED",
  "#F6BEBE",
];
