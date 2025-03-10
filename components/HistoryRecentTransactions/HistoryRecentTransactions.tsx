"use client";

import React from "react";
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

  const handleTabChange = (accountId: string) => {
    router.push(`/transaction-history/${accountId}`);
  };

  return (
    <section className="flex flex-col h-full">
      <Tabs
        value={currentAccount.accountId}
        onValueChange={handleTabChange}
        className="w-full flex flex-col flex-1 min-h-0"
      >
        <div className="tabs-container flex-shrink-0">
          <ScrollArea className="w-full h-12">
            <TabsList className="w-full inline-flex mb-0">
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
        <div className="flex-1 min-h-0 rounded-xl">
          <TabsContent
            value={currentAccount.accountId}
            className="h-full flex flex-col rounded-xl overflow-hidden mt-0"
          >
            <div className="account-info-container flex-shrink-0 mb-4">
              <AccountInfo
                account={currentAccount}
                accountId={currentAccount.accountId}
                type="full"
              />
            </div>

            <div className="flex-1 min-h-0 overflow-hidden bg-white">
              <div className="h-full overflow-auto px-4 py-2 rounded-xl shadow-sm">
                <TransactionsTable
                  transactions={initialTransactions}
                  type="history"
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default HistoryRecentTransactions;
