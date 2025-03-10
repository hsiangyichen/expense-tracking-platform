import { PlaidTransaction } from "./transaction.types";

export type CategorySummary = {
  name: string;
  totalAmount: number;
  percentage: number;
  count: number;
  transactions: PlaidTransaction[];
};

export type CategorizedTransactions = {
  categories: CategorySummary[];
  totalSpent: number;
};
