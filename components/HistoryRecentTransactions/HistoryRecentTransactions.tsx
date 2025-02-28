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

  /* ---------------------------- Handle tab change --------------------------- */
  const handleTabChange = (accountId: string) => {
    router.push(`/transaction-history/${accountId}`);
  };

  return (
    <section className="flex w-full flex-col">
      <Tabs
        value={currentAccount.accountId}
        onValueChange={handleTabChange}
        className="w-full"
      >
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
        <TabsContent value={currentAccount.accountId} className="space-y-4">
          <AccountInfo
            account={currentAccount}
            accountId={currentAccount.accountId}
            type="full"
          />
          <TransactionsTable transactions={initialTransactions} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default HistoryRecentTransactions;
