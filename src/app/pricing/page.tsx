import { Suspense } from "react";
import Pricing from "@/views/Pricing";
import FAQPageSchema from "@/components/structured-data/FAQPageSchema";
import OfferSchema from "@/components/structured-data/OfferSchema";
import { generatePageMetadata } from "@/lib/metadata";
import { faqs } from "@/data/pricingData";

// Revalidate every 30 minutes - pricing may change more frequently
export const revalidate = 1800;

export const metadata = generatePageMetadata({
  title: "Pricing | Pullse - Transparent, Usage-Based Pricing",
  description:
    "Simple, transparent pricing for AI-powered customer support. Standard plan at $49/seat and Pro plan at $79/seat. Pay only for AI actions you use. No hidden fees, no per-resolution charges. Includes free startup program for eligible companies.",
  path: "/pricing",
  keywords:
    "pricing, customer support pricing, ai support cost, helpdesk pricing, support platform pricing, startup program",
});

function PricingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="animate-pulse">
        <div className="h-16 bg-gray-900" />
        <div className="container mx-auto px-4 py-20">
          <div className="h-10 bg-gray-900 rounded w-1/2 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-900 rounded" />
            <div className="h-96 bg-gray-900 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

const PricingPage = () => (
  <>
    <FAQPageSchema faqs={faqs} />
    <OfferSchema />
    <Suspense fallback={<PricingSkeleton />}>
      <Pricing />
    </Suspense>
  </>
);

export default PricingPage;
