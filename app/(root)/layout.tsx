import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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

  return (
    <main className="flex h-screen w-full">
      <div className="flex size-full flex-col">{children}</div>
    </main>
  );
}
