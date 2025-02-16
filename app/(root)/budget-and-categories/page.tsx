import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const BudgetAndCategories = () => {
  const categories = [
    { name: "Food", budget: 500, spent: 350 },
    { name: "Transportation", budget: 200, spent: 180 },
    { name: "Entertainment", budget: 300, spent: 150 },
    { name: "Shopping", budget: 400, spent: 420 },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Budget & Categories</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Spent: ${category.spent}
                </span>
                <span className="text-sm font-medium">
                  Budget: ${category.budget}
                </span>
              </div>
              <Progress
                value={(category.spent / category.budget) * 100}
                className="h-2"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                {((category.spent / category.budget) * 100).toFixed(0)}% of
                budget used
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BudgetAndCategories;
