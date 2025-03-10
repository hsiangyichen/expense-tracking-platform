"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountTabItem } from "@/components/AccountTabItem";
import { TransactionsTable } from "@/components/TransactionsTable";
import { formUrlQuery } from "@/lib/utils";
import { HomeRecentTransactionsProps } from "./HomeRecentTransactions.types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ArrowRight } from "lucide-react";
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
    <section className="flex-1 w-full flex flex-col lg:overflow-hidden">
      <header className="w-full shrink-0 flex justify-between pb-2">
        <h2 className="text-20 md:text-24 font-semibold text-gray-900">
          Recent transactions
        </h2>
        <Link
          href={`/transaction-history/${selectedAccountId}`}
          className="text-14 flex items-center gap-2 font-medium text-stone-500 hover:text-stone-800"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>
      {accounts.length > 0 && (
        <div className="lg:hidden">
          <Select value={selectedAccountId} onValueChange={handleAccountChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.accountId}>
                  {account.institutionName} - {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {accounts.length > 0 ? (
        <Tabs
          value={selectedAccountId}
          onValueChange={handleAccountChange}
          className="xl:overflow-hidden h-full lg:flex-1 lg:flex lg:flex-col hidden"
        >
          <ScrollArea className="w-full shrink-0 h-12">
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

          <TabsContent
            value={currentTab}
            className="h-full md:overflow-y-auto bg-blue-100 px-6"
          >
            <TransactionsTable
              transactions={transactions.filter(
                (tx) => tx.accountId === currentTab
              )}
              type="home"
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="py-5 lg:py-8">
          <Notfound item="transactions" />
        </div>
      )}

      <div className="mt-4 lg:hidden">
        {accounts.map((account) => {
          const accountTransactions = transactions.filter(
            (tx) => tx.accountId === account.accountId
          );

          return (
            selectedAccountId === account.accountId && (
              <div key={account.id} className="space-y-4">
                <TransactionsTable
                  transactions={accountTransactions}
                  type="home"
                />
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};

export default HomeRecentTransactions;
