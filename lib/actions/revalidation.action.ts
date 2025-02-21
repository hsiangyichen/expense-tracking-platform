"use server";

import { revalidatePath } from "next/cache";

/**
 * Revalidates account-related data in the application
 */
export async function revalidateAccounts() {
  // Revalidate specific paths that display account information
  revalidatePath("/");

  return { revalidated: true };
}
