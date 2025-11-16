'use client';

import {
  CreditCard,
  DollarSign,
  AlertTriangle,
  SearchCheck,
  Wallet,
  CheckCircle2,
  Shield,
} from 'lucide-react';

const SolutionFintechIntegrationsSection = () => {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-background" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              Connect your fintech stack
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Native integrations with payment, banking, and risk management platforms
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CreditCard, name: 'Stripe', description: 'Payment processing & disputes', benefit: 'See transaction history inline', gradient: 'from-blue-500/10 to-cyan-500/10' },
              { icon: DollarSign, name: 'Plaid', description: 'Bank account linking & verification', benefit: 'Verify accounts instantly', gradient: 'from-green-500/10 to-emerald-500/10' },
              { icon: AlertTriangle, name: 'Sift', description: 'Fraud signals & risk scoring', benefit: 'Act on fraud alerts instantly', gradient: 'from-red-500/10 to-orange-500/10' },
              { icon: SearchCheck, name: 'Alloy', description: 'Identity verification & KYC', benefit: 'Streamline verification', gradient: 'from-purple-500/10 to-pink-500/10' },
              { icon: Wallet, name: 'Dwolla', description: 'ACH payment processing', benefit: 'Automate ACH transfers instantly', gradient: 'from-indigo-500/10 to-blue-500/10' },
              { icon: CreditCard, name: 'Marqeta', description: 'Modern card issuing', benefit: 'Issue virtual cards instantly', gradient: 'from-orange-500/10 to-amber-500/10' },
            ].map((integration, index) => {
              const Icon = integration.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 group-hover:rotate-6 shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase">
                        Live
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{integration.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{integration.description}</p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                        <CheckCircle2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-300" />
                        {integration.benefit}
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
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                30+ native fintech integrations
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionFintechIntegrationsSection;
