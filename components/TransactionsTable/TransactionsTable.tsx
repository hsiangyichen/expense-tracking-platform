import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CreditCard } from "lucide-react";
import { TransactionTableProps } from "./TransactionsTable.types";

const TransactionsTable = ({
  transactions,
  type = "home",
}: TransactionTableProps) => {
  const formatAmount = (amount: number) => {
    const isOutflow = amount >= 0;
    const formattedAmount = Math.abs(amount).toFixed(2);
    return {
      text: `${isOutflow ? "-" : "+"} $${formattedAmount}`,
      className: isOutflow ? "text-red-500" : "text-green-500",
    };
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }

      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
        year: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Format date has error", error);
      return dateString;
    }
  };

  const formatPaymentMethod = (method: string) => {
    if (!method) return "Card";

    const formatted = method
      .replace(/_|-/g, " ")
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );

    return formatted;
  };

  const isHistory = type === "history";

  return (
    <div className={`flex flex-col overflow-hidden`}>
      <div className="flex-1 overflow-auto">
        <Table>
          <TableCaption className="hidden">
            Your recent transactions
          </TableCaption>
          <TableHeader>
            <TableRow className="border-transparent">
              <TableHead className="px-2 sticky top-0 bg-white">
                Merchant
              </TableHead>
              <TableHead className="px-2 sticky top-0 bg-white">Date</TableHead>
              <TableHead className="px-2 sticky top-0 bg-white">
                Amount
              </TableHead>
              {isHistory && (
                <>
                  <TableHead className="px-2 sticky top-0 bg-white">
                    Category
                  </TableHead>
                  <TableHead className="px-2 sticky top-0 bg-white whitespace-nowrap">
                    Payment Method
                  </TableHead>
                  <TableHead className="px-2 sticky top-0 bg-white">
                    Status
                  </TableHead>
                </>
              )}
              {!isHistory && (
                <TableHead className="px-2 sticky top-0 bg-white">
                  Category
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              const { text: amountText, className: amountClass } = formatAmount(
                transaction.amount
              );
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium min-w-fit">
                    <div className="flex items-center gap-4 py-2">
                      {transaction.image ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={transaction.image}
                            alt={transaction.merchantName || transaction.name}
                            width={32}
                            height={32}
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                          <CreditCard className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <span className="flex-1">
                        {transaction.merchantName || transaction.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className={`text-nowrap ${amountClass}`}>
                    {amountText}
                  </TableCell>
                  <TableCell className="w-32">
                    <CategoryBadge category={transaction.category} />
                  </TableCell>

                  {isHistory && (
                    <>
                      <TableCell className="whitespace-nowrap">
                        {formatPaymentMethod(transaction.paymentChannel)}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.pending
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {transaction.pending ? "Pending" : "Completed"}
                        </span>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsTable;
