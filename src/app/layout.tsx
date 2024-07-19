import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["900", "700", "500"],
});

export const metadata: Metadata = {
  title: "Country Page - WorldRanks",
  description: "Country Page - WorldRanks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={beVietnam.className}>{children}</body>
    </html>
  );
}
