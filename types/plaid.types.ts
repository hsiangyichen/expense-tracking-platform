export interface PlaidConnectionItem {
  userId: string;
  itemId: string;
  accessToken: string;
  status: string;
  institution: string;
  institutionId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PlaidExchangeResponse {
  success: boolean;
  itemId: string;
  institution: string;
  updated?: boolean;
}
