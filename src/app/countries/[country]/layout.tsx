import { Be_Vietnam_Pro } from "next/font/google";
import { ReactNode } from "react";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["900", "700", "500", "400"],
});

export default function CountryLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
