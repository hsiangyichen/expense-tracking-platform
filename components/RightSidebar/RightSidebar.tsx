import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BankCard } from "@/components/BankCard";
import { RightSidebarProps } from "./RightSidebar.types";

const RightSidebar = ({ user, accounts, transactions }: RightSidebarProps) => {
  return (
    <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[365px] xl:overflow-y-scroll !important">
      <section className="flex flex-col pb-8">
        <div className="h-20 w-full bg-cover bg-no-repeat" />
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex-center absolute -top-8 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
            <span className="text-5xl font-bold text-zinc-400">
              {user.firstName?.[0] ?? ""}
            </span>
          </div>

          <div className="flex flex-col pt-24">
            <h1 className="text-24 font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-16 font-normal text-gray-600">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-8 px-6 py-8">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image
              src="/icons/plus.svg"
              alt="plus"
              width={20}
              height={20}
              className="w-auto h-auto"
            />
            <h2 className="text-14 font-semibold text-gray-600 min-w-max">
              Add Bank
            </h2>
          </Link>
        </div>

        {accounts?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10 right-3">
              <BankCard
                key={accounts[0].balanceCurrent}
                account={accounts[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {accounts[1] && (
              <div className="absolute -right-2 top-6 z-0 w-[90%]">
                <BankCard
                  key={accounts[1].balanceCurrent}
                  account={accounts[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;
