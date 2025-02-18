import { plaidClient } from "@/lib/services/plaidClient";
import withMongoDb from "@/lib/services/withMongoDb";
import { NextResponse } from "next/server";

export const POST = withMongoDb(async (req) => {
  const { publicToken } = await req.json();

  if (!publicToken) {
    return NextResponse.json(
      {
        code: 400,
        message: "Bad Request",
      },
      { status: 400 }
    );
  }

  try {
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    return NextResponse.json({
      code: 200,
      message: "OK",
      data: plaidResponse.data.access_token,
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
