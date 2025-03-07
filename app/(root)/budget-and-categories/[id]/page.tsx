import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { HeaderBox } from "@/components/HeaderBox";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategorizedTransactions } from "@/lib/actions/category.action";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageProps } from "@/.next/types/app/layout";
import { BudgetModal } from "@/components/BudgetModal";
import { CategoryPieChart } from "@/components/CategoryPieChart";

const BudgetAndCategories = async ({ params }: PageProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const { id: categorySlug } = await params;
  const categoryName = categorySlug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const categorizedTransactions = await getCategorizedTransactions(user.id);

  const categoryData = categorizedTransactions.categories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!categoryData) {
    redirect("/budget-and-categories");
  }

  const sortedTransactions = [...categoryData.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="flex flex-col w-full gap-5 lg:gap-8 px-5 sm:px-8 pb-10 lg:pt-12">
      <Link
        href="/budget-and-categories"
        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Budget Overview
      </Link>

      <header className="flex flex-col justify-between">
        <HeaderBox
          type="title"
          title={`${categoryName} Transactions`}
          subtext={`Viewing all transactions in the ${categoryName} category.`}
        />
      </header>

      <div className="flex">
        <Card className="border-stone-200 shadow-sm w-full">
          <div className="flex w-full justify-between items-center">
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <BudgetModal
              categoryName={categoryName}
              currentBudget={categoryData.budgetAmount}
            />
          </div>
          <CardContent className="flex items-center">
            <CategoryPieChart
              totalSpent={categoryData.totalAmount}
              budget={categoryData.budgetAmount}
            />
          </CardContent>
        </Card>
      </div>
      <Card className="border-stone-200 shadow-sm">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.merchantName || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}

              {sortedTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No transactions found in this category.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default BudgetAndCategories;
