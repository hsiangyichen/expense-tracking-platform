import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between items-center">
      {children}
      <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-[#f2f3f3] max-lg:hidden">
        <div>
          <Image
            src="/images/home-page-image.png"
            alt="Home Page image"
            width={500}
            height={500}
            className="w-full object-contain rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
