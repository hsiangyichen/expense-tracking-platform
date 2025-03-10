// import React from "react";
// import { BankCard } from "@/components/BankCard";
// import { RightSidebarProps } from "./RightSidebar.types";
// import { PlaidLink } from "@/components/PlaidLink";
// import { getCategorizedTransactions } from "@/lib/actions/category.action";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ClickableCategory } from "@/components/ClickableCategory";

// // Define mock budget data
// const mockBudgetData: { [key: string]: number } = {
//   INCOME: 5000,
//   "TRANSFER IN": 500,
//   "TRANSFER OUT": 500,
//   "LOAN PAYMENTS": 800,
//   "BANK FEES": 50,
//   ENTERTAINMENT: 200,
//   "FOOD AND DRINK": 750,
//   "GENERAL MERCHANDISE": 400,
//   "HOME IMPROVEMENT": 200,
//   MEDICAL: 150,
//   "PERSONAL CARE": 50,
//   "GENERAL SERVICES": 200,
//   "GOVERNMENT AND NON PROFIT": 50,
//   TRANSPORTATION: 250,
//   TRAVEL: 500,
//   "RENT AND UTILITIES": 1200,
// };

// const RightSidebar = async ({ user, accounts }: RightSidebarProps) => {
//   // Fetch categorized transactions
//   const categorizedData = await getCategorizedTransactions(user?.id);

//   // Map the new structure to match the expected format for ClickableCategory
//   const mappedCategories = categorizedData.categories.map((category) => ({
//     category: {
//       value: category.name.toLowerCase().replace(/\s+/g, "-"),
//       label: category.name,
//     },
//     transactions: category.transactions,
//     totalAmount: category.totalAmount,
//     percentage: category.percentage,
//     count: category.count,
//   }));

//   // Filter categories with transactions
//   const categoriesWithTransactions = mappedCategories.filter(
//     (item) => item.transactions.length > 0
//   );

//   // Sort by amount (highest first) and take top 5
//   const topCategories = [...categoriesWithTransactions]
//     .sort((a, b) => Math.abs(b.totalAmount) - Math.abs(a.totalAmount))
//     .slice(0, 5);

//   return (
//     <aside className="flex-col lg:flex hidden w-[365px] py-12 pr-8 h-screen">
//       <section className="flex flex-col justify-between gap-8 px-6 p-12 pt-6 rounded-xl border border-stone-200 shadow-sm mb-8">
//         <div className="flex w-full justify-between">
//           <h2 className="header-2">My Cards</h2>
//           <PlaidLink user={user} type="right-sidebar" />
//         </div>
//         {accounts?.length > 0 && (
//           <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
//             <div className="relative z-10 right-3">
//               <BankCard
//                 key={accounts[0].balanceCurrent}
//                 account={accounts[0]}
//                 userName={`${user.firstName} ${user.lastName}`}
//                 showBalance={false}
//               />
//             </div>
//             {accounts[1] && (
//               <div className="absolute -right-2 top-6 z-0 w-[90%]">
//                 <BankCard
//                   key={accounts[1].balanceCurrent}
//                   account={accounts[1]}
//                   userName={`${user.firstName} ${user.lastName}`}
//                   showBalance={false}
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </section>

//       {/* Categories Section */}
//       <section className="flex-1 overflow-y-auto flex flex-col rounded-xl border border-stone-200 shadow-sm">
//         <div className="flex-shrink-0 px-6 py-6 flex w-full justify-between">
//           <h2 className="header-2">Categories</h2>
//           <Link
//             href={`/budget-and-categories`}
//             className="text-14 flex items-center gap-2 font-medium text-stone-500 hover:text-stone-800"
//           >
//             <span>View All</span>
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//         <ScrollArea className="flex-grow px-6 pb-6">
//           <div className="space-y-3">
//             {topCategories.map((item) => (
//               <ClickableCategory
//                 key={item.category.value}
//                 item={item}
//                 budget={
//                   mockBudgetData[item.category.label.toUpperCase()] || 1000
//                 }
//               />
//             ))}
//           </div>
//         </ScrollArea>
//         {categoriesWithTransactions.length === 0 && (
//           <div className="py-6 text-center text-gray-500 text-sm">
//             No categories available
//           </div>
//         )}
//       </section>
//     </aside>
//   );
// };

// export default RightSidebar;
import React from "react";

const RightSidebar = () => {
  return <div></div>;
};

export default RightSidebar;
