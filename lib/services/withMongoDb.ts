import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import mongooseClient from "./mongooseClient";
import { User } from "@clerk/backend";

export interface NextRequestWithUser extends NextRequest {
  user: User;
}
export const withMongoDb = (
  handler: (req: NextRequestWithUser) => Promise<NextResponse>
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

      const response = await mongooseClient.runWithConnection(() => {
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
