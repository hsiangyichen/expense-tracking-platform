"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlaidLink } from "@/components/PlaidLink";
import { Footer } from "@/components/Footer";
import { SidebarProps } from "./Sidebar.types";

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2 relative -top-1"
        >
          <Image
            src="./icons/logo.svg"
            width={200}
            height={30}
            alt="logo"
            className="w-32"
          />
        </Link>

        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-3 items-center min-w-max py-1 md:py-3 2xl:py-4 rounded-lg justify-center xl:justify-start border-b-[1.5px] border-transparent transition-all duration-200",
                {
                  "border-zinc-500": isActive,
                  "hover:border-zinc-200 hover:shadow-sm": !isActive,
                }
              )}
            >
              <div className="relative size-6">
                <Icon
                  className={cn(
                    "size-6",
                    isActive ? "text-zinc-500" : "text-zinc-800"
                  )}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-semibold text-zinc-800 max-xl:hidden",
                  { "text-zinc-500": isActive }
                )}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} />
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
