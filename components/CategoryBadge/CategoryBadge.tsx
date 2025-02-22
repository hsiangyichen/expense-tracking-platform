import React from "react";
import { Tag } from "lucide-react";
import { CategoryBadgeProps } from "./CategoryBadge.types";
import { getCategoryConfig, defaultCategoryConfig } from "@/constants";

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
  const categoryConfig =
    getCategoryConfig(primaryCategory) || defaultCategoryConfig;

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryConfig.bgClass} ${categoryConfig.textClass}`}
    >
      {React.createElement(categoryConfig.icon, { className: "w-3 h-3" })}
      <span className="ml-1 truncate max-w-32">{primaryCategory}</span>
    </div>
  );
};

export default CategoryBadge;
