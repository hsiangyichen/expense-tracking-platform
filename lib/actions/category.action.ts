"use server";

import { createAdminClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { cache } from "react";
import { transactionCategories } from "@/constants";
import {
  PlaidTransaction,
  CategoryResponse,
  CategoryTransactions,
} from "@/types";

/* ---------- Get category statistics with optional date filtering --------- */
export const getCategoryStats = cache(
  async (
    userId: string,
    options?: {
      startDate?: string;
      endDate?: string;
    }
  ): Promise<CategoryResponse> => {
    if (!userId) {
      throw new Error("userId is required");
    }

    const { databases } = await createAdminClient();
    const queries = [Query.equal("userId", userId)];

    // Add date range filters if provided
    if (options?.startDate) {
      queries.push(Query.greaterThanEqual("date", options.startDate));
    }
    if (options?.endDate) {
      queries.push(Query.lessThanEqual("date", options.endDate));
    }

    // Get all transactions
    const transactionsResponse = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      queries
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

    const categoryStats = transactionCategories.map((category) => {
      const categoryTransactions = transactions.filter(
        (t) => t.category[0] === category.value
      );

      const totalAmount = categoryTransactions.reduce(
        (sum, t) => sum + t.amount,
        0
      );

      return {
        category,
        totalAmount,
        transactionCount: categoryTransactions.length,
        transactions: categoryTransactions,
      };
    });

    const totalIncome = categoryStats
      .filter((stat) => stat.category.value === "INCOME")
      .reduce((sum, stat) => sum + stat.totalAmount, 0);

    const totalSpent = categoryStats
      .filter(
        (stat) =>
          stat.category.value !== "INCOME" &&
          stat.category.value !== "TRANSFER_IN"
      )
      .reduce((sum, stat) => sum + stat.totalAmount, 0);

    return {
      categoryStats,
      totalSpent,
      totalIncome,
    };
  }
);

/* ------- Gets transactions grouped and sorted by category and count ------ */
export const getCategorizedTransactions = cache(
  async (userId: string): Promise<CategoryTransactions[]> => {
    if (!userId) {
      throw new Error("userId is required");
    }

    const { databases } = await createAdminClient();

    // Get all transactions
    const response = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    // Map and organize transactions by category
    const categorizedTransactions = transactionCategories.map((category) => {
      const categoryTransactions = response.documents
        .filter((doc) => doc.category?.[0] === category.value)
        .map((doc) => ({
          id: doc.$id,
          userId: doc.userId,
          accountId: doc.accountId,
          itemId: doc.itemId,
          transactionId: doc.transactionId,
          pending: doc.pending || false,
          paymentChannel: doc.paymentChannel || "",
          image: doc.image,
          name: doc.name,
          amount: doc.amount || 0,
          date: doc.date,
          category: Array.isArray(doc.category) ? doc.category : [],
          merchantName: doc.merchantName,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }))
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

      const totalAmount = categoryTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      return {
        category,
        transactions: categoryTransactions,
        totalAmount,
        transactionCount: categoryTransactions.length,
      };
    });

    return categorizedTransactions.sort(
      (a, b) => b.transactionCount - a.transactionCount
    );
  }
);
