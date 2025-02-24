import { PlaidAccountItem } from "@/types";

export interface AccountInfoProps {
  account: PlaidAccountItem;
  accountId: string;
  type: "full" | "card";
}
