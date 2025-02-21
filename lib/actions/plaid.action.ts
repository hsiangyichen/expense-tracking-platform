"use server";

import { plaidClient } from "@/lib/plaid";
import { createAdminClient } from "@/lib/appwrite";
import { ID, Query } from "node-appwrite";
import { CountryCode } from "plaid";
import { PlaidExchangeResponse } from "@/types";
import { fetchAndStoreAccounts } from "./account.action";
import { fetchAndStoreTransactions } from "./transaction.action";

/**
 * Exchanges a public token for an access token and stores the connection
 */
export async function exchangePublicToken(
  public_token: string,
  userId: string
): Promise<PlaidExchangeResponse> {
  if (!public_token) {
    throw new Error("public_token is required");
  }

  if (!userId) {
    throw new Error("userId is required");
  }

  // Exchange public token for access token and item ID
  const tokenResponse = await plaidClient.itemPublicTokenExchange({
    public_token,
  });

  const accessToken = tokenResponse.data.access_token;
  const itemId = tokenResponse.data.item_id;

  // Get institution information
  const institutionInfo = await getInstitutionInfo(accessToken);

  // Store or update the connection
  const result = await saveOrUpdatePlaidConnection(
    userId,
    itemId,
    accessToken,
    institutionInfo.name,
    institutionInfo.id
  );

  // Automatically fetch and store accounts after successful connection
  try {
    await fetchAndStoreAccounts(userId, itemId);
  } catch (accountError) {
    console.error("Error fetching accounts after connection:", accountError);
  }

  // Automatically fetch and store transactions after successful connection
  try {
    await fetchAndStoreTransactions(userId, itemId);
  } catch (transactionError) {
    console.error(
      "Error fetching transactions after connection:",
      transactionError
    );
  }

  return {
    success: true,
    itemId,
    institution: institutionInfo.name,
    updated: result.updated,
  };
}

/**
 * Gets institution information from Plaid
 */
async function getInstitutionInfo(accessToken: string) {
  const itemResponse = await plaidClient.itemGet({
    access_token: accessToken,
  });

  const institutionId = itemResponse.data.item.institution_id;
  let institutionName = "Unknown Institution";

  if (institutionId) {
    try {
      const institutionResponse = await plaidClient.institutionsGetById({
        institution_id: institutionId,
        country_codes: [CountryCode.Us],
      });
      institutionName = institutionResponse.data.institution.name;
    } catch (instError) {
      console.error("Error fetching institution details:", instError);
      // Continue with default institution name
    }
  }

  return {
    id: institutionId || "",
    name: institutionName,
  };
}

/**
 * Saves or updates a Plaid connection in the database
 */
async function saveOrUpdatePlaidConnection(
  userId: string,
  itemId: string,
  accessToken: string,
  institutionName: string,
  institutionId: string
) {
  const { databases } = await createAdminClient();

  // Check for existing connections
  const existingConnections = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_PLAID_COLLECTION_ID!,
    [
      Query.equal("userId", userId),
      Query.equal("institutionId", institutionId),
      Query.equal("status", "active"),
    ]
  );

  if (existingConnections.documents.length > 0) {
    // Update existing connection
    const existingDoc = existingConnections.documents[0];
    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PLAID_COLLECTION_ID!,
      existingDoc.$id,
      {
        accessToken,
        itemId,
        updatedAt: new Date().toISOString(),
      }
    );

    return { updated: true };
  } else {
    // Create new connection
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PLAID_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        itemId,
        accessToken,
        status: "active",
        institution: institutionName,
        institutionId,
        createdAt: new Date().toISOString(),
      }
    );

    return { updated: false };
  }
}
