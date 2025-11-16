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

      <ContactSalesContent />

      <Footer />
    </div>
  );
};

export default ContactSales;
