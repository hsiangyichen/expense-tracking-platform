"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountTabItem } from "@/components/AccountTabItem";
import { TransactionsTable } from "@/components/TransactionsTable";
import { formUrlQuery } from "@/lib/utils";
import { HomeRecentTransactionsProps } from "./HomeRecentTransactions.types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useState } from "react";
import { Notfound } from "@/components/Notfound";

const HomeRecentTransactions = ({
  accounts,
  transactions,
}: HomeRecentTransactionsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultAccountId = accounts.length > 0 ? accounts[0].accountId : "";
  const selectedAccountId = searchParams.get("id") || defaultAccountId;

  const [currentTab, setCurrentTab] = useState(
    searchParams.get("id") || (accounts.length > 0 ? accounts[0].accountId : "")
  );

  const handleAccountChange = (accountId: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: accountId,
    });

    setCurrentTab(accountId);

    router.replace(newUrl, { scroll: false });
  };

  return (
    <section className="flex flex-col h-full">
      {accounts.length > 0 ? (
        <Tabs
          value={selectedAccountId}
          onValueChange={handleAccountChange}
          className="flex flex-col h-full"
        >
          <ScrollArea className="w-full h-12 flex-shrink-0">
            <TabsList className="w-full inline-flex mb-0">
              {accounts.map((account) => (
                <TabsTrigger
                  key={account.id}
                  value={account.accountId}
                  className="p-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  <AccountTabItem
                    account={account}
                    isActive={selectedAccountId === account.accountId}
                    urlStrategy="query"
                  />
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
          <div className="flex-1 min-h-0 rounded-xl">
            <TabsContent
              value={currentTab}
              className="h-full mt-0 rounded-xl overflow-hidden"
            >
              <div className="h-full overflow-auto">
                <TransactionsTable
                  transactions={transactions.filter(
                    (tx) => tx.accountId === currentTab
                  )}
                  type="home"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="py-5 lg:py-8">
          <Notfound item="transactions" />
        </div>
      )}
    </section>
  );
};

export default HomeRecentTransactions;
