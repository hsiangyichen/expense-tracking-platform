import { UserDetails, PlaidAccountItem, PlaidTransaction } from "@/types";

export interface RightSidebarProps {
  user: UserDetails;
  accounts: PlaidAccountItem[];
  transactions: PlaidTransaction[];
}
