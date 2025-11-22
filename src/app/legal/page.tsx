import Legal from "@/views/Legal";
import { generatePageMetadata } from "@/lib/metadata";

// Edge runtime for global performance
export const runtime = 'edge';
// Revalidate weekly - legal documents change very infrequently
export const revalidate = 604800;


export const metadata = generatePageMetadata({
  title: "Legal | Pullse - Terms & Policies",
  description:
    "Read our terms of service, privacy policy, cookie policy, and acceptable use policy.",
  path: "/legal",
  keywords: [
    "legal",
    "terms of service",
    "privacy policy",
    "cookie policy",
    "acceptable use policy",
    "data processing agreement",
  ],
});

const LegalPage = () => <Legal />;

export default LegalPage;
