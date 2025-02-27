import { UserDetails, PlaidAccountItem, CategoryTransactions } from "@/types";

export interface RightSidebarProps {
  user: UserDetails;
  accounts: PlaidAccountItem[];
  // transactions: PlaidTransaction[];
  categorizedTransactions?: CategoryTransactions[];
}
