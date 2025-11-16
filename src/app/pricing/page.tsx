import Pricing from "@/views/Pricing";
import FAQPageSchema from "@/components/structured-data/FAQPageSchema";
import OfferSchema from "@/components/structured-data/OfferSchema";
import { generatePageMetadata } from "@/lib/metadata";
import { faqs } from "@/data/pricingData";

export const metadata = generatePageMetadata({
  title: "Pricing | Pullse - Transparent, Usage-Based Pricing",
  description:
    "Simple, transparent pricing for AI-powered customer support. Standard plan at $49/seat and Pro plan at $79/seat. Pay only for AI actions you use. No hidden fees, no per-resolution charges. Includes free startup program for eligible companies.",
  path: "/pricing",
  keywords:
    "pricing, customer support pricing, ai support cost, helpdesk pricing, support platform pricing, startup program",
});

const PricingPage = () => (
  <>
    <FAQPageSchema faqs={faqs} />
    <OfferSchema />
    <Pricing />
  </>
);

export default PricingPage;
