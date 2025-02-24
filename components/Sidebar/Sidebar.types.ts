import { PlaidAccountItem, UserDetails } from "@/types";

export interface SidebarProps {
  user: UserDetails;
  accounts: PlaidAccountItem[];
}
