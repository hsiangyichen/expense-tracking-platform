"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountInfo } from "@/components/AccountInfo";
import { AccountTabItem } from "@/components/AccountTabItem";
import { TransactionsTable } from "@/components/TransactionsTable";
import { PlaidAccountItem, PlaidTransaction } from "@/types";
import { useRouter } from "next/navigation";

interface HistoryRecentTransactionsProps {
  accounts: PlaidAccountItem[];
  currentAccount: PlaidAccountItem;
  initialTransactions: PlaidTransaction[];
  totalPages: number;
  currentPage: number;
}

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
    <section className="flex w-full flex-col gap-6">
      <Tabs
        value={currentAccount.accountId}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className=" mb-8 flex w-full flex-nowrap">
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
