import ProductWorkflows from "@/views/ProductWorkflows";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Visual Workflows & Automation | Pullse",
  description:
    "Build sophisticated automation with drag-and-drop workflows. No coding required. Smart routing, conditional logic, and 50+ templates.",
  path: "/product/workflows-routing",
  keywords:
    "workflow automation, visual workflow builder, no-code automation, ticket routing, support automation, drag-and-drop workflows",
});

const WorkflowsPage = () => (
  <>
    <SoftwareApplicationSchema
      name="Pullse Workflows & Automation"
      description="Build sophisticated automation with drag-and-drop workflows. No coding required. Smart routing, conditional logic, and 50+ pre-built templates for e-commerce, SaaS, and support ops."
      applicationCategory="BusinessApplication"
      offers={{
        price: "49",
        priceCurrency: "USD",
      }}
    />
    <ProductWorkflows />
  </>
);

export default WorkflowsPage;
