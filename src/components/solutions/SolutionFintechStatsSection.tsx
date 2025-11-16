'use client';

import AnimatedCounter from '@/components/AnimatedCounter';
import { Clock, CreditCard, DollarSign, UserCheck } from 'lucide-react';

const SolutionFintechStatsSection = () => {
  return (
    <section className="relative py-14 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, value: 67, suffix: '%', label: 'Faster risk response', color: 'text-red-500' },
              { icon: CreditCard, value: 92, suffix: '%', label: 'Payment recovery rate', color: 'text-blue-500' },
              { icon: DollarSign, value: 87, suffix: 'K', prefix: '$', label: 'Chargebacks prevented', color: 'text-green-500' },
              { icon: UserCheck, value: 45, suffix: '%', label: 'Faster KYC verification', color: 'text-purple-500' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-foreground mb-2">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix || ''}
                          suffix={stat.suffix || ''}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionFintechStatsSection;
