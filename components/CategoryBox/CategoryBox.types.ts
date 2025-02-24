import { PlaidTransaction } from "@/types";

export interface CategoryBoxProps {
  item: {
    category: {
      label: string;
      value: string;
    };
    transactions: PlaidTransaction[];
    totalAmount: number;
  };
}
