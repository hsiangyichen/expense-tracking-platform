import { PlaidTransaction, PlaidAccountItem } from "@/types";

export interface HistoryRecentTransactionsProps {
  accounts: PlaidAccountItem[];
  currentAccount: PlaidAccountItem;
  initialTransactions: PlaidTransaction[];
  totalPages: number;
  currentPage: number;
}
