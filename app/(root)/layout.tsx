import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <main className="flex h-screen w-full">
      <Sidebar user={userData} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
          <div>
            <MobileNav user={userData} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
