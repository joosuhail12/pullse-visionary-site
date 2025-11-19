// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import ContactSalesContent from "@/components/contact-sales/ContactSalesContent";

const ContactSales = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <main id="main-content" role="main">
        <ContactSalesContent />
      </main>

      <Footer />
    </div>
  );
};

export default ContactSales;
