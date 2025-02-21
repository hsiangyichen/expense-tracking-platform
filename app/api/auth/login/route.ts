import { syncUserWithAppwrite } from "@/lib/actions/user.action";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const errorUrl = new URL("/error", req.nextUrl);
  const dashboardUrl = new URL("/", req.nextUrl);

  try {
    await syncUserWithAppwrite();

    return NextResponse.redirect(dashboardUrl);
  } catch {
    return NextResponse.redirect(errorUrl);
  }
};
