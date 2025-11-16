'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Shield,
  Building2,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const useCaseTabs = [
  {
    value: 'ecommerce',
    label: 'E-commerce & Retail',
    icon: ShoppingCart,
    headline: 'Answer order questions instantly',
    summary: 'Resolve "Where is my order?" and return requests in seconds. Pull real-time data from Shopify, inventory systems, and shipping providers—no agent lookup required.',
    bullets: [
      'Automated WISMO with live tracking updates',
      'Self-service returns and exchanges',
      'Loyalty balance and points inquiries',
      'Product recommendations in brand voice'
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    primaryColor: 'rgb(34, 197, 94)', // green-500
    accentColor: 'rgb(16, 185, 129)', // emerald-500
    cssVars: {
      bg: 'from-green-500/6 via-emerald-500/3',
      border: 'border-green-500/40',
      text: 'text-green-500',
      bgLight: 'bg-green-500/10',
      bgHover: 'hover:bg-green-500/5',
      borderHover: 'hover:border-green-500/40',
      shadow: 'shadow-green-500/10'
    },
    stat: { label: 'WISMO Reduction', value: '80%', description: 'fewer order status inquiries' },
  },
  {
    value: 'fintech',
    label: 'Fintech',
    icon: Shield,
    headline: 'Respond to financial risks instantly',
    summary: 'Handle account changes, billing disputes, and fraud alerts with orchestrated workflows that include approval gates, audit trails, and role-based permissions by default.',
    bullets: [
      'Real-time fraud alert orchestration',
      'Automated KYC verification workflows',
      'Dispute resolution with full audit logs',
      'Compliance-ready documentation export'
    ],
    gradient: 'from-red-500/20 to-orange-500/20',
    primaryColor: 'rgb(239, 68, 68)', // red-500
    accentColor: 'rgb(249, 115, 22)', // orange-500
    cssVars: {
      bg: 'from-red-500/6 via-orange-500/3',
      border: 'border-red-500/40',
      text: 'text-red-500',
      bgLight: 'bg-red-500/10',
      bgHover: 'hover:bg-red-500/5',
      borderHover: 'hover:border-red-500/40',
      shadow: 'shadow-red-500/10'
    },
    stat: { label: 'Risk Response', value: '<8s', description: 'average risk response time' },
  },
  {
    value: 'saas',
    label: 'SaaS',
    icon: Building2,
    headline: 'Turn trial users into paying customers',
    summary: 'Guide users through onboarding, troubleshoot technical issues, and proactively prevent churn with AI that understands your product and connects to your entire stack.',
    bullets: [
      'Onboarding assistance with product guidance',
      'Technical troubleshooting with Jira integration',
      'Usage-based proactive outreach',
      'Trial-to-paid conversion workflows'
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    primaryColor: 'rgb(59, 130, 246)', // blue-500
    accentColor: 'rgb(6, 182, 212)', // cyan-500
    cssVars: {
      bg: 'from-blue-500/6 via-cyan-500/3',
      border: 'border-blue-500/40',
      text: 'text-blue-500',
      bgLight: 'bg-blue-500/10',
      bgHover: 'hover:bg-blue-500/5',
      borderHover: 'hover:border-blue-500/40',
      shadow: 'shadow-blue-500/10'
    },
    stat: { label: 'Churn Reduction', value: '28%', description: 'lower customer churn rate' },
  },
];

const HomeUseCasesSection = () => {
  const [activeIndustry, setActiveIndustry] = useState('ecommerce');
  const activeTab = useCaseTabs.find(tab => tab.value === activeIndustry) || useCaseTabs[0];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 transition-colors duration-700">
      {/* Enhanced background - dynamically colored */}
      <div
        className="absolute inset-0 bg-gradient-to-br to-background transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${activeTab.primaryColor}0F, transparent)`
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at top right, ${activeTab.primaryColor}14, transparent 60%)`
        }}
      />

      <div className="container relative mx-auto px-4">
        {/* Enhanced header */}
        <div className="mx-auto mb-10 sm:mb-12 md:mb-16 max-w-3xl text-center space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Purpose-built for your vertical
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Proven automation patterns and compliance frameworks ready to deploy—no guesswork required
          </p>
        </div>

        {/* Horizontal Tab Pills */}
        <Tabs defaultValue="ecommerce" onValueChange={(value) => setActiveIndustry(value)} className="mx-auto w-full max-w-6xl">
          <TabsList className="!h-auto !inline-flex w-full justify-center gap-2 sm:gap-3 rounded-2xl border border-border/60 bg-card/90 p-1.5 sm:p-2 shadow-lg mb-8 sm:mb-10 md:mb-12 backdrop-blur-sm flex-wrap">
            {useCaseTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeIndustry === tab.value;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1.5 sm:gap-2 rounded-xl px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all data-[state=active]:text-background data-[state=active]:shadow-lg min-h-[44px]"
                  style={isActive ? {
                    backgroundColor: tab.primaryColor
                  } : {}}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Card-based content */}
          {useCaseTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="space-y-6 sm:space-y-8 data-[state=active]:animate-in data-[state=active]:fade-in-50"
              >
                {/* Featured card with stat */}
                <div
                  className="relative overflow-hidden rounded-[24px] border-l-4 bg-card p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl transition-all md:hover:shadow-2xl"
                  style={{ borderLeftColor: tab.primaryColor }}
                >
                  <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr,1.3fr] items-start">
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tab.gradient} border shadow-lg`}
                          style={{ borderColor: `${tab.primaryColor}4D` }}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" style={{ color: tab.primaryColor }} />
                        </div>
                        <div>
                          <div
                            className="text-xs font-bold uppercase tracking-wider mb-1"
                            style={{ color: tab.primaryColor }}
                          >
                            {tab.label}
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                            {tab.headline}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {tab.summary}
                      </p>

                      {/* Industry stat callout */}
                      <div
                        className="rounded-2xl border p-3 sm:p-4 md:p-5"
                        style={{
                          borderColor: `${tab.primaryColor}4D`,
                          background: `linear-gradient(to bottom right, ${tab.primaryColor}1A, ${tab.primaryColor}0D)`
                        }}
                      >
                        <div className="flex items-end gap-2 sm:gap-3 mb-2">
                          <div className="text-3xl sm:text-4xl font-bold" style={{ color: tab.primaryColor }}>{tab.stat.value}</div>
                          <div className="pb-1 text-xs sm:text-sm font-semibold text-foreground">{tab.stat.label}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{tab.stat.description}</div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full sm:w-auto text-background shadow-lg hover:opacity-90 transition-opacity min-h-[44px]"
                        style={{ backgroundColor: tab.primaryColor }}
                        asChild
                      >
                        <Link href="/contact-sales">
                          See it in action
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Feature bullets in right column */}
                    <ul className="space-y-2.5 sm:space-y-3">
                      {tab.bullets.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 sm:gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background/80 to-background/60 p-3 sm:p-4 md:p-5 backdrop-blur-sm transition-all md:hover:shadow-md group"
                          style={{
                            '--hover-border': `${tab.primaryColor}66`,
                            '--hover-bg': `${tab.primaryColor}0D`
                          } as React.CSSProperties}
                          onMouseEnter={(e) => {
                            if (window.matchMedia('(hover: hover)').matches) {
                              e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                              e.currentTarget.style.backgroundColor = `${tab.primaryColor}0D`;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (window.matchMedia('(hover: hover)').matches) {
                              e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.5)';
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <div
                            className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border mt-0.5"
                            style={{
                              backgroundColor: `${tab.primaryColor}33`,
                              borderColor: `${tab.primaryColor}4D`
                            }}
                          >
                            <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: tab.primaryColor }} />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Three supporting feature cards */}
                <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div
                    className="group rounded-2xl border border-border/60 bg-card p-4 sm:p-5 md:p-6 shadow-sm transition-all md:hover:shadow-lg md:hover:-translate-y-1"
                    onMouseEnter={(e) => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.6)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                      <div
                        className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg border transition-all md:group-hover:scale-110"
                        style={{
                          backgroundColor: `${tab.primaryColor}1A`,
                          borderColor: `${tab.primaryColor}33`
                        }}
                      >
                        <Shield className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: tab.primaryColor }} />
                      </div>
                      <h4 className="text-sm font-bold text-foreground">Security First</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      SOC 2 controls, encrypted data, role-based access, and full audit trails for every action
                    </p>
                  </div>

                  <div
                    className="group rounded-2xl border border-border/60 bg-card p-4 sm:p-5 md:p-6 shadow-sm transition-all md:hover:shadow-lg md:hover:-translate-y-1"
                    onMouseEnter={(e) => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.6)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                      <div
                        className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg border transition-all md:group-hover:scale-110"
                        style={{
                          backgroundColor: `${tab.primaryColor}1A`,
                          borderColor: `${tab.primaryColor}33`
                        }}
                      >
                        <Zap className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: tab.primaryColor }} />
                      </div>
                      <h4 className="text-sm font-bold text-foreground">Rapid Deployment</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      2-4 week implementation with dedicated founder support and industry-specific playbooks
                    </p>
                  </div>

                  <div
                    className="group rounded-2xl border border-border/60 bg-card p-4 sm:p-5 md:p-6 shadow-sm transition-all md:hover:shadow-lg md:hover:-translate-y-1"
                    onMouseEnter={(e) => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.6)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                      <div
                        className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg border transition-all md:group-hover:scale-110"
                        style={{
                          backgroundColor: `${tab.primaryColor}1A`,
                          borderColor: `${tab.primaryColor}33`
                        }}
                      >
                        <BarChart3 className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: tab.primaryColor }} />
                      </div>
                      <h4 className="text-sm font-bold text-foreground">Measurable Impact</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Real-time dashboards showing automation rates, cost savings, and ROI metrics leadership trusts
                    </p>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default HomeUseCasesSection;
