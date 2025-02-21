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
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <SheetTitle className="hidden"></SheetTitle>
          <div className="flex h-full flex-col justify-between">
            <div>
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/icons/logo.svg"
                  width={200}
                  height={30}
                  alt="logo"
                  className="w-28"
                />
              </Link>
              <nav className="flex flex-col gap-2 pt-6 text-white">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-3 items-center py-3 rounded-lg w-full border-b-[1.5px] border-transparent transition-all duration-200",
                          {
                            "border-zinc-500": isActive,
                            "hover:border-zinc-200 hover:shadow-sm": !isActive,
                          }
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-6",
                            isActive ? "text-zinc-500" : "text-zinc-800"
                          )}
                        />
                        <p
                          className={cn("text-16 font-semibold text-zinc-800", {
                            "text-zinc-500": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                <PlaidLink user={user} />
              </nav>
            </div>
            <Footer user={user} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileSidebar;
