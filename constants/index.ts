import {
  Home,
  Wallet2,
  Receipt,
  PieChart,
  ShoppingCart,
  Coffee,
  CreditCard,
  Car,
  Utensils,
  Briefcase,
  Smartphone,
  Scissors,
  Dumbbell,
  Plane,
  GraduationCap,
  Heart,
  Tag,
  DollarSign,
  Building,
} from "lucide-react";

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

/* ------------------------------ Category Map ------------------------------ */
export const defaultCategoryConfig = {
  bgClass: "bg-gray-100",
  textClass: "text-gray-800",
  icon: Tag,
};

export const categoryMap = {
  income: {
    bgClass: "bg-green-100",
    textClass: "text-green-800",
    icon: DollarSign,
  },
  loan_payments: {
    bgClass: "bg-slate-100",
    textClass: "text-slate-800",
    icon: Building,
  },
  shopping: {
    bgClass: "bg-indigo-100",
    textClass: "text-indigo-800",
    icon: ShoppingCart,
  },
  food: {
    bgClass: "bg-orange-100",
    textClass: "text-orange-800",
    icon: Utensils,
  },
  "food & drink": {
    bgClass: "bg-orange-100",
    textClass: "text-orange-800",
    icon: Coffee,
  },
  coffee: {
    bgClass: "bg-amber-100",
    textClass: "text-amber-800",
    icon: Coffee,
  },
  groceries: {
    bgClass: "bg-green-100",
    textClass: "text-green-800",
    icon: ShoppingCart,
  },
  housing: {
    bgClass: "bg-blue-100",
    textClass: "text-blue-800",
    icon: Home,
  },
  rent: {
    bgClass: "bg-blue-100",
    textClass: "text-blue-800",
    icon: Home,
  },
  mortgage: {
    bgClass: "bg-blue-100",
    textClass: "text-blue-800",
    icon: Home,
  },
  transport: {
    bgClass: "bg-cyan-100",
    textClass: "text-cyan-800",
    icon: Car,
  },
  transportation: {
    bgClass: "bg-cyan-100",
    textClass: "text-cyan-800",
    icon: Car,
  },
  "gas & fuel": {
    bgClass: "bg-cyan-100",
    textClass: "text-cyan-800",
    icon: Car,
  },
  utilities: {
    bgClass: "bg-violet-100",
    textClass: "text-violet-800",
    icon: Home,
  },
  bills: {
    bgClass: "bg-pink-100",
    textClass: "text-pink-800",
    icon: CreditCard,
  },
  work: {
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-800",
    icon: Briefcase,
  },
  salary: {
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-800",
    icon: Briefcase,
  },
  technology: {
    bgClass: "bg-gray-100",
    textClass: "text-gray-800",
    icon: Smartphone,
  },
  personal: {
    bgClass: "bg-purple-100",
    textClass: "text-purple-800",
    icon: Scissors,
  },
  health: {
    bgClass: "bg-red-100",
    textClass: "text-red-800",
    icon: Heart,
  },
  fitness: {
    bgClass: "bg-lime-100",
    textClass: "text-lime-800",
    icon: Dumbbell,
  },
  travel: {
    bgClass: "bg-sky-100",
    textClass: "text-sky-800",
    icon: Plane,
  },
  education: {
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-800",
    icon: GraduationCap,
  },
};

export const getCategoryConfig = (category: string) => {
  const normalizedCategory = category.toLowerCase();

  for (const [key, config] of Object.entries(categoryMap)) {
    if (normalizedCategory.includes(key)) {
      return config;
    }
  }

  return defaultCategoryConfig;
};
