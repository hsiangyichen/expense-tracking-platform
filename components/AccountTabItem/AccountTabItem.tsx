// AccountTabItem.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import React from "react";
import { AccountTabItemProps } from "./AccountTabItem.types";

const AccountTabItem = ({ account, isActive = false }: AccountTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.accountId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={`px-3 py-2 transition-colors duration-200 cursor-pointer
        ${
          isActive
            ? "border-b-2 border-gradient-middle"
            : "border-b-2 border-white"
        }`}
    >
      <p className={isActive ? "text-custom-600" : "text-gray-700"}>
        {account.name}
      </p>
    </div>
  );
};

export default AccountTabItem;
