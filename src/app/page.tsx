import HomeNew from "@/views/HomeNew";
import WebSiteSchema from "@/components/structured-data/WebSiteSchema";
import { generatePageMetadata } from "@/lib/metadata";

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
    <HomeNew />
  </>
);

export default HomePage;
