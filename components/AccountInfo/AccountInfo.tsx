"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, formatAmount } from "@/lib/utils";
import React from "react";
import { AccountInfoProps } from "./AccountInfo.types";

const AccountInfo = ({ account }: AccountInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account.accountId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className="gap-5 flex p-4 transition-all rounded-xl border border-stone-200 cursor-pointer"
    >
      <figure className="flex-center h-fit rounded-full">
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5 text-stone-900"
        />
      </figure>
      <div className="flex w-full flex-1 flex-col justify-center gap-1">
        <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
          <h2 className="text-16 line-clamp-1 flex-1 font-bold ">
            {account.officialName}
          </h2>
          <p className="text-12 rounded-full px-3 py-1 font-medium bg-[#e8e7ed]">
            {account.subtype}
          </p>
        </div>

        <p className="text-16 font-medium ">
          {formatAmount(account.balanceCurrent)}
        </p>
      </div>
    </div>
  );
};

export default AccountInfo;
