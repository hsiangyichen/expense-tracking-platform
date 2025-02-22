"use server";

import { plaidClient } from "@/lib/plaid";
import { createAdminClient } from "@/lib/appwrite";
import { ID, Query } from "node-appwrite";
import { cache } from "react";
import {
  PlaidTransaction,
  PlaidTransactionsResponse,
  TransactionStats,
} from "@/types";

import { Transaction } from "plaid";

/* - Fetches transactions using Plaid transactionsSync and saves them to db - */

export async function fetchAndStoreTransactions(
  userId: string,
  itemId: string
): Promise<PlaidTransactionsResponse> {
  if (!userId) {
    throw new Error("userId is required");
  }

  if (!itemId) {
    throw new Error("itemId is required");
  }

  // Get access token
  const accessToken = await getAccessTokenForItem(userId, itemId);

  let cursor = await getTransactionCursor(userId, itemId);
  let hasMore = true;
  const allTransactions: PlaidTransaction[] = [];

  while (hasMore) {
    const syncResponse = await plaidClient.transactionsSync({
      access_token: accessToken,
      cursor: cursor || undefined,
    });

    const { added, modified, removed, next_cursor, has_more } =
      syncResponse.data;

    if (added.length > 0) {
      const addedTransactions = await Promise.all(
        added.map(async (transaction) => {
          const transactionItem = mapPlaidTransaction(
            transaction,
            userId,
            itemId
          );
          return await saveOrUpdateTransaction(transactionItem);
        })
      );
      allTransactions.push(...addedTransactions);
    }

    if (modified.length > 0) {
      await Promise.all(
        modified.map(async (transaction) => {
          const transactionItem = mapPlaidTransaction(
            transaction,
            userId,
            itemId
          );
          await saveOrUpdateTransaction(transactionItem);
        })
      );
    }

    // Process removed transactions
    if (removed.length > 0) {
      await Promise.all(
        removed.map(async (removedTransaction) => {
          await markTransactionAsRemoved(
            userId,
            removedTransaction.transaction_id
          );
        })
      );
    }

    cursor = next_cursor;
    hasMore = has_more;

    // Save the cursor for future syncs
    await saveTransactionCursor(userId, itemId, cursor);
  }

  return {
    success: true,
    transactions: allTransactions,
  };
}

/* ------------- Maps Plaid transaction to our application model ------------ */
function mapPlaidTransaction(
  transaction: Transaction,
  userId: string,
  itemId: string
): Omit<PlaidTransaction, "id" | "createdAt" | "updatedAt"> {
  return {
    userId,
    itemId,
    accountId: transaction.account_id,
    transactionId: transaction.transaction_id,
    name: transaction.name || "",
    amount: transaction.amount || 0,
    date: transaction.date || "",
    category: transaction.personal_finance_category
      ? [transaction.personal_finance_category.primary]
      : transaction.category || [],
    pending: transaction.pending || false,
    merchantName: transaction.merchant_name || null,
    paymentChannel: transaction.payment_channel || "",
    image: transaction.logo_url || null,
  };
}

/* ------------------ Gets Plaid access token from database ----------------- */
async function getAccessTokenForItem(
  userId: string,
  itemId: string
): Promise<string> {
  const { databases } = await createAdminClient();

  const connections = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_PLAID_COLLECTION_ID!,
    [
      Query.equal("userId", userId),
      Query.equal("itemId", itemId),
      Query.equal("status", "active"),
    ]
  );

  if (connections.documents.length === 0) {
    throw new Error("Plaid connection not found");
  }

  return connections.documents[0].accessToken;
}

/* ------------------ Gets transaction cursor from database ----------------- */
async function getTransactionCursor(
  userId: string,
  itemId: string
): Promise<string | null> {
  const { databases } = await createAdminClient();

  try {
    const cursors = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_CURSOR_COLLECTION_ID!,
      [
        Query.equal("userId", userId),
        Query.equal("itemId", itemId),
        Query.equal("type", "transactions"),
      ]
    );

    if (cursors.documents.length > 0) {
      return cursors.documents[0].cursor;
    }

    return null;
  } catch (error) {
    console.error("Error fetching transaction cursor:", error);
    return null;
  }
}

/* ------------------ Saves transaction cursor to database ------------------ */
async function saveTransactionCursor(
  userId: string,
  itemId: string,
  cursor: string
): Promise<void> {
  const { databases } = await createAdminClient();
  const now = new Date().toISOString();

  try {
    // Look for existing cursor
    const existingCursors = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_CURSOR_COLLECTION_ID!,
      [
        Query.equal("userId", userId),
        Query.equal("itemId", itemId),
        Query.equal("type", "transactions"),
      ]
    );

    if (existingCursors.documents.length > 0) {
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_CURSOR_COLLECTION_ID!,
        existingCursors.documents[0].$id,
        {
          cursor,
          updatedAt: now,
        }
      );
    } else {
      await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_CURSOR_COLLECTION_ID!,
        ID.unique(),
        {
          userId,
          itemId,
          type: "transactions",
          cursor,
          createdAt: now,
          updatedAt: now,
        }
      );
    }
  } catch (error) {
    console.error("Error saving transaction cursor:", error);
  }
}

