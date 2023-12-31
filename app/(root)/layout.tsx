import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSidebar from "@/components/navbar/LeftSidebar";
import { EdgeStoreProvider } from "@/libs/edgestore";
import MobileNav from "@/components/navbar/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dating",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="flex flex-col md:flex-row">
            <MobileNav />
            <LeftSidebar />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
