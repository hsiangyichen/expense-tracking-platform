import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { Products, CountryCode } from "plaid";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const createTokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: "Expense Tracking Platform",
      products: [Products.Auth, Products.Transactions],
      language: "en",
      redirect_uri: process.env.NEXT_PUBLIC_API_URL,
      country_codes: [CountryCode.Us],
    });

    return NextResponse.json({
      link_token: createTokenResponse.data.link_token,
    });
  } catch (error) {
    console.error("Error creating link token:", error);
    return NextResponse.json(
      { error: "Failed to create link token" },
      { status: 500 }
    );
  }
}
