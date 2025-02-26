import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
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
      {transactionResponse.transactions.length > 0 ? (
        <HistoryRecentTransactions
          accounts={accountStats.accounts}
          currentAccount={currentAccount}
          initialTransactions={transactionResponse.transactions}
          totalPages={transactionResponse.totalPages}
          currentPage={page}
        />
      ) : (
        <p className="text-center text-stone-800">No transactions found.</p>
      )}
    </section>
  );
};

export default TransactionHistory;
