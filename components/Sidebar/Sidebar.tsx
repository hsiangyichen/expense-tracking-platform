"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-3 items-center min-w-max py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                { "bg-gray-600": isActive }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-semibold text-neutral-800 max-xl:hidden",
                  { "!text-white": isActive }
                )}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
