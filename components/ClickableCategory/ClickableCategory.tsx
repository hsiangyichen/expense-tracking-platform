"use client";

import { useState } from "react";
import { toPascalCase } from "@/lib/utils";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { BudgetModal } from "@/components/BudgetModal";
import { CategoryTransactions } from "@/types";
import { transactionCategoriesWithIcon } from "@/constants";

interface ClickableCategoryProps {
  item: CategoryTransactions;
  budget: number;
}

const ClickableCategory = ({ item, budget }: ClickableCategoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryWithIcon = transactionCategoriesWithIcon.find(
    (cat) => cat.value === item.category.value
  );
  const IconComponent = categoryWithIcon?.icon;
  const amountSpent = Math.abs(item.totalAmount);

  return (
    <>
      <div
        className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-[#adc1c4] to-[#728f92] text-white">
            {IconComponent ? (
              <IconComponent size={16} />
            ) : (
              <span className="text-xs font-medium">icon</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {toPascalCase(item.category.label)}
            </span>
            <span className="text-xs text-gray-500">
              ${amountSpent.toFixed(2)} of ${budget.toFixed(2)}
            </span>
          </div>
        </div>
        <CategoryPieChart totalSpent={amountSpent} budget={budget} />
      </div>

      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={item.category}
        currentBudget={budget}
      />
    </>
  );
};

export default ClickableCategory;
