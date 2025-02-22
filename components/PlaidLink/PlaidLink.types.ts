import { UserDetails } from "@/types";

export interface PlaidLinkProps {
  user: UserDetails;
  type: "sidebar" | "right-sidebar";
}
