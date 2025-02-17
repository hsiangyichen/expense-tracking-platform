import React from "react";
import Image from "next/image";
import { UserButton, useClerk } from "@clerk/nextjs";

const Footer = ({ user, type }: FooterProps) => {
  const { signOut } = useClerk();

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <UserButton />
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      <div className="footer_image" onClick={() => signOut()}>
        <Image src="icons/logout.svg" fill alt="log out" />
      </div>
    </footer>
  );
};

export default Footer;
