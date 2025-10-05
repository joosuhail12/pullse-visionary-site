import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionWithLiquid from "@/components/SectionWithLiquid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface GenericPageProps {
  title: string;
  description: string;
}

const GenericPage = ({ title, description }: GenericPageProps) => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <SectionWithLiquid className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong p-12 rounded-3xl text-center">
              <h1 className="text-5xl font-bold mb-6">{title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{description}</p>
              <p className="text-muted-foreground mb-8">
                This page is currently under development. Check back soon for updates!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact-sales">
                    Book a Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionWithLiquid>

      <Footer />
    </div>
  );
};

export default GenericPage;
