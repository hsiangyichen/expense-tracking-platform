import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { HistoryRecentTransactions } from "@/components/HistoryRecentTransactions";
import { getAccountStats } from "@/lib/actions/account.action";
import { getFilteredTransactions } from "@/lib/actions/transaction.action";
import { PageProps } from "@/.next/types/app/layout";
import { HeaderBox } from "@/components/HeaderBox";

const TransactionHistory = async ({ params, searchParams }: PageProps) => {
  const { id: accountId } = await params;
  const pageParam = await searchParams;

  if (!accountId) {
    console.error("Error: Missing accountId");
    redirect("/");
  }

  const page = pageParam?.page ? parseInt(pageParam.page) : 1;

  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  let accountStats;
  try {
    accountStats = await getAccountStats(user.id);
  } catch (error) {
    console.error("Error fetching account stats:", error);
    redirect("/");
  }

  const currentAccount = accountStats.accounts.find(
    (acc) => acc.accountId === accountId
  );
  if (!currentAccount) {
    console.error("Error: Account not found");
    redirect("/");
  }

  let transactionResponse;
  try {
    transactionResponse = await getFilteredTransactions(user.id, {
      accountId,
      page,
      limit: 20,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    redirect("/");
  }

  return (
    <section className="flex flex-col w-full md:h-screen gap-5 lg:gap-6 px-5 sm:px-8 pt-0 pb-5 sm:pb-8 md:py-6 lg:py-10">
      <header className="flex flex-col justify-between flex-shrink-0">
        <HeaderBox
          type="title"
          title="Transaction History"
          subtext="View your transaction history for this account."
        />
      </header>
      <div className="flex-1 min-h-0">
        <HistoryRecentTransactions
          accounts={accountStats.accounts}
          currentAccount={currentAccount}
          initialTransactions={transactionResponse.transactions}
          totalPages={transactionResponse.totalPages}
          currentPage={page}
        />
      </div>
    </section>
  );
};

export default TransactionHistory;
