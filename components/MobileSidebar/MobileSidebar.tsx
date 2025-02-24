"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { MobileSidebarProps } from "./MobileSidebar.types";
import { PlaidLink } from "@/components/PlaidLink";
import { Menu } from "lucide-react";

const MobileSidebar = ({ user }: MobileSidebarProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <SheetTitle className="hidden"></SheetTitle>
          <div className="flex h-full flex-col justify-between">
            <div className="">
              <Link href="/" className="cursor-pointer ">
                <Image
                  src="/icons/logo.svg"
                  width={200}
                  height={30}
                  alt="logo"
                  className="w-28 mx-6 mt-2"
                />
              </Link>
              <nav className="flex flex-col text-white ">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.route;

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex px-6 gap-3 items-center py-4 rounded-lg w-full border-b-[1.5px] font-light border-transparent transition-all duration-200",
                          {
                            "border-stone-400": isActive,
                            "hover:border-stone-200 hover:shadow-sm": !isActive,
                          }
                        )}
                      >
                        <Icon
                          strokeWidth={1.75}
                          className={cn(
                            "size-5",
                            isActive ? "text-stone-500" : "text-stone-800"
                          )}
                        />
                        <p
                          className={cn("text-16 font-medium text-stone-800", {
                            "text-stone-500": isActive,
                          })}
                        >
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                <PlaidLink user={user} type="sidebar" />
              </nav>
            </div>
            <div className="px-6">
              <Footer user={user} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileSidebar;
