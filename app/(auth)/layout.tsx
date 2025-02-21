import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between items-center">
      {children}
      <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-neutral-50 max-lg:hidden">
        <div>
          <Image
            src="/icons/auth-image.svg"
            alt="Auth image"
            width={500}
            height={500}
            className="rounded-l-xl object-contain"
          />
        </div>
      </div>
    </main>
  );
}
