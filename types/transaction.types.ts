export interface PlaidTransaction {
  id: string;
  userId: string;
  accountId: string;
  itemId: string;
  transactionId: string;
  name: string;
  amount: number;
  date: string;
  category: string[];
  pending: boolean;
  merchantName: string | null;
  paymentChannel: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PlaidTransactionsResponse {
  success: boolean;
  transactions: PlaidTransaction[];
}

export interface TransactionStats {
  transactions: PlaidTransaction[];
  totalTransactions: number;
  totalSpent: number;
  totalIncome: number;
  recentTransactions: PlaidTransaction[];
}
