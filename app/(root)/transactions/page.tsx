import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Transactions = () => {
  const transactions = [
    {
      id: 1,
      date: "2023-04-01",
      description: "Grocery Store",
      amount: -85.43,
      category: "Food",
    },
    {
      id: 2,
      date: "2023-04-02",
      description: "Gas Station",
      amount: -45.0,
      category: "Transportation",
    },
    {
      id: 3,
      date: "2023-04-03",
      description: "Online Shopping",
      amount: -129.99,
      category: "Shopping",
    },
    {
      id: 4,
      date: "2023-04-04",
      description: "Salary Deposit",
      amount: 3000.0,
      category: "Income",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
      <div className="mb-4">
        <Label htmlFor="search">Search Transactions</Label>
        <Input
          id="search"
          placeholder="Search by description or category..."
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell
                  className={
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Transactions;
