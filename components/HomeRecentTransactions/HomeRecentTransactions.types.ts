import { PlaidTransaction, PlaidAccountItem } from "@/types";

export interface HomeRecentTransactionsProps {
  accounts: PlaidAccountItem[];
  transactions: PlaidTransaction[];
}
