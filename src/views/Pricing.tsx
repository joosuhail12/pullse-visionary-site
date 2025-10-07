'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Pricing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
    message: "",
  });

  const features = [
    "Unified inbox across all channels",
    "Visual workflow designer",
    "AI chatbots & copilot",
    "Advanced analytics & reporting",
    "Auto-QA with custom rubrics",
    "Knowledge base integration",
    "Priority support",
    "Custom integrations",
    "SSO & advanced security",
    "Dedicated account manager",
  ];

  const faqs = [
    {
      q: "Is there a free trial?",
      a: "Yes! We offer a 14-day free trial with full access to all features.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Absolutely. You can cancel your subscription at any time with no penalties.",
    },
    {
      q: "Do you offer custom plans?",
      a: "Yes, for larger teams we offer custom enterprise plans tailored to your needs.",
    },
    {
      q: "What kind of support do you provide?",
      a: "All plans include priority email support, and enterprise plans include a dedicated account manager.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted! We'll be in touch within 24 hours.");
    setFormData({ name: "", email: "", company: "", teamSize: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              One plan with all features. Request a quote tailored to your team size and needs.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="glass-strong p-12 rounded-3xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Enterprise Plan</h2>
                <p className="text-muted-foreground mb-6">
                  All features included. Custom pricing based on your team size.
                </p>
                <div className="text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Custom Pricing
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Billed annually or monthly</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="glass-strong p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Request Pricing</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="glass"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company</label>
                    <Input
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Team Size</label>
                    <Input
                      required
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      placeholder="10-50"
                      className="glass"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your needs..."
                    className="glass min-h-32"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Request Pricing
                </Button>
              </form>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-strong p-6 rounded-xl">
                  <h4 className="font-bold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
