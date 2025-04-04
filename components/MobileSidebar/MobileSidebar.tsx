"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { PlaidLink } from "@/components/PlaidLink";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MobileSidebarProps } from "./MobileSidebar.types";

const MobileSidebar = ({ user }: MobileSidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <section className="w-full">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="focus:outline-none focus:border-collapse rounded-md"
      >
        <Menu />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={closeSidebar}
      />

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex h-full flex-col justify-between max-w-screen-sm mx-auto">
          <div>
            <div className="flex items-center justify-between pt-3 pb-1 px-6">
              <Link href="/" className="cursor-pointer" onClick={closeSidebar}>
                <Image
                  src="/icons/logo.svg"
                  width={200}
                  height={30}
                  alt="logo"
                  className="w-28"
                />
              </Link>
              <button
                onClick={closeSidebar}
                aria-label="Close menu"
                className="focus:outline-none focus:border-collapse rounded-md p-1"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col text-white">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.route;

                return (
                  <Link
                    href={link.route}
                    key={link.label}
                    onClick={closeSidebar}
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
                );
              })}
              <PlaidLink user={user} type="sidebar" />
            </nav>
          </div>
          <div className="px-6 pb-6">
            <Footer user={user} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileSidebar;
