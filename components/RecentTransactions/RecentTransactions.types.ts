import { PlaidTransaction, PlaidAccountItem } from "@/types";

export interface RecentTransactionsProps {
  accounts: PlaidAccountItem[];
  transactions: PlaidTransaction[];
  page: number;
}
