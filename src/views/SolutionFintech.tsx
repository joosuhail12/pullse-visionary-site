'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import WorkflowShowcase from "@/components/WorkflowShowcase";
import RoiCalculator from "@/components/RoiCalculator";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  TrendingUp,
  Target,
  Lock,
  AlertTriangle,
  Clock,
  FileText,
  BarChart3,
  Play,
  Star,
  CreditCard,
  DollarSign,
  SearchCheck,
  ShieldCheck,
  Eye,
  Wallet,
  FileCheck,
  Bell,
  UserCheck,
  Activity,
  Database,
  GitBranch,
  MessageSquare,
  Ban,
  Users,
} from "lucide-react";

const SolutionFintech = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section - Industry Context */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <div className="text-center space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Risk alerts hit. Your team scrambles for 30 minutes.
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-3">
                  Pullse responds in 8 seconds.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                AI that instantly responds to fraud alerts, chargebacks, and disputes across your entire stack. No scrambling between tools. No 30-minute investigations. Just instant, orchestrated responses.
              </p>

              {/* CTA */}
              <div className="pt-6">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-10 py-6 shadow-xl shadow-primary/20 group">
                  Book a demo
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>SOC 2 Type II in progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>PCI-DSS controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Full audit trails</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="relative py-20 overflow-hidden">
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

      {/* 3 Pillars Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Three ways to put AI to work
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Built for fintech teams who can't compromise on security or speed
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Pillar 1: AI Chatbots */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-6">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <MessageSquare className="h-8 w-8 text-background" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase">
                      Orchestrate Risk Workflows
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">AI Chatbots</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      24/7 automated support that orchestrates responses to fraud alerts, payment failures, and KYC requirements across your risk tools. Escalates high-risk cases instantly.
                    </p>
                  </div>

                  {/* Stat */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                    <div className="text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                      &lt; 8s
                    </div>
                    <div className="text-sm text-foreground/80">risk response time</div>
                  </div>
                </div>
              </div>

              {/* Pillar 2: AI Copilots */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-6">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                      <Users className="h-8 w-8 text-background" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-xs font-bold uppercase">
                      Instant KYC
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">AI Copilots</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Real-time assistance that surfaces Stripe/Plaid data in-ticket. Suggests compliant next actions with full audit logging.
                    </p>
                  </div>

                  {/* Stat */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                    <div className="text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                      92%
                    </div>
                    <div className="text-sm text-foreground/80">payment recovery rate</div>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Auto-QA */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-6">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                      <ShieldCheck className="h-8 w-8 text-background" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-bold uppercase">
                      Audit Ready
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">Auto-QA</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Continuous quality monitoring that checks for PII exposure, verifies compliance, and generates audit reports automatically.
                    </p>
                  </div>

                  {/* Stat */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                    <div className="text-5xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                      100%
                    </div>
                    <div className="text-sm text-foreground/80">audit compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Pullse Helps - Workflow Showcases */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Built for fintech teams
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Real workflows that balance speed with compliance
              </p>
            </div>

            {/* Workflow Examples */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <WorkflowShowcase
                title="Failed Payment Investigation"
                scenario="Customer reports failed card transaction, needs immediate resolution"
                steps={[
                  {
                    icon: CreditCard,
                    label: 'Payment Context',
                    description: 'Payment history and card data pulled from Stripe.',
                  },
                  {
                    icon: MessageSquare,
                    label: 'Secure Communication',
                    description: 'Issue identified. Customer contacted with solution.',
                  },
                  {
                    icon: Activity,
                    label: 'Real-time Retry',
                    description: 'Payment updated. Transaction retried successfully.',
                  },
                  {
                    icon: CheckCircle2,
                    label: 'Automated Follow-up',
                    description: 'Transaction succeeds. Ticket closed automatically.',
                  },
                ]}
                outcome={{
                  value: '< 8 min',
                  metric: 'Resolution Time',
                  description: 'Payment issues resolved without escalation, recovering 92% of failed transactions',
                }}
                gradient="from-blue-500/10 to-cyan-500/10"
              />

              <WorkflowShowcase
                title="Disputed Transaction"
                scenario="Customer disputes $500 charge, threatens chargeback"
                steps={[
                  {
                    icon: AlertTriangle,
                    label: 'Dispute Intake',
                    description: 'Dispute received. Transaction data auto-pulled from Stripe.',
                  },
                  {
                    icon: Database,
                    label: 'Evidence Collection',
                    description: 'Agent sees full timeline and transaction history.',
                  },
                  {
                    icon: MessageSquare,
                    label: 'Customer Discussion',
                    description: 'Evidence reviewed. Customer recalls legitimate purchase.',
                  },
                  {
                    icon: Ban,
                    label: 'Case Closure',
                    description: 'Chargeback prevented. Case documented and archived.',
                  },
                ]}
                outcome={{
                  value: '$87K',
                  metric: 'Chargebacks Prevented',
                  description: 'Better context and faster response prevent costly chargebacks and maintain processor relationships',
                }}
                gradient="from-purple-500/10 to-pink-500/10"
              />

              <WorkflowShowcase
                title="KYC Document Verification"
                scenario="New high-value customer needs expedited account verification"
                steps={[
                  {
                    icon: UserCheck,
                    label: 'Document Request',
                    description: 'ID and proof of address requested. Secure upload link sent.',
                  },
                  {
                    icon: FileCheck,
                    label: 'Document Review',
                    description: 'Documents uploaded. Alloy shows verification status and risk score.',
                  },
                  {
                    icon: Shield,
                    label: 'Risk Assessment',
                    description: 'Sanctions, PEP, and adverse media checked. All clear.',
                  },
                  {
                    icon: CheckCircle2,
                    label: 'Approval & Logging',
                    description: 'Account verified. Customer notified. Audit trail saved.',
                  },
                ]}
                outcome={{
                  value: '45%',
                  metric: 'Faster KYC',
                  description: 'Streamlined verification process reduces time-to-approval and improves customer experience',
                }}
                gradient="from-green-500/10 to-emerald-500/10"
              />

              <WorkflowShowcase
                title="Risk Alert Orchestration"
                scenario="Sift flags high-risk transaction requiring immediate review"
                steps={[
                  {
                    icon: AlertTriangle,
                    label: 'Alert Reception',
                    description: 'Fraud alert received from Sift. Transaction flagged high-risk.',
                  },
                  {
                    icon: Database,
                    label: 'Context Gathering',
                    description: 'Account history, transaction patterns, and user data pulled.',
                  },
                  {
                    icon: Shield,
                    label: 'Multi-tool Check',
                    description: 'Additional verification run across fraud prevention tools.',
                  },
                  {
                    icon: CheckCircle2,
                    label: 'Action Taken',
                    description: 'Transaction blocked or approved. Customer notified. Case logged.',
                  },
                ]}
                outcome={{
                  value: '<8s',
                  metric: 'Risk Response',
                  description: 'Instant orchestration across fraud tools prevents losses while maintaining customer experience',
                }}
                gradient="from-red-500/10 to-orange-500/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Calculate your fintech support ROI
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how much Pullse could save with orchestrated risk workflows, faster KYC, and reduced chargebacks
              </p>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-10 md:p-12 shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative py-32 overflow-hidden">
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

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready for compliant, fast support?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      See how Pullse helps fintech teams prevent fraud, accelerate KYC, and pass audits with ease
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-6 shadow-xl shadow-primary/20" href="/pricing">
                      Pricing
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-base px-10 py-6 border border-border/40 hover:border-primary/40" href="/contact-sales">
                      Contact Sales
                    </RouteButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>SOC 2 controls in progress</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>14-day free trial</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Security review support included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionFintech;
