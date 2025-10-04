import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Users, Tags, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductInboxChannels = () => {
  const features = [
    {
      icon: Mail,
      title: "Email Integration",
      description: "Connect multiple email accounts and manage all messages in one unified inbox.",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time chat widget for your website with instant customer engagement.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Assign conversations, leave internal notes, and collaborate seamlessly.",
    },
    {
      icon: Tags,
      title: "Smart Tagging",
      description: "Organize and categorize conversations with custom tags and filters.",
    },
    {
      icon: Clock,
      title: "SLAs & Priorities",
      description: "Set service level agreements and prioritize urgent conversations automatically.",
    },
    {
      icon: Globe,
      title: "Multi-language",
      description: "Built-in translation support for global customer communication.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl font-bold mb-6">Unified Inbox & Channels</h1>
            <p className="text-xl text-muted-foreground">
              All customer conversations in one place. Email, live chat, and more—managed efficiently with powerful collaboration tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="glass-strong p-8 rounded-2xl">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/contact-sales">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductInboxChannels;
