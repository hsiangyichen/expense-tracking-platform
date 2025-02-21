"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountInfo } from "@/components/AccountInfo";
import { AccountTabItem } from "@/components/AccountTabItem";
import { TransactionsTable } from "@/components/TransactionsTable";
import { Pagination } from "@/components/Pagination";
import { formUrlQuery } from "@/lib//utils";
import { RecentTransactionsProps } from "./RecentTransactions.types";

const ROWS_PER_PAGE = 10;

const RecentTransactions = ({
  accounts = [],
  transactions = [],
}: Omit<RecentTransactionsProps, "page">) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams?.get("page") || "1");

  const urlAccountId = searchParams?.get("id");
  const [selectedAccountId, setSelectedAccountId] = useState(
    urlAccountId && accounts.some((acc) => acc.accountId === urlAccountId)
      ? urlAccountId
      : accounts[0]?.accountId || ""
  );

  useEffect(() => {
    if (
      urlAccountId &&
      accounts.some((acc) => acc.accountId === urlAccountId)
    ) {
      setSelectedAccountId(urlAccountId);
    }
  }, [urlAccountId, accounts]);

  // Filter and paginate transactions
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.accountId === selectedAccountId
  );

  const totalPages = Math.ceil(filteredTransactions.length / ROWS_PER_PAGE);

  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Handle tab changes
  const handleTabChange = (accountId: string) => {
    setSelectedAccountId(accountId);

    const newUrl = formUrlQuery({
      params: searchParams?.toString() || "",
      key: "page",
      value: "1",
    });

    router.push(newUrl, { scroll: false });
  };

  if (accounts.length === 0) {
    return <div className="p-4">No accounts available</div>;
  }

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
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

      <Tabs
        value={selectedAccountId}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="custom-scrollbar mb-8 flex w-full flex-nowrap">
          {accounts.map((account) => (
            <TabsTrigger
              key={account.id}
              value={account.accountId}
              className="p-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              <AccountTabItem
                account={account}
                isActive={selectedAccountId === account.accountId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account) => (
          <TabsContent
            key={account.id}
            value={account.accountId}
            className="space-y-4"
          >
            <AccountInfo
              account={account}
              accountId={account.accountId}
              type="full"
            />

            {filteredTransactions.length > 0 ? (
              <>
                <TransactionsTable transactions={displayedTransactions} />

                {totalPages > 1 && (
                  <div className="my-4 w-full">
                    <Pagination totalPages={totalPages} page={currentPage} />
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No transactions for this account
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
