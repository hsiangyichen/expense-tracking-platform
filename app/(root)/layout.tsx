import SidebarContainer from "@/components/SidebarContainer";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarContainer>{children}</SidebarContainer>;
}
