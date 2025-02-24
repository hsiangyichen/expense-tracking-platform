import React, { JSX } from "react";
import {
  ShoppingCart,
  CreditCard,
  Home,
  Car,
  Utensils,
  Briefcase,
  Smartphone,
  Scissors,
  Dumbbell,
  Plane,
  Heart,
  Tag,
  DollarSign,
  Building,
  Music,
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
  const normalizedCategory = category.toLowerCase();
  const categoryMap: Record<
    string,
    {
      bgClass: string;
      textClass: string;
      icon: JSX.Element;
    }
  > = {
    income: {
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      icon: <DollarSign className="w-3 h-3" />,
    },
    loan_payments: {
      bgClass: "bg-sky-100",
      textClass: "text-sky-800",
      icon: <Building className="w-3 h-3" />,
    },
    shopping: {
      bgClass: "bg-indigo-100",
      textClass: "text-indigo-800",
      icon: <ShoppingCart className="w-3 h-3" />,
    },
    food: {
      bgClass: "bg-orange-100",
      textClass: "text-orange-800",
      icon: <Utensils className="w-3 h-3" />,
    },
    merchandise: {
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      icon: <Utensils className="w-3 h-3" />,
    },
    groceries: {
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      icon: <ShoppingCart className="w-3 h-3" />,
    },
    housing: {
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      icon: <Home className="w-3 h-3" />,
    },
    rent: {
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      icon: <Home className="w-3 h-3" />,
    },
    mortgage: {
      bgClass: "bg-blue-100",
      textClass: "text-blue-800",
      icon: <Home className="w-3 h-3" />,
    },
    transport: {
      bgClass: "bg-sky-100",
      textClass: "text-sky-800",
      icon: <Car className="w-3 h-3" />,
    },
    "gas & fuel": {
      bgClass: "bg-cyan-100",
      textClass: "text-cyan-800",
      icon: <Car className="w-3 h-3" />,
    },
    utilities: {
      bgClass: "bg-violet-100",
      textClass: "text-violet-800",
      icon: <Home className="w-3 h-3" />,
    },
    bills: {
      bgClass: "bg-pink-100",
      textClass: "text-pink-800",
      icon: <CreditCard className="w-3 h-3" />,
    },
    entertainment: {
      bgClass: "bg-green-100",
      textClass: "text-green-800",
      icon: <Music className="w-3 h-3" />,
    },
    salary: {
      bgClass: "bg-emerald-100",
      textClass: "text-emerald-800",
      icon: <Briefcase className="w-3 h-3" />,
    },
    technology: {
      bgClass: "bg-gray-100",
      textClass: "text-gray-800",
      icon: <Smartphone className="w-3 h-3" />,
    },
    personal: {
      bgClass: "bg-purple-100",
      textClass: "text-purple-800",
      icon: <Scissors className="w-3 h-3" />,
    },
    health: {
      bgClass: "bg-red-100",
      textClass: "text-red-800",
      icon: <Heart className="w-3 h-3" />,
    },
    fitness: {
      bgClass: "bg-lime-100",
      textClass: "text-lime-800",
      icon: <Dumbbell className="w-3 h-3" />,
    },
    travel: {
      bgClass: "bg-violet-100",
      textClass: "text-indigo-900",
      icon: <Plane className="w-3 h-3" />,
    },
  };

  for (const [key, config] of Object.entries(categoryMap)) {
    if (normalizedCategory.includes(key)) {
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
