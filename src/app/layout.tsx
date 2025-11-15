import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Providers from "./providers";
import Analytics from "@/components/Analytics";
import "./globals.css";
import "@/components/MagicBento.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pullse - AI-Powered Customer Support Platform",
  description: "Unify all customer conversations, automate with AI, and deliver exceptional support experiences at scale with Pullse.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) - Required immediately after <body> */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
