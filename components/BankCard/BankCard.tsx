import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BankCardProps } from "./BankCard.types";

const BankCard = ({ account, userName }: BankCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href="/"
        className="relative flex h-[190px] w-full max-w-[320px] justify-between rounded-2xl border border-white shadow-creditCard backdrop-blur-[6px]"
      >
        <div className="relative z-10 flex size-full max-w-[228px] flex-col justify-between rounded-l-2xl bg-gradient-to-br from-[#4A4E69] to-[#22223B] px-5 pb-4 pt-5">
          <div>
            <h1 className="text-16 font-semibold text-white">
              {account.name || userName}
            </h1>
            <p className="font-extrabold text-white">
              {formatAmount(account.balanceCurrent)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">{userName}</h1>
              <h2 className="text-10 font-semibold text-white">●● / ●●</h2>
            </div>
            <p className="text-10 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-14">{account.mask}</span>
            </p>
          </article>
        </div>

        <div className="flex flex-1 flex-col items-end justify-between rounded-r-2xl bg-gradient-to-br from-[#22223B] to-[#1A1A2E] bg-cover bg-center bg-no-repeat py-5 pr-5 pl-2">
          <Image src="/icons/Paypass.svg" alt="pay" width={20} height={24} />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="p-0"
          />
        </div>
      </Link>
    </div>
  );
};

export default BankCard;
