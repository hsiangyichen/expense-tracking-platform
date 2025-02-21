"use server";

import { plaidClient } from "@/lib/plaid";
import { createAdminClient } from "@/lib/appwrite";
import { ID, Query } from "node-appwrite";
import { cache } from "react";
import { PlaidAccountItem, PlaidAccountsResponse, AccountStats } from "@/types";

/**
 * Main function: Fetches accounts from Plaid and saves them to Appwrite
 */
export async function fetchAndStoreAccounts(
  userId: string,
  itemId: string
): Promise<PlaidAccountsResponse> {
  if (!userId) {
    throw new Error("userId is required");
  }

  if (!itemId) {
    throw new Error("itemId is required");
  }

  // Get access token and institution info
  const accessToken = await getAccessTokenForItem(userId, itemId);
  const { institutionId, institutionName } = await getItemInstitution(
    userId,
    itemId
  );

  // Get accounts from Plaid API
  const accountsResponse = await plaidClient.accountsGet({
    access_token: accessToken,
  });

  // Save each account to database
  const storedAccounts = await Promise.all(
    accountsResponse.data.accounts.map(async (account) => {
      const accountItem: Omit<
        PlaidAccountItem,
        "id" | "createdAt" | "updatedAt"
      > = {
        userId,
        itemId,
        accountId: account.account_id,
        institutionId,
        institutionName,
        name: account.name,
        officialName: account.official_name || "",
        mask: account.mask || "",
        subtype: account.subtype || "",
        balanceCurrent: account.balances.current || 0,
        type: account.type,
        status: "active",
      };

      return await saveOrUpdateAccount(accountItem);
    })
  );

  return {
    success: true,
    accounts: storedAccounts,
  };
}

/**
 * Gets Plaid access token from database
 */
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

/**
 * Gets institution details from database
 */
async function getItemInstitution(userId: string, itemId: string) {
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

  const connection = connections.documents[0];

  return {
    institutionId: connection.institutionId,
    institutionName: connection.institution,
  };
}

/**
 * Creates or updates account in database
 */
async function saveOrUpdateAccount(
  accountData: Omit<PlaidAccountItem, "id" | "createdAt" | "updatedAt">
): Promise<PlaidAccountItem> {
  const { databases } = await createAdminClient();
  const now = new Date().toISOString();

  // Look for existing account
  const existingAccounts = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_ACCOUNT_COLLECTION_ID!,
    [
      Query.equal("userId", accountData.userId),
      Query.equal("itemId", accountData.itemId),
      Query.equal("accountId", accountData.accountId),
    ]
  );

  if (existingAccounts.documents.length > 0) {
    // Update existing account
    const existingAccount = existingAccounts.documents[0];
    const updatedAccount = await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNT_COLLECTION_ID!,
      existingAccount.$id,
      {
        ...accountData,
        updatedAt: now,
      }
    );

    return {
      id: updatedAccount.$id,
      ...accountData,
      createdAt: existingAccount.createdAt,
      updatedAt: now,
    };
  } else {
    // Create new account
    const newAccount = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNT_COLLECTION_ID!,
      ID.unique(),
      {
        ...accountData,
        createdAt: now,
        updatedAt: now,
      }
    );

    return {
      id: newAccount.$id,
      ...accountData,
      createdAt: now,
      updatedAt: now,
    };
  }
}

/**
 * Gets user's account stats with caching
 */
export const getAccountStats = cache(
  async (userId: string): Promise<AccountStats> => {
    if (!userId) {
      throw new Error("userId is required");
    }

    const { databases } = await createAdminClient();

    // Get all active accounts
    const accountsResponse = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNT_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.equal("status", "active")]
    );

    // Convert to proper type
    const accounts = accountsResponse.documents.map((doc) => ({
      id: doc.$id,
      userId: doc.userId,
      itemId: doc.itemId,
      accountId: doc.accountId,
      institutionId: doc.institutionId,
      institutionName: doc.institutionName,
      name: doc.name,
      officialName: doc.officialName || "",
      mask: doc.mask || "",
      subtype: doc.subtype || "",
      balanceCurrent: doc.balanceCurrent || 0,
      type: doc.type,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      status: doc.status,
    })) as PlaidAccountItem[];

    // Calculate stats
    const totalAccounts = accounts.length;
    const totalCurrentBalance = accounts.reduce(
      (sum, account) => sum + (account.balanceCurrent || 0),
      0
    );

    const itemId = accounts.length > 0 ? accounts[0].itemId : "";

    return {
      itemId,
      accounts,
      totalAccounts,
      totalCurrentBalance,
    };
  }
);
