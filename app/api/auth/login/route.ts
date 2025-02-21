import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const errorUrl = new URL("/error", req.nextUrl);
  const dashboardUrl = new URL("/", req.nextUrl);

  try {
    return NextResponse.redirect(dashboardUrl);
  } catch {
    return NextResponse.redirect(errorUrl);
  }
};
