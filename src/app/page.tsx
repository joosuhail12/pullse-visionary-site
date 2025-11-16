import { Suspense } from "react";
import HomeNew from "@/views/HomeNew";
import WebSiteSchema from "@/components/structured-data/WebSiteSchema";
import FAQPageSchema from "@/components/structured-data/FAQPageSchema";
import { generatePageMetadata } from "@/lib/metadata";
import { homepageFaqs } from "@/data/homepageFaqData";

// Revalidate every hour - marketing content changes periodically
export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: "Pullse - AI-Powered Customer Support Platform",
  description:
    "Unify all customer conversations across email, chat, and API events. Automate with AI chatbots, copilots, and autonomous agents. Deliver exceptional support experiences at scale with intelligent workflows, analytics, and self-service knowledge bases.",
  path: "/",
  keywords:
    "ai customer support, customer support platform, ai chatbot, support automation, omnichannel support, helpdesk software, customer service software",
});

// Loading skeleton for better perceived performance
function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="animate-pulse">
        <div className="h-16 bg-gray-900" />
        <div className="container mx-auto px-4 py-20">
          <div className="h-12 bg-gray-900 rounded w-3/4 mx-auto mb-4" />
          <div className="h-6 bg-gray-900 rounded w-1/2 mx-auto" />
        </div>
      </div>
    </div>
  );
}

const HomePage = () => (
  <>
    <WebSiteSchema />
    <FAQPageSchema faqs={homepageFaqs} />
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeNew />
    </Suspense>
  </>
);

export default HomePage;
