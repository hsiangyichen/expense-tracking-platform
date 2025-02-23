"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { AccountTabItemProps } from "./AccountTabItem.types";

const AccountTabItem = ({
  account,
  isActive = false,
  urlStrategy = "query",
  baseUrl = "/transaction-history",
}: AccountTabItemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBankChange = () => {
    if (urlStrategy === "query") {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "id",
        value: account.accountId,
      });
      router.replace(newUrl, { scroll: false });
    } else {
      router.replace(`${baseUrl}/${account.accountId}`, { scroll: false });
    }
  };

  return (
    <div
      onClick={handleBankChange}
      className={`px-3 py-2 transition-colors duration-200 cursor-pointer hover:border-stone-700
        ${
          isActive
            ? "border-b-[1.5px] border-stone-700"
            : "border-b-[1.5px] text-stone-100"
        }`}
    >
      <p className={isActive ? "text-stone-700" : "text-stone-400"}>
        {account.institutionName} | {account.name}
      </p>
    </div>
  );
};

export default AccountTabItem;
