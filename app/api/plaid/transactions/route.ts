import { NextResponse } from "next/server";
import { fetchAndStoreTransactions } from "@/lib/actions/transaction.action";
import { getTransactionsByAccountId } from "@/lib/actions/transaction.action";

export async function GET(
  request: Request,
  { params }: { params: { accountId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const accountId = params.accountId;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (!accountId) {
      return NextResponse.json(
        { error: "accountId is required" },
        { status: 400 }
      );
    }

    const transactions = await getTransactionsByAccountId(userId, accountId);

    return NextResponse.json({
      success: true,
      transactions,
      totalTransactions: transactions.length,
    });
  } catch (error) {
    console.error("Error fetching account transactions:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch account transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, itemId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (!itemId) {
      return NextResponse.json(
        { error: "itemId is required" },
        { status: 400 }
      );
    }

    const result = await fetchAndStoreTransactions(userId, itemId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching transactions:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
