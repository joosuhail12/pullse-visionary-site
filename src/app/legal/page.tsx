import type { Metadata } from "next";
import Legal from "@/views/Legal";

export const metadata: Metadata = {
  title: "Legal | Pullse - Terms & Policies",
  description: "Read our terms of service, privacy policy, cookie policy, and acceptable use policy.",
};

const LegalPage = () => <Legal />;

export default LegalPage;
