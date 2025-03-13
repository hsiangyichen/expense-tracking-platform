"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlaidLink } from "@/components/PlaidLink";
import { Footer } from "@/components/Footer";
import { SidebarProps } from "./Sidebar.types";
import { sidebarLinks } from "@/constants";
import { getAccountStats } from "@/lib/actions/account.action";

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountId = async () => {
      if (!user) return;
      try {
        const accountStats = await getAccountStats(user.id);
        if (accountStats.accounts.length > 0) {
          setAccountId(accountStats.accounts[0].accountId);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccountId();
  }, [user]);

  const updatedSidebarLinks = sidebarLinks.map((link) => {
    if (link.requiresAccountId && accountId) {
      return { ...link, route: `/transaction-history/${accountId}` };
    }
    return link;
  });

  return (
    <section className="sticky z-50 left-0 top-0 flex h-screen max-w-full flex-col justify-between border-r border-gray-200 bg-white text-white max-md:hidden py-3 sm:px-4 xl:px-5">
      <nav className="flex flex-col">
        <Link
          href="/"
          className="flex cursor-pointer items-center relative -top-1"
        >
          <Image
            src="/icons/logo.svg"
            width={200}
            height={30}
            alt="logo"
            className="w-32"
          />
        </Link>
        {updatedSidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-3 items-center min-w-max xl:pl-1 pt-4 md:pt-5 pb-2 md:pb-4 max-xl:pb-6 rounded-lg justify-center xl:justify-start border-b-[1.5px] border-transparent transition-all duration-200",
                {
                  "border-stone-400": isActive,
                  "hover:border-stone-200 hover:shadow-sm": !isActive,
                }
              )}
            >
              <div className="relative size-5">
                <link.icon
                  strokeWidth={1.75}
                  className={cn(
                    "size-5",
                    isActive ? "text-stone-500" : "text-stone-800"
                  )}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-medium text-stone-800 max-xl:hidden",
                  {
                    "text-stone-500": isActive,
                  }
                )}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} type="sidebar" />
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
