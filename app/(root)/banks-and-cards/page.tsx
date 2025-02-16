import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BanksAndCards = () => {
  const connectedBanks = [
    { name: "Bank A", lastSync: "2023-04-01", balance: "$5,432.10" },
    { name: "Bank B", lastSync: "2023-04-02", balance: "$3,210.54" },
    { name: "Credit Card C", lastSync: "2023-04-03", balance: "-$1,234.56" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Banks and Cards</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {connectedBanks.map((bank) => (
          <Card key={bank.name}>
            <CardHeader>
              <CardTitle>{bank.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Last synced: {bank.lastSync}
              </p>
              <p className="text-xl font-semibold mt-2">{bank.balance}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BanksAndCards;
