"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountInfo } from "@/components/AccountInfo";
import { AccountTabItem } from "@/components/AccountTabItem";
import { TransactionsTable } from "@/components/TransactionsTable";
import { useRouter } from "next/navigation";
import { HistoryRecentTransactionsProps } from "./HistoryRecentTransactions.types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const HistoryRecentTransactions = ({
  accounts,
  currentAccount,
  initialTransactions,
}: HistoryRecentTransactionsProps) => {
  const router = useRouter();
  const [tableHeight, setTableHeight] = useState("calc(100vh - 300px)");

  const handleTabChange = (accountId: string) => {
    router.push(`/transaction-history/${accountId}`);
  };

  useEffect(() => {
    const calculateHeight = () => {
      const header = document.querySelector("header");
      const tabs = document.querySelector(".tabs-container");
      const accountInfo = document.querySelector(".account-info-container");

      let offsetHeight = 180;

      if (header) offsetHeight += header.clientHeight;
      if (tabs) offsetHeight += tabs.clientHeight;
      if (accountInfo) offsetHeight += accountInfo.clientHeight;

      setTableHeight(`calc(100vh - ${offsetHeight}px)`);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <section className="flex w-full flex-col h-full">
      <Tabs
        value={currentAccount.accountId}
        onValueChange={handleTabChange}
        className="w-full flex flex-col h-full"
      >
        <div className="tabs-container">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="mb-2 flex w-full flex-nowrap">
              {accounts.map((account) => (
                <TabsTrigger
                  key={account.id}
                  value={account.accountId}
                  className="p-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  <AccountTabItem
                    account={account}
                    isActive={currentAccount.accountId === account.accountId}
                    urlStrategy="path"
                    baseUrl="/transaction-history"
                  />
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>

        <TabsContent
          value={currentAccount.accountId}
          className="space-y-4 flex-1 flex flex-col"
        >
          <div className="account-info-container">
            <AccountInfo
              account={currentAccount}
              accountId={currentAccount.accountId}
              type="full"
            />
          </div>

          <div
            className="flex-1 overflow-hidden"
            style={{ height: tableHeight, minHeight: "300px" }}
          >
            <TransactionsTable
              transactions={initialTransactions}
              type="history"
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default HistoryRecentTransactions;
