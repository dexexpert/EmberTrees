import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmberTrees - Premium Cannabis Delivery",
  description: "High-quality cannabis products delivered safely to your door",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#1f1f1f"}}>
      <body className={inter.className}>
        <Navbar />
        <div className="mt-[-100px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
