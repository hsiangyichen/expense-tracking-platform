import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountStats } from "@/lib/actions/account.action";

const TransactionHistory = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  try {
    const accountStats = await getAccountStats(user.id);

    if (accountStats.accounts.length === 0) {
      redirect("/");
    }
    redirect(`/transaction-history/${accountStats.accounts[0].accountId}`);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    redirect("/");
  }
};

export default TransactionHistory;
