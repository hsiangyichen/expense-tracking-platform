import React from "react";
import {
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  Plane,
  Tag,
  DollarSign,
  Music,
  Receipt,
  User,
  HeartPulse,
  Banknote,
  Lightbulb,
  Landmark,
} from "lucide-react";
import { CategoryBadgeProps } from "./CategoryBadge.types";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  if (!category || category.length === 0) {
    return (
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <Tag className="w-3 h-3 mr-1" />
        Uncategorized
      </div>
    );
  }

  const primaryCategory = category[0];
  const categoryConfig = getCategoryConfig(primaryCategory);

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryConfig.bgClass} ${categoryConfig.textClass}`}
    >
      {categoryConfig.icon}
      <span className="ml-1 truncate max-w-32">{primaryCategory}</span>
    </div>
  );
};

const getCategoryConfig = (category: string) => {
  const categoryMap = {
    INCOME: {
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      icon: <DollarSign className="w-3 h-3" />,
    },
    LOAN_PAYMENTS: {
      bgClass: "bg-stone-200",
      textClass: "text-stone-800",
      icon: <Banknote className="w-3 h-3" />,
    },
    BANK_FEES: {
      bgClass: "bg-stone-100",
      textClass: "text-stone-800",
      icon: <Receipt className="w-3 h-3" />,
    },
    ENTERTAINMENT: {
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      icon: <Music className="w-3 h-3" />,
    },
    FOOD_AND_DRINK: {
      bgClass: "bg-orange-100",
      textClass: "text-orange-800",
      icon: <Utensils className="w-3 h-3" />,
    },
    GENERAL_MERCHANDISE: {
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      icon: <ShoppingCart className="w-3 h-3" />,
    },
    HOME_IMPROVEMENT: {
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      icon: <Home className="w-3 h-3" />,
    },
    MEDICAL: {
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      icon: <HeartPulse className="w-3 h-3" />,
    },
    PERSONAL_CARE: {
      bgClass: "bg-purple-100",
      textClass: "text-purple-800",
      icon: <User className="w-3 h-3" />,
    },
    GENERAL_SERVICES: {
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      icon: <Briefcase className="w-3 h-3" />,
    },
    GOVERNMENT_AND_NON_PROFIT: {
      bgClass: "bg-cyan-100",
      textClass: "text-cyan-800",
      icon: <Landmark className="w-3 h-3" />,
    },
    TRANSPORTATION: {
      bgClass: "bg-sky-100",
      textClass: "text-sky-800",
      icon: <Car className="w-3 h-3" />,
    },
    TRAVEL: {
      bgClass: "bg-violet-100",
      textClass: "text-indigo-900",
      icon: <Plane className="w-3 h-3" />,
    },
    RENT_AND_UTILITIES: {
      bgClass: "bg-violet-100",
      textClass: "text-violet-800",
      icon: <Lightbulb className="w-3 h-3" />,
    },
  };

  for (const [key, config] of Object.entries(categoryMap)) {
    if (category.includes(key)) {
      return config;
    }
  }

  // Default styling for unknown categories
  return {
    bgClass: "bg-gray-100",
    textClass: "text-gray-800",
    icon: <Tag className="w-3 h-3" />,
  };
};

export default CategoryBadge;
