import { PlaidAccountItem } from "@/types";

export interface BankCardProps {
  account: PlaidAccountItem;
  userName: string;
  showBalance?: boolean;
}
