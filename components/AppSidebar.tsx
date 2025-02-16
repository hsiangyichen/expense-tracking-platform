"use client";
import Logo from "@/public/icons/logo.svg";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, CreditCard, History, PieChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Banks & Cards", href: "/banks-and-cards", icon: CreditCard },
  { name: "Transactions", href: "/transactions", icon: History },
  {
    name: "Budget & Categories",
    href: "/budget-and-categories",
    icon: PieChart,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="h-16 px-2  flex items-center">
          <Image src={Logo} alt="BudgetPin Logo" width={110} height={35} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button className="w-full" onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" /> Connect Bank
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
