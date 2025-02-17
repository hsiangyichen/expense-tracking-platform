import { currentUser } from "@clerk/nextjs/server";
import HttpStatusCode from "@/types/HttpStatusCode";
import { NextRequest, NextResponse } from "next/server";
import mongooseClient from "./mongooseClient";
import { STATUS_CODES } from "http";
import { User } from "@clerk/backend";

export interface NextRequestWithUser extends NextRequest {
  user: User;
}
export const withMongoDb = (
  handler: (req: NextRequestWithUser) => Promise<NextResponse>
) => {
  return async (req: NextRequestWithUser): Promise<NextResponse> => {
    // Fix return type
    try {
      const user = await currentUser();

      if (!user) {
        return NextResponse.json(
          {
            code: HttpStatusCode.UNAUTHORIZED,
            message: STATUS_CODES[HttpStatusCode.UNAUTHORIZED],
          },
          { status: HttpStatusCode.UNAUTHORIZED }
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
          code: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: STATUS_CODES[HttpStatusCode.INTERNAL_SERVER_ERROR],
        },
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
      );
    }
  };
};

export default withMongoDb;
