// import { NextResponse } from "next/server";
// import { fetchAndStoreAccounts } from "@/lib/actions/account.action";

// export async function POST(request: Request) {
//   try {
//     const { userId, itemId } = await request.json();

//     if (!userId) {
//       return NextResponse.json(
//         { error: "userId is required" },
//         { status: 400 }
//       );
//     }

//     if (!itemId) {
//       return NextResponse.json(
//         { error: "itemId is required" },
//         { status: 400 }
//       );
//     }

//     const result = await fetchAndStoreAccounts(userId, itemId);

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error fetching accounts:", error);

//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }

//     return NextResponse.json(
//       { error: "Failed to fetch accounts" },
//       { status: 500 }
//     );
//   }
// }
