"use server";

import { createAdminClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { cache } from "react";
import { PlaidTransaction } from "@/types";
import { getUserBudgets } from "@/lib/actions/budget.action";

export type CategorySummary = {
  name: string;
  totalAmount: number;
  percentage: number;
  budgetAmount: number;
  count: number;
  transactions: PlaidTransaction[];
};

export type CategorizedTransactions = {
  categories: CategorySummary[];
  totalSpent: number;
};

export const getCategorizedTransactions = cache(
  async (userId: string): Promise<CategorizedTransactions> => {
    if (!userId) {
      throw new Error("userId is required");
    }

    const { databases } = await createAdminClient();

    const transactionsResponse = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [
        Query.equal("userId", userId),
        Query.greaterThan("amount", 0),
        Query.orderDesc("date"),
        Query.limit(500),
      ]
    );

    const transactions = transactionsResponse.documents.map((doc) => ({
      id: doc.$id,
      userId: doc.userId,
      accountId: doc.accountId,
      itemId: doc.itemId,
      transactionId: doc.transactionId,
      name: doc.name,
      amount: doc.amount || 0,
      date: doc.date,
      category: Array.isArray(doc.category) ? doc.category : [],
      pending: doc.pending || false,
      merchantName: doc.merchantName,
      paymentChannel: doc.paymentChannel || "",
      image: doc.image,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    })) as PlaidTransaction[];

    const userBudgets = await getUserBudgets(userId);

    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

    const categoryMap = new Map<string, PlaidTransaction[]>();

    for (const transaction of transactions) {
      const primaryCategory =
        transaction.category.length > 0
          ? transaction.category[0]
          : "Uncategorized";

      if (!categoryMap.has(primaryCategory)) {
        categoryMap.set(primaryCategory, []);
      }

      categoryMap.get(primaryCategory)!.push(transaction);
    }

    const categories: CategorySummary[] = Array.from(categoryMap.entries())
      .map(([name, categoryTransactions]) => {
        const totalAmount = categoryTransactions.reduce(
          (sum, t) => sum + t.amount,
          0
        );

        const normalizedName = name.toUpperCase().replace(/\s+/g, "_");
        const budget = userBudgets.find(
          (b) => b.category.toUpperCase() === normalizedName
        );
        const budgetAmount = budget?.amount || 0;

        // Calculate percentage of budget - if budget exists
        const percentage =
          budgetAmount > 0 ? (totalAmount / budgetAmount) * 100 : 0;

        return {
          name,
          totalAmount,
          percentage,
          budgetAmount,
          count: categoryTransactions.length,
          transactions: categoryTransactions,
        };
      })
      .sort((a, b) => b.totalAmount - a.totalAmount);

    return {
      categories,
      totalSpent,
    };
  }
);
