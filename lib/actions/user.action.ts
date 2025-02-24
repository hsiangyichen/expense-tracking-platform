"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { createAdminClient } from "../appwrite";
import { UserDetails } from "@/types";
import { Query, ID } from "node-appwrite";

/* ---------- Syncs the current user's data from Clerk to Appwrite ---------- */

export async function syncUserWithAppwrite() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await currentUser();
    if (!user) throw new Error("User not found");

    const userDetails: UserDetails = {
      id: userId,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    };

    await upsertUserDetails(userDetails);

    return { success: true };
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
}

/* ------------- Creates or updates user details in the database ------------ */
async function upsertUserDetails(userDetails: UserDetails) {
  try {
    const { databases } = await createAdminClient();

    const existingUser = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("id", userDetails.id)]
    );

    if (existingUser.documents.length > 0) {
      const documentId = existingUser.documents[0].$id;
      return await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_USER_COLLECTION_ID!,
        documentId,
        {
          id: userDetails.id,
          email: userDetails.email,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
        }
      );
    } else {
      return await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_USER_COLLECTION_ID!,
        ID.unique(),
        {
          id: userDetails.id,
          email: userDetails.email,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
        }
      );
    }
  } catch (error) {
    console.error("Error upserting user details:", error);
    throw error;
  }
}
