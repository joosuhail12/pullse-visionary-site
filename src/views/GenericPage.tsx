// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import GenericPageContent from "@/components/generic/GenericPageContent";

interface GenericPageProps {
  title: string;
  description: string;
}

const GenericPage = ({ title, description }: GenericPageProps) => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
      <GenericPageContent title={title} description={description} />
      </main>

      <Footer />
    </div>
  );
};

export default GenericPage;
