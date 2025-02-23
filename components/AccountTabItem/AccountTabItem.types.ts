import { PlaidAccountItem } from "@/types";

export interface AccountTabItemProps {
  account: PlaidAccountItem;
  isActive: boolean;
  urlStrategy: "query" | "path";
  baseUrl?: string;
}
