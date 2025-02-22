import React from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DoughnutChart } from "@/components/DoughnutChart";
import { HeroBoxProps } from "./HeroBox.types";
import { HeaderBox } from "@/components/HeaderBox";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const HeroBox = async ({
  accounts = [],
  totalAccounts,
  totalCurrentBalance,
}: HeroBoxProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <section className="flex flex-col sm:gap-8 rounded-xl border border-stone-200 p-4 shadow-sm gap-6 sm:p-6">
      <HeaderBox
        type="greeting"
        title="Welcome"
        user={user?.firstName || "Guest"}
        subtext="Welcome back to Budget Pin! Starts Your financial journey now!"
      />
      <div className="flex w-full gap-4">
        <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px]">
          <DoughnutChart accounts={accounts} />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="header-2">Bank Accounts: {totalAccounts}</h2>
          <div className="flex flex-col gap-2">
            <p className="text-14 font-medium text-stone-600">
              Total Current Balance
            </p>
            <div className="text-24 lg:text-30 flex-1 font-semibold text-stone-900 flex-center gap-2">
              <AnimatedCounter amount={totalCurrentBalance} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBox;
