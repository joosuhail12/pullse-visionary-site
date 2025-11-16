import Legal from "@/views/Legal";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Legal | Pullse - Terms & Policies",
  description:
    "Read our terms of service, privacy policy, cookie policy, and acceptable use policy.",
  path: "/legal",
  keywords: "legal, terms of service, privacy policy, cookie policy, acceptable use policy",
});

const LegalPage = () => <Legal />;

export default LegalPage;
