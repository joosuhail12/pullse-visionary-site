import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import Providers from "./providers";
import Analytics from "@/components/Analytics";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import ScrollTracker from "@/components/analytics/ScrollTracker";
import EngagementTracker from "@/components/analytics/EngagementTracker";
import OrganizationSchema from "@/components/structured-data/OrganizationSchema";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import "./globals.css";
import "@/components/MagicBento.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.pullse.ai"
  ),
  title: "Pullse - AI-Powered Customer Support Platform",
  description:
    "Unify all customer conversations, automate with AI, and deliver exceptional support experiences at scale with Pullse.",
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      {/* Performance: Preconnect to external domains for faster resource loading */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://cdn.sanity.io" />

      {/* Google Analytics 4 with Consent Mode v2 - Scripts in head for detection */}
      {gaId && (
        <>
          {/* Step 1: Initialize dataLayer and set default consent BEFORE GA4 loads */}
          <Script
            id="google-consent-mode-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html:
                "window.dataLayer = window.dataLayer || [];" +
                "function gtag(){dataLayer.push(arguments);}" +
                "gtag('consent', 'default', {" +
                  "'analytics_storage': 'denied'," +
                  "'ad_storage': 'denied'," +
                  "'ad_user_data': 'denied'," +
                  "'ad_personalization': 'denied'," +
                  "'wait_for_update': 500" +
                "});" +
                "gtag('set', 'ads_data_redaction', true);" +
                "gtag('set', 'url_passthrough', true);" +
                "gtag('js', new Date());"
            }}
          />

          {/* Step 2: Load Google Analytics gtag.js script */}
          <Script
            src={"https://www.googletagmanager.com/gtag/js?id=" + gaId}
            strategy="beforeInteractive"
          />

          {/* Step 3: Config is called by Analytics component AFTER consent is granted */}
        </>
      )}
    </head>
    <body className={inter.className} suppressHydrationWarning>
      <OrganizationSchema />
      <Providers>{children}</Providers>
      <Analytics />
      <RouteChangeTracker />
      <ScrollTracker />
      <EngagementTracker />
      <SpeedInsights />
      <VercelAnalytics />
    </body>
  </html>
);

export default RootLayout;
