import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { CategoryBadge } from "@/components/CategoryBadge";
import { TransactionTableProps } from "./TransactionsTable.types";

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
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

  return (
    <Table>
      <TableCaption>Your recent transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-2">Merchant</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="pl-6">Channel</TableHead>
          <TableHead className="px-2 ">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
              No transactions found
            </TableCell>
          </TableRow>
        ) : (
          transactions.map((transaction) => {
            const { text: amountText, className: amountClass } = formatAmount(
              transaction.amount
            );

            return (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium w-auto max-w-32">
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
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    )}
                    <span>{transaction.merchantName || transaction.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-nowrap">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className={`text-nowrap ${amountClass}`}>
                  {amountText}
                </TableCell>
                <TableCell className="pl-6 capitalize">
                  {transaction.paymentChannel}
                </TableCell>
                <TableCell className="w-32">
                  <CategoryBadge category={transaction.category} />
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
