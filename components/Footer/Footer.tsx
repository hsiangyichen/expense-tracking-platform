import React from "react";
import Image from "next/image";
import { UserButton, useClerk } from "@clerk/nextjs";
import { FooterProps } from "./Footer.types";

const Footer = ({ user }: FooterProps) => {
  const { signOut } = useClerk();

  return (
    <footer className="flex flex-row md:flex-col cursor-pointer xl:flex-row items-center justify-center gap-2 py-6">
      <div className="flex size-7 rounded-full bg-neutral-50 items-center justify-center">
        <UserButton />
      </div>

      <div className="flex flex-1 flex-col justify-center md:hidden xl:flex pr-4">
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      <div
        className="relative size-5 flex md:hidden xl:min-w-max xl:flex xl:justify-center xl:items-center"
        onClick={() => signOut()}
      >
        <Image src="icons/logout.svg" fill alt="log out" />
      </div>
    </footer>
  );
};

export default Footer;
