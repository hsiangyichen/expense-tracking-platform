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

const HomeRecentTransactions = ({
  accounts,
  transactions,
}: HomeRecentTransactionsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultAccountId = accounts.length > 0 ? accounts[0].accountId : "";
  const selectedAccountId = searchParams.get("id") || defaultAccountId;

  const [currentTab, setCurrentTab] = useState(
    searchParams.get("id") || accounts[0].accountId
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
    <section className="flex-1 w-full flex flex-col overflow-hidden">
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
      <Tabs
        value={selectedAccountId}
        onValueChange={handleAccountChange}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <ScrollArea className="w-full whitespace-nowrap shrink-0 h-12">
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
          className="flex-1 overflow-y-auto no-scroll"
        >
          <TransactionsTable
            transactions={transactions.filter(
              (tx) => tx.accountId === currentTab
            )}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-4 xl:hidden ">
        {accounts.map((account) => {
          const accountTransactions = transactions.filter(
            (tx) => tx.accountId === account.accountId
          );

          return (
            selectedAccountId === account.accountId && (
              <div key={account.id} className="space-y-4">
                <TransactionsTable transactions={accountTransactions} />
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};

export default HomeRecentTransactions;
