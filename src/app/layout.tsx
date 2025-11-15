import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      {/* Google Analytics 4 with Consent Mode v2 - Scripts in head for detection */}
      {gaId && (
        <>
          {/* Step 1: Initialize dataLayer and set default consent BEFORE GA4 loads */}
          <Script
            id="google-consent-mode-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                // Set default consent state to 'denied' (privacy-first approach)
                // Client-side Analytics component will update to 'granted' if user accepts
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'wait_for_update': 500
                });

                // Enable advanced consent mode features
                gtag('set', 'ads_data_redaction', true);
                gtag('set', 'url_passthrough', true);

                gtag('js', new Date());
              `,
            }}
          />

          {/* Step 2: Load Google Analytics gtag.js script */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="beforeInteractive"
          />

          {/* Step 3: Configure GA4 measurement */}
          <Script
            id="google-analytics-config"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('config', '${gaId}', {
                  'anonymize_ip': true,
                  'cookie_flags': 'SameSite=None;Secure'
                });
              `,
            }}
          />
        </>
      )}
    </head>
    <body className={inter.className} suppressHydrationWarning>
      <Providers>{children}</Providers>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
