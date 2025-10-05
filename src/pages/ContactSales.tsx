import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { Calendar, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactSales = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demo request received! Our team will contact you within 24 hours.");
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
  };

  const benefits = [
    "30-minute personalized demo",
    "Discover how Pullse fits your workflow",
    "Get answers to all your questions",
    "No commitment required",
  ];

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Info */}
              <div>
                <h1 className="text-5xl font-bold mb-6">
                  Book a Demo
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  See Pullse in action and discover how we can transform your customer support operations.
                </p>

                <div className="space-y-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-lg pt-1">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-strong p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-muted-foreground">sales@pullse.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">Available 9am-6pm EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="glass-strong p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Schedule Your Demo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Work Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company *</label>
                    <Input
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Tell us about your needs
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What are you looking to solve with Pullse?"
                      className="glass min-h-32"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Book Demo
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactSales;
