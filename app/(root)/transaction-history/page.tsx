import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountStats } from "@/lib/actions/account.action";
import { Notfound } from "@/components/Notfound";
import { HeaderBox } from "@/components/HeaderBox";

const TransactionHistory = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  let accountStats;
  try {
    accountStats = await getAccountStats(user.id);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    redirect("/");
  }

  if (accountStats.accounts.length === 0) {
    return (
      <section className="flex flex-col w-full gap-5 lg:gap-8 px-5 sm:px-8 pt-0 pb-5 sm:pb-8 md:py-6 lg:py-10">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="title"
            title="Transaction History"
            subtext="View your transaction history for this account."
          />
        </header>
        <Notfound item="transactions" />
      </section>
    );
  }

  redirect(`/transaction-history/${accountStats.accounts[0].accountId}`);
};

export default TransactionHistory;
