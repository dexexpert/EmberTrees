import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ember Trees - Hello World",
  description: "A simple Hello World project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
