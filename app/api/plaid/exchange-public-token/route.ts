import { NextResponse } from "next/server";
import { exchangePublicToken } from "@/lib/actions/plaid.action";

export async function POST(request: Request) {
  try {
    const { public_token, userId } = await request.json();

    if (!public_token) {
      return NextResponse.json(
        { error: "public_token is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const result = await exchangePublicToken(public_token, userId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error exchanging public token:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }
}
