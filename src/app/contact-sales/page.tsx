import ContactSales from "@/views/ContactSales";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Contact Sales | Pullse - Book a Demo",
  description:
    "Talk to our team about Pullse. Schedule a demo, get pricing information, and see how we can help your support team scale with AI.",
  path: "/contact-sales",
  keywords: [
    "book pullse demo",
    "contact sales",
    "schedule demo",
    "ai support demo",
    "pricing inquiry",
    "talk to sales team",
  ],
});

const ContactSalesPage = () => <ContactSales />;

export default ContactSalesPage;
