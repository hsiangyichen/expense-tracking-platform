import { PlaidTransaction } from "./transaction.types";

export interface CategoryStats {
  category: {
    label: string;
    value: string;
  };
  totalAmount: number;
  transactionCount: number;
  transactions: PlaidTransaction[];
}

export interface CategoryResponse {
  categoryStats: CategoryStats[];
  totalSpent: number;
  totalIncome: number;
}

export interface CategoryTransactions {
  category: {
    label: string;
    value: string;
  };
  transactions: PlaidTransaction[];
  totalAmount: number;
}