/* --------------- Creates or updates transaction in database --------------- */
async function saveOrUpdateTransaction(
  transactionData: Omit<PlaidTransaction, "id" | "createdAt" | "updatedAt">
): Promise<PlaidTransaction> {
  const { databases } = await createAdminClient();
  const now = new Date().toISOString();

  const existingTransactions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
    [
      Query.equal("userId", transactionData.userId),
      Query.equal("transactionId", transactionData.transactionId),
    ]
  );

  if (existingTransactions.documents.length > 0) {
    const existingTransaction = existingTransactions.documents[0];
    const updatedTransaction = await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      existingTransaction.$id,
      {
        ...transactionData,
        updatedAt: now,
      }
    );

    return {
      id: updatedTransaction.$id,
      ...transactionData,
      createdAt: existingTransaction.createdAt,
      updatedAt: now,
    };
  } else {
    const newTransaction = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        ...transactionData,
        createdAt: now,
        updatedAt: now,
      }
    );

    return {
      id: newTransaction.$id,
      ...transactionData,
      createdAt: now,
      updatedAt: now,
    };
  }
}

/* ------------- Marks a transaction as removed in the database ------------- */
async function markTransactionAsRemoved(
  userId: string,
  transactionId: string
): Promise<void> {
  const { databases } = await createAdminClient();

  try {
    const existingTransactions = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [
        Query.equal("userId", userId),
        Query.equal("transactionId", transactionId),
      ]
    );

    if (existingTransactions.documents.length > 0) {
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
        existingTransactions.documents[0].$id,
        {
          status: "removed",
          updatedAt: new Date().toISOString(),
        }
      );
    }
  } catch (error) {
    console.error(
      `Error marking transaction ${transactionId} as removed:`,
      error
    );
  }
}

/* --------------- Gets user's transaction stats with caching --------------- */
export async function getFilteredTransactions(
  userId: string,
  options: {
    accountId?: string;
    startDate?: string;
    endDate?: string;
    categories?: string[];
    minAmount?: number;
    maxAmount?: number;
    page?: number;
    limit?: number;
  }
): Promise<{
  transactions: PlaidTransaction[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> {
  if (!userId) {
    throw new Error("userId is required");
  }

  const {
    accountId,
    startDate,
    endDate,
    categories,
    minAmount,
    maxAmount,
    page = 1,
    limit = 20,
  } = options;

  const { databases } = await createAdminClient();
  const queries = [Query.equal("userId", userId)];

  if (accountId) {
    queries.push(Query.equal("accountId", accountId));
  }

  if (startDate) {
    queries.push(Query.greaterThanEqual("date", startDate));
  }

  if (endDate) {
    queries.push(Query.lessThanEqual("date", endDate));
  }

  if (minAmount !== undefined) {
    queries.push(Query.greaterThanEqual("amount", minAmount));
  }

  if (maxAmount !== undefined) {
    queries.push(Query.lessThanEqual("amount", maxAmount));
  }

  const countResponse = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
    queries
  );

  const totalCount = countResponse.total;
  const totalPages = Math.ceil(totalCount / limit);

  const paginatedQueries = [
    ...queries,
    Query.orderDesc("date"),
    Query.limit(limit),
    Query.offset((page - 1) * limit),
  ];

  const transactionsResponse = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
    paginatedQueries
  );

  // Convert to proper type
  let transactions = transactionsResponse.documents.map((doc) => ({
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

  if (categories && categories.length > 0) {
    transactions = transactions.filter((transaction) =>
      transaction.category.some((category) => categories.includes(category))
    );
  }

  return {
    transactions,
    totalCount,
    currentPage: page,
    totalPages,
  };
}

export const getTransactionStats = cache(
  async (userId: string): Promise<TransactionStats> => {
    if (!userId) {
      throw new Error("userId is required");
    }

    const { databases } = await createAdminClient();

    const transactionsResponse = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.orderDesc("date"), Query.limit(100)]
    );

    // Convert to proper type
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

    const totalTransactions = transactions.length;

    const totalSpent = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalIncome = Math.abs(
      transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    // Get most recent transactions
    const recentTransactions = transactions.slice(0, 10);

    return {
      transactions,
      totalTransactions,
      totalSpent,
      totalIncome,
      recentTransactions,
    };
  }
);
