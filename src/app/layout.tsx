import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";
import "@/components/MagicBento.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pullse - AI-Powered Customer Support Platform",
  description: "Unify all customer conversations, automate with AI, and deliver exceptional support experiences at scale with Pullse.",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={inter.className} suppressHydrationWarning>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
