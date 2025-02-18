import { plaidClient } from "@/lib/services/plaidClient";
import withMongoDb from "@/lib/services/withMongoDb";
import { NextResponse } from "next/server";
import { CountryCode, Products } from "plaid";

export const POST = withMongoDb(async (req) => {
  const { user } = req;

  const plaidRequest = {
    user: {
      client_user_id: user.id,
    },
    client_name: "Plaid Test App",
    products: [Products.Auth],
    language: "en",
    redirect_uri: "http://localhost:3000/",
    country_codes: [CountryCode.Us],
  };

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);

    return NextResponse.json({
      code: 200,
      message: "OK",
      data: createTokenResponse.data,
    });
  } catch {
    return NextResponse.json(
      {
        code: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
});
