import ContactSales from "@/views/ContactSales";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Contact Sales | Pullse - Book a Demo",
  description:
    "Talk to our team about Pullse. Schedule a demo, get pricing information, and see how we can help your support team scale with AI.",
  path: "/contact-sales",
  keywords: "contact sales, book demo, schedule demo, pricing inquiry, talk to sales",
});

const ContactSalesPage = () => <ContactSales />;

export default ContactSalesPage;
