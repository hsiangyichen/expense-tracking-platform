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
import { AccountInfo } from "@/components/AccountInfo";
import { AccountTabItem } from "@/components/AccountTabItem";
import { TransactionsTable } from "@/components/TransactionsTable";
import type { PlaidAccountItem, PlaidTransaction } from "@/types";
import { formUrlQuery } from "@/lib/utils";

interface HomeRecentTransactionsProps {
  accounts: PlaidAccountItem[];
  transactions: PlaidTransaction[];
}

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
    <section className="flex w-full flex-col">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-20 md:text-24 font-semibold text-gray-900">
          Recent transactions
        </h2>
        <Link
          href={`/transaction-history/${selectedAccountId}`}
          className="text-14 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          View all
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
        className="w-full hidden lg:block"
      >
        <TabsList className="mb-6 flex w-full">
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

        {accounts.map((account) => {
          const accountTransactions = transactions.filter(
            (tx) => tx.accountId === account.accountId
          );

          return (
            <TabsContent
              key={account.id}
              value={account.accountId}
              className="space-y-4"
            >
              <>
                <TransactionsTable transactions={accountTransactions} />

                {accountTransactions.length > 10 && (
                  <div className="my-4 w-full">{/* <Pagination /> */}</div>
                )}
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
                {accountTransactions.length > 10 && (
                  <div className="my-4 w-full">{/* <Pagination /> */}</div>
                )}
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};

export default HomeRecentTransactions;
