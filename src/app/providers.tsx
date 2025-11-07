'use client';

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import CookieConsent from "@/components/CookieConsent";
import CookiePreferences from "@/components/CookiePreferences";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CookieConsentProvider>
          {children}
          <Toaster />
          <Sonner />
          <CookieConsent />
          <CookiePreferences />
        </CookieConsentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Providers;
