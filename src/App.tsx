import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load route components for better initial load
const HomeNew = lazy(() => import("./pages/HomeNew"));
const Product = lazy(() => import("./pages/Product"));
const ProductInboxChannels = lazy(() => import("./pages/ProductInboxChannels"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ContactSales = lazy(() => import("./pages/ContactSales"));
const Solutions = lazy(() => import("./pages/Solutions"));
const GenericPage = lazy(() => import("./pages/GenericPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomeNew />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/inbox-channels" element={<ProductInboxChannels />} />
            <Route path="/product/workflows-routing" element={<GenericPage title="Visual Workflows & Routing" description="Design complex automation flows with our drag-and-drop workflow builder." />} />
            <Route path="/product/ai-suite" element={<GenericPage title="AI Suite" description="Deploy intelligent chatbots and AI copilot for automated customer support." />} />
            <Route path="/product/ai-engine" element={<GenericPage title="The Pullse AI Engine" description="Advanced model orchestration, RAG, and API-connected actions." />} />
            <Route path="/product/analytics" element={<GenericPage title="Analytics & Reporting" description="Comprehensive dashboards tracking volumes, resolution rates, and team performance." />} />
            <Route path="/product/auto-qa" element={<GenericPage title="Auto-QA" description="Automated quality assurance with custom rubrics and coaching insights." />} />
            <Route path="/product/knowledge-bases" element={<GenericPage title="Knowledge Bases" description="Centralized knowledge management powered by Appo." />} />
            <Route path="/integrations" element={<GenericPage title="Integrations" description="Connect Pullse with your favorite tools and platforms." />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/b2b-saas" element={<GenericPage title="For B2B SaaS" description="Purpose-built for SaaS companies with complex workflows." />} />
            <Route path="/solutions/ecommerce" element={<GenericPage title="For Ecommerce" description="Optimized for online retail with order tracking and automation." />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-sales" element={<ContactSales />} />
            <Route path="/resources" element={<GenericPage title="Resources" description="Documentation, guides, and learning materials." />} />
            <Route path="/docs" element={<GenericPage title="Documentation" description="Complete guides and API documentation." />} />
            <Route path="/product-tour" element={<GenericPage title="Product Tour" description="Interactive demo of Pullse features." />} />
            <Route path="/changelog" element={<GenericPage title="Changelog" description="Latest updates and feature releases." />} />
            <Route path="/roadmap" element={<GenericPage title="Roadmap" description="Upcoming features and improvements." />} />
            <Route path="/blog" element={<GenericPage title="Blog" description="Insights, tips, and customer stories." />} />
            <Route path="/webinars" element={<GenericPage title="Webinars" description="Live training sessions and product demos." />} />
            <Route path="/status" element={<GenericPage title="System Status" description="Real-time platform status and uptime." />} />
            <Route path="/security" element={<GenericPage title="Security & Trust" description="Our commitment to security and compliance." />} />
            <Route path="/compare" element={<GenericPage title="Compare" description="See how Pullse compares to other platforms." />} />
            <Route path="/company" element={<GenericPage title="Company" description="About Pullse, our team, and careers." />} />
            <Route path="/early-access" element={<GenericPage title="Design Partner Program" description="Join our early access program and shape the future of Pullse." />} />
            <Route path="/legal" element={<GenericPage title="Legal" description="Terms of service, privacy policy, and legal information." />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
