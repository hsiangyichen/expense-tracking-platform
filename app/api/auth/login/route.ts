import withMongoDb from "@/lib/services/withMongoDb";
import userSchema from "@/lib/schemas/user.schema";
import { NextResponse } from "next/server";

const POST = withMongoDb(async (req) => {
  // Upsert user in database and return user record from DB
  const data = await userSchema.findOneAndUpdate(
    { clerkId: req.user.id },
    {
      clerkId: req.user.id,
      email: req.user.emailAddresses[0].emailAddress,
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({
    code: 200,
    message: "OK",
    data,
  });
});

export { POST };
