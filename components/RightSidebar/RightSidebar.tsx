import React from "react";
import { BankCard } from "@/components/BankCard";
import { RightSidebarProps } from "./RightSidebar.types";
import { PlaidLink } from "@/components/PlaidLink";

const RightSidebar = ({ user, accounts, transactions }: RightSidebarProps) => {
  return (
    <aside className="flex-col 2xl:flex w-[365px] my-12 mr-8 hidden h-screen max-h-screen">
      <section className="flex flex-col justify-between gap-8 px-6 p-12 pt-6 rounded-xl border border-stone-200 shadow-sm">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Cards</h2>
          <PlaidLink user={user} type="right-sidebar" />
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
