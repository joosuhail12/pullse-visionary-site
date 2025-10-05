import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionWithLiquid from "@/components/SectionWithLiquid";
import { Link } from "react-router-dom";
import { ShoppingCart, Briefcase, ArrowRight } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Briefcase,
      title: "For B2B SaaS",
      description: "Purpose-built for SaaS companies with complex workflows and technical support needs.",
      features: ["API documentation support", "Technical troubleshooting", "Product usage tracking", "Customer success workflows"],
      link: "/solutions/b2b-saas",
    },
    {
      icon: ShoppingCart,
      title: "For Ecommerce",
      description: "Optimized for online retail with order tracking, returns, and shipping integrations.",
      features: ["Order status updates", "Return & refund automation", "Product recommendations", "Shipping notifications"],
      link: "/solutions/ecommerce",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <SectionWithLiquid className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl font-bold mb-6">Solutions</h1>
            <p className="text-xl text-muted-foreground">
              Tailored customer support solutions for your industry and business model.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                to={solution.link}
                className="glass-strong p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <solution.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{solution.title}</h2>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span className="font-medium">Learn more</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SectionWithLiquid>

      <Footer />
    </div>
  );
};

export default Solutions;
