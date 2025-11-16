'use client';

import { ShoppingCart, CreditCard, Truck, RefreshCw, Mail, Package, Zap, CheckCircle2 } from "lucide-react";

const SolutionEcommerceIntegrationsSection = () => {
  const integrations = [
    { icon: ShoppingCart, name: 'Shopify', description: 'Real-time order sync, inventory, customer profiles', benefit: 'Execute order actions instantly', gradient: 'from-green-500/10 to-emerald-500/10' },
    { icon: CreditCard, name: 'Stripe', description: 'Instant refunds, payment history, subscription updates', benefit: 'Process refunds in seconds', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: Truck, name: 'ShipStation', description: 'Auto label generation, carrier tracking, batch processing', benefit: 'Generate return labels instantly', gradient: 'from-purple-500/10 to-pink-500/10' },
    { icon: RefreshCw, name: 'Returnly', description: 'Return portal, prepaid labels, warehouse integration', benefit: 'Automate return workflows', gradient: 'from-cyan-500/10 to-teal-500/10' },
    { icon: Mail, name: 'Klaviyo', description: 'Email marketing & automation', benefit: 'Trigger campaigns from support data', gradient: 'from-pink-500/10 to-rose-500/10' },
    { icon: Package, name: 'AfterShip', description: 'Post-purchase tracking & notifications', benefit: 'Auto-update customers on delivery', gradient: 'from-indigo-500/10 to-purple-500/10' },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              AI executes across your retail stack
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Agents ask, Pullse executes. Our AI figures out how to take action across all your e-commerce tools—instantly.
            </p>
          </div>

          {/* Integrations Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shrink-0 group-hover:shadow-lg">
                        <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase group-hover:bg-primary group-hover:text-background transition-all duration-300">
                        Live
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{integration.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{integration.description}</p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                        <CheckCircle2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-300" />
                        <span>{integration.benefit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>

          {/* Extensibility Badge */}
          <div className="flex items-center justify-center pt-8">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 bg-primary/5">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                40+ native e-commerce integrations
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionEcommerceIntegrationsSection;
