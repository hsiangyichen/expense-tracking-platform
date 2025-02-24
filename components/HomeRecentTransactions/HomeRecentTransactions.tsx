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

const HomeRecentTransactions = ({
  accounts,
  transactions,
}: HomeRecentTransactionsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultAccountId = accounts.length > 0 ? accounts[0].accountId : "";
  const selectedAccountId = searchParams.get("id") || defaultAccountId;

  const handleAccountChange = (accountId: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: accountId,
    });
    router.replace(newUrl, { scroll: false });
  };

  return (
    <section className="flex w-full flex-col flex-1 overflow-y-hidden">
      <header className="flex items-center justify-between mb-4">
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
        className="w-full hidden lg:flex flex-col flex-1 h-screen"
      >
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="mb-6 w-full inline-flex">
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
        {accounts.map((account) => {
          const accountTransactions = transactions.filter(
            (tx) => tx.accountId === account.accountId
          );

          return (
            <TabsContent
              key={account.id}
              value={account.accountId}
              className="flex-1 overflow-y-scroll no-scrollbar"
            >
              <>
                <TransactionsTable transactions={accountTransactions} />
              </>
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="mt-4 xl:hidden">
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
