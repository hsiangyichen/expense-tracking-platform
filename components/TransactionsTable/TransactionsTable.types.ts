import { PlaidTransaction } from "@/types";

export interface TransactionTableProps {
  transactions: PlaidTransaction[];
  type?: "home" | "history";
}
