import HomeNew from "@/views/HomeNew";
import WebSiteSchema from "@/components/structured-data/WebSiteSchema";
import FAQPageSchema from "@/components/structured-data/FAQPageSchema";
import { generatePageMetadata } from "@/lib/metadata";
import { homepageFaqs } from "@/data/homepageFaqData";

export const metadata = generatePageMetadata({
  title: "Pullse - AI-Powered Customer Support Platform",
  description:
    "Unify all customer conversations across email, chat, and API events. Automate with AI chatbots, copilots, and autonomous agents. Deliver exceptional support experiences at scale with intelligent workflows, analytics, and self-service knowledge bases.",
  path: "/",
  keywords:
    "ai customer support, customer support platform, ai chatbot, support automation, omnichannel support, helpdesk software, customer service software",
});

const HomePage = () => (
  <>
    <WebSiteSchema />
    <FAQPageSchema faqs={homepageFaqs} />
    <HomeNew />
  </>
);

export default HomePage;
