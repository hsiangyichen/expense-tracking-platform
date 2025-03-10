"use client";

import React, { Fragment, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateBudget } from "@/lib/actions/budget.action";
import { BudgetModalProps } from "./BudgetModal.types";
import { PencilLine, Plus } from "lucide-react";
import { toPascalCase } from "@/lib/utils";

const BudgetModal = ({ categoryName, currentBudget }: BudgetModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState(currentBudget.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const formattedCategoryName = toPascalCase(categoryName);

  useEffect(() => {
    if (isOpen) {
      setBudget(currentBudget.toString());
      setError("");
    }
  }, [isOpen, currentBudget]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const budgetAmount = parseFloat(budget);
      if (isNaN(budgetAmount) || budgetAmount <= 0) {
        setError("Please enter a valid budget amount");
        setIsSubmitting(false);
        return;
      }

      const normalizedCategory = categoryName
        .toUpperCase()
        .replace(/\s+/g, "_");
      await updateBudget(normalizedCategory, budgetAmount);

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating budget:", error);
      setError("Failed to update budget. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Fragment>
      <button
        onClick={openModal}
        className="text-14 flex items-center gap-2 font-medium text-stone-500 hover:text-stone-800 mr-6"
      >
        <span>{currentBudget > 0 ? "Edit Budget" : "Set Budget"}</span>
        {currentBudget > 0 ? (
          <PencilLine className="w-3.5 h-3.5" />
        ) : (
          <Plus className="w-3.5 h-3.5" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-[6px] shadow-xl w-full max-w-md mx-4 overflow-hidden"
          >
            <div className="bg-stone-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                {currentBudget > 0 ? "Edit Budget" : "Set Budget"} -{" "}
                {formattedCategoryName}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Budget Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      step="0.1"
                      min="0"
                      className="p-2 pl-7 block w-full border border-gray-300 rounded-[6px]"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-2.5 py-1.5 text-sm font-medium focus:outline-none rounded-[6px] hover:text-stone-500"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 text-sm font-medium bg-stone-300 text-stone-800 hover:bg-stone-800 hover:text-white rounded-[6px] shadow-sm focus:outline-none transition-colors duration-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Budget"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BudgetModal;
