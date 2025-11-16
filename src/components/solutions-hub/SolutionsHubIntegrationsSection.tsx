'use client';

import { MessageSquare, CreditCard, ShoppingCart, Users, Settings, Code } from "lucide-react";

const SolutionsHubIntegrationsSection = () => {
  const integrations = [
    { name: "Slack", icon: MessageSquare },
    { name: "Teams", icon: MessageSquare },
    { name: "Stripe", icon: CreditCard },
    { name: "Shopify", icon: ShoppingCart },
    { name: "Salesforce", icon: Users },
    { name: "Jira", icon: Settings },
    { name: "GitHub", icon: Code },
    { name: "HubSpot", icon: Users },
  ];

  return (
    <section className="relative py-14 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-background" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Execute actions across your entire business stack
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Pull data and trigger actions in real-time across your CRM, payment processor, e-commerce platform, and 100+ business tools. No migration, no middleware, no sync delays.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 lg:gap-6 pt-6 md:pt-8">
              {integrations.map((integration, index) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border border-border/40 bg-card hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-foreground">{integration.name}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs md:text-sm text-muted-foreground pt-3 md:pt-4">
              And 50+ more integrations through API and webhooks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHubIntegrationsSection;
