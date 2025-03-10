"use server";

import { createAdminClient } from "@/lib/appwrite";
import { auth } from "@clerk/nextjs/server";
import { ID, Query } from "node-appwrite";

export type Budget = {
  id: string;
  userId: string;
  category: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export const getUserBudgets = async (userId: string): Promise<Budget[]> => {
  if (!userId) {
    throw new Error("userId is required");
  }

  const { databases } = await createAdminClient();

  try {
    const budgetsResponse = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BUDGET_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return budgetsResponse.documents.map((doc) => ({
      id: doc.$id,
      userId: doc.userId,
      category: doc.category,
      amount: doc.amount,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return [];
  }
};

export const updateBudget = async (
  category: string,
  amount: number
): Promise<void> => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!category) {
    throw new Error("Category is required");
  }

  if (isNaN(amount) || amount <= 0) {
    throw new Error("Valid budget amount is required");
  }

  const { databases } = await createAdminClient();

  try {
    // First check if a budget for this category already exists
    const existingBudgetResponse = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BUDGET_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.equal("category", category)]
    );

    if (existingBudgetResponse.documents.length > 0) {
      // Update existing budget
      const budgetId = existingBudgetResponse.documents[0].$id;
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_BUDGET_COLLECTION_ID!,
        budgetId,
        {
          amount,
          updatedAt: new Date().toISOString(),
        }
      );
    } else {
      // Create new budget
      await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_BUDGET_COLLECTION_ID!,
        ID.unique(),
        {
          userId,
          category,
          amount,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
    }
  } catch (error) {
    console.error("Error updating budget:", error);
    throw new Error("Failed to update budget");
  }
};
