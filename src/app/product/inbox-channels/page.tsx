import ProductInbox from "@/views/ProductInbox";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Omnichannel Inbox | Unified Customer Conversations by Pullse",
  description:
    "Unify all customer conversations—email, chat, social, and phone—in one intelligent inbox. Smart routing, team collaboration, and AI assistance built-in.",
  path: "/product/inbox-channels",
  keywords: [
    "omnichannel inbox",
    "unified customer conversations",
    "email and chat support",
    "voice and sms support",
    "social media support",
    "support routing",
    "team collaboration for support",
    "ai assisted inbox",
  ],
});

const ProductInboxPage = () => (
  <>
    <SoftwareApplicationSchema
      name="Pullse Omnichannel Inbox"
      description="Unify all customer conversations—email, chat, social, and phone—in one intelligent inbox. Smart routing, team collaboration, and AI assistance built-in."
      applicationCategory="BusinessApplication"
      offers={{
        price: "49",
        priceCurrency: "USD",
      }}
    />
    <ProductInbox />
  </>
);

export default ProductInboxPage;
