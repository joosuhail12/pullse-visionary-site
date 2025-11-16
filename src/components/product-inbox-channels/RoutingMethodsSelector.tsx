'use client';

import { useState } from 'react';
import { Scale, RotateCw, Hand, CheckCircle2 } from 'lucide-react';

export default function RoutingMethodsSelector() {
  const [activeRouting, setActiveRouting] = useState(0);

  const routingMethods = [
    {
      icon: Scale,
      title: 'Load Balanced',
      description: 'Distribute tickets evenly across your team',
      details: [
        'Assigns based on current agent workload',
        'Prevents burnout and bottlenecks',
        'Real-time capacity monitoring',
        'Best for teams with equal skill levels',
      ],
      useCase: 'High-volume support with generalists',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: RotateCw,
      title: 'Round Robin',
      description: 'Sequential assignment to available agents',
      details: [
        'Fair distribution in predictable order',
        'Respects agent status (online/offline)',
        'Configurable agent pools',
        'Best for steady ticket flow',
      ],
      useCase: 'Balanced teams with consistent availability',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Hand,
      title: 'Manual Assignment',
      description: 'Human-controlled routing with smart filters',
      details: [
        'Managers assign based on expertise',
        'Filter by team, skills, or availability',
        'Override rules for VIP customers',
        'Best for specialized support',
      ],
      useCase: 'Enterprise accounts requiring specific expertise',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-8 md:mb-10 lg:mb-12">
      {routingMethods.map((method, index) => {
        const Icon = method.icon;
        const isActive = activeRouting === index;

        return (
          <button
            key={index}
            type="button"
            onClick={() => setActiveRouting(index)}
            className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 text-left fade-in-up ${
              isActive
                ? 'border-primary/40 bg-card shadow-2xl scale-105'
                : 'border-border/60 bg-card/60 hover:border-primary/30 hover:shadow-xl hover:scale-102'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 transition-opacity ${isActive ? 'opacity-10' : 'group-hover:opacity-5'}`} />

            <div className="relative p-5 md:p-6 lg:p-8 space-y-4 md:space-y-5 lg:space-y-6">
              {/* Icon */}
              <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${method.color} shadow-lg`
                  : 'bg-primary/10 group-hover:bg-primary/15'
              }`}>
                <Icon className={`h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 ${isActive ? 'text-background' : 'text-primary'}`} />
              </div>

              {/* Content */}
              <div className="space-y-2 md:space-y-3">
                <h3 className={`text-xl md:text-2xl font-bold transition-colors ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                  {method.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {method.description}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-1.5 md:space-y-2">
                {method.details.map((detail, dIndex) => (
                  <div key={dIndex} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs md:text-sm text-foreground/80">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Use case */}
              <div className="pt-3 md:pt-4 border-t border-border/40">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  Best For
                </div>
                <div className="text-xs md:text-sm font-semibold text-foreground">
                  {method.useCase}
                </div>
              </div>
            </div>

            {/* Active indicator */}
            {isActive && (
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${method.color}`} />
            )}
          </button>
        );
      })}
    </div>
  );
}
