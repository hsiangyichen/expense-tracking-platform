import { PlaidTransaction } from "@/types";

export interface CategoryListProps {
  categorizedTransactions: {
    category: {
      label: string;
      value: string;
    };
    transactions: PlaidTransaction[];
    totalAmount: number;
  }[];
}
