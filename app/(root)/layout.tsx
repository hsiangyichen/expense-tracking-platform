import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { setToken } from "@/lib/api/axios";
// import { fetchBalance } from "@/lib/api/plaid";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedIn, { getToken }] = await Promise.all([currentUser(), auth()]);
  const token = await getToken();

  if (!loggedIn || !token) {
    redirect("/");
  }

  setToken(token);

  // const balanceRes = await fetchBalance();

  const user = {
    id: loggedIn?.id ?? "",
    firstName: loggedIn?.firstName ?? "Guest",
    lastName: loggedIn?.lastName ?? "",
    email: loggedIn?.emailAddresses?.[0]?.emailAddress ?? "",
  };

  return (
    <main className="flex h-screen w-full">
      <Sidebar user={user} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
          <div>
            <MobileNav user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
