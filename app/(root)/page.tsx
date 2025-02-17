import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

const Home = async () => {
  const loggedIn = await currentUser();

  if (!loggedIn) {
    throw new Error("You must be signed in to use this feature");
  }

  const userData = {
    id: loggedIn.id,
    firstName: loggedIn.firstName,
    lastName: loggedIn.lastName,
    email: loggedIn.emailAddresses[0].emailAddress,
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={userData?.firstName || "Guest"}
            subtext="Access and manage your account anf transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.32}
          />
        </header>
        Recent Transactions
      </div>
      <RightSidebar
        user={userData}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 500.23 }]}
      />
    </section>
  );
};

export default Home;
