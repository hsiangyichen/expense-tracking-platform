export interface PlaidAccountItem {
  id: string;
  userId: string;
  itemId: string;
  accountId: string;
  institutionId: string;
  institutionName: string;
  name: string;
  officialName: string;
  mask: string;
  subtype: string;
  balanceCurrent: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface PlaidAccountsResponse {
  success: boolean;
  accounts: PlaidAccountItem[];
}

export interface AccountStats {
  itemId: string;
  accounts: PlaidAccountItem[];
  totalAccounts: number;
  totalCurrentBalance: number;
}
