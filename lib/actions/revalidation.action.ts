"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAccounts() {
  revalidatePath("/");

  return { revalidated: true };
}
