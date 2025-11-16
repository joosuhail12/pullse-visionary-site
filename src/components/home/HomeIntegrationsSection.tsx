'use client';

import { Zap } from "lucide-react";

const connectorHighlights = [
  { name: 'Shopify', status: 'live', description: 'Look up orders, process refunds, check inventory in real-time' },
  { name: 'Stripe', status: 'live', description: 'Issue refunds, manage subscriptions, check payment status' },
  { name: 'Slack', status: 'live', description: 'Route urgent escalations, request approvals, notify teams' },
  { name: 'Salesforce', status: 'live', description: 'Pull customer context, update records, create follow-up tasks' },
  { name: 'HubSpot', status: 'live', description: 'Sync contact data, track interactions, update deal stages' },
  { name: 'REST API', status: 'live', description: 'Build custom actions for any internal or external system' },
];

const HomeIntegrationsSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent-pink/3 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent-pink)/0.04),transparent_70%)]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Enhanced Header */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16 space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Take action across your entire stack
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              100+ native connectors to execute actions in real-time—refunds, updates, lookups—right from the conversation. Plus full REST API support for unlimited custom workflows. No middleware, no sync delays.
            </p>
          </div>

          {/* Enhanced Grid with detailed cards */}
          <div className="grid gap-4 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10">
            {connectorHighlights.map((connector) => {
              const isBeta = connector.status === 'beta';
              const isLive = connector.status === 'live';
              return (
                <div
                  key={connector.name}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6 transition-all duration-300 md:hover:border-accent-pink/40 md:hover:shadow-xl md:hover:shadow-accent-pink/10 md:hover:-translate-y-1"
                >
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    {isBeta && (
                      <div className="px-2.5 py-1 rounded-full bg-accent-pink/20 border border-accent-pink/30 text-accent-pink text-[10px] font-bold uppercase tracking-wider">
                        Beta
                      </div>
                    )}
                    {isLive && (
                      <div className="px-2.5 py-1 rounded-full bg-accent-green/20 border border-accent-green/30 text-accent-green text-[10px] font-bold uppercase tracking-wider">
                        Live
                      </div>
                    )}
                  </div>

                  {/* Connector content */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-pink/20 to-accent-pink/10 border border-accent-pink/30 shadow-md transition-all duration-300 md:group-hover:scale-110 md:group-hover:shadow-lg md:group-hover:shadow-accent-pink/20">
                        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-accent-pink" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-bold text-foreground">{connector.name}</div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {connector.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeIntegrationsSection;
