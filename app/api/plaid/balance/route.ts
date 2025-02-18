import withMongoDb from "@/lib/services/withMongoDb";
import { NextResponse } from "next/server";

export const GET = withMongoDb(
  async (req) => {
    console.log("ACCESS TOKEN!!!", req.plaid_access_token);
    try {
      return NextResponse.json({
        code: 200,
        message: "OK",
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
  },
  {
    plaid: true,
  }
);
