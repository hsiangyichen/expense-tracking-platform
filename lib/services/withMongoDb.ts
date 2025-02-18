import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import mongooseClient from "./mongooseClient";
import { User } from "@clerk/backend";

export interface NextRequestWithUser extends NextRequest {
  user: User;
  plaid_access_token?: string;
}

export const withMongoDb = (
  handler: (req: NextRequestWithUser) => Promise<NextResponse>,
  options?: {
    plaid?: boolean;
  }
) => {
  return async (req: NextRequestWithUser): Promise<NextResponse> => {
    try {
      const user = await currentUser();

      if (!user) {
        return NextResponse.json(
          {
            code: 401,
            message: "Unauthorized",
          },
          { status: 401 }
        );
      }

      const accessToken = req.headers.get("plaid_access_token");

      if (options?.plaid && !accessToken) {
        return NextResponse.json(
          {
            code: 401,
            message: "Unauthorized",
          },
          { status: 401 }
        );
      }

      const response = await mongooseClient.runWithConnection(() => {
        if (options?.plaid && accessToken) {
          req.plaid_access_token = accessToken;
        }

        req.user = user;
        return handler(req);
      });

      return response;
    } catch {
      return NextResponse.json(
        {
          code: 500,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  };
};

export default withMongoDb;
