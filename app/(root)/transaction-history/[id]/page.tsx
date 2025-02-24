import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { HeaderBox } from "@/components/HeaderBox";
import { HistoryRecentTransactions } from "@/components/HistoryRecentTransactions";
import { getAccountStats } from "@/lib/actions/account.action";
import { getFilteredTransactions } from "@/lib/actions/transaction.action";
import { PageProps } from "@/.next/types/app/layout";

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
    <section className="flex w-full max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="flex w-full flex-col gap-8 px-5 sm:px-8 py-8 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="title"
            title={`Transaction History`}
            subtext="View your transaction history for this account."
          />
        </header>
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
