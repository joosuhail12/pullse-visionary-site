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
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 shadow-sm">
                <Shield className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-semibold tracking-wide text-primary">For Fintech Companies</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Fraud waits 30 minutes.
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
                  Pullse acts in 8 seconds.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Built for fintech compliance. SOC 2, PCI-DSS, audit trails—out of the box.
              </p>

              {/* CTA */}
              <div className="flex justify-center">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-10 py-7 shadow-2xl shadow-primary/30 group">
                  See compliance features
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>PCI-DSS ready</span>
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
                { icon: Clock, value: 67, suffix: '%', label: 'Faster fraud response', color: 'text-red-500' },
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
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">The Pullse Platform</span>
              </div>
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
                      Stop Fraud Fast
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">AI Chatbots</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      24/7 automated support that understands fraud alerts, payment failures, and KYC requirements. Escalates high-risk cases instantly.
                    </p>
                  </div>

                  {/* Stat */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                    <div className="text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                      &lt; 8s
                    </div>
                    <div className="text-sm text-foreground/80">fraud response time</div>
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
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">How It Works</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                See how fintech teams use Pullse
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Real workflows that balance speed with compliance
              </p>
            </div>

            {/* Workflow Examples */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <WorkflowShowcase
                title="Fraud Alert Response"
                scenario="Risk engine flags suspicious $15K transfer from new customer account"
                steps={[
                  {
                    icon: AlertTriangle,
                    label: 'Instant Detection',
                    description: 'Fraud signal from Sift triggers high-priority alert. Auto-creates ticket flagged for fraud team.',
                  },
                  {
                    icon: SearchCheck,
                    label: 'Context Enrichment',
                    description: 'System pulls: KYC verification status, previous transactions, account age, linked accounts.',
                  },
                  {
                    icon: Eye,
                    label: 'Specialist Review',
                    description: 'Fraud specialist sees full context. Transaction on hold. Customer contacted via secure channel.',
                  },
                  {
                    icon: FileCheck,
                    label: 'Documented Resolution',
                    description: 'Verification requested. ID documents uploaded. Transaction approved. Full audit trail logged.',
                  },
                ]}
                outcome={{
                  value: '< 12 min',
                  metric: 'Avg Response Time',
                  description: 'Fraud cases reviewed and actioned in minutes, preventing $2.3M in losses annually',
                }}
                gradient="from-red-500/10 to-orange-500/10"
              />

              <WorkflowShowcase
                title="Failed Payment Investigation"
                scenario="Customer reports failed card transaction, needs immediate resolution"
                steps={[
                  {
                    icon: CreditCard,
                    label: 'Payment Context',
                    description: 'Agent sees Stripe data: decline reason (insufficient funds), previous successful transactions, card type.',
                  },
                  {
                    icon: MessageSquare,
                    label: 'Secure Communication',
                    description: 'Agent explains issue without exposing sensitive data. Suggests alternative payment method.',
                  },
                  {
                    icon: Activity,
                    label: 'Real-time Retry',
                    description: 'Customer updates payment method. Agent monitors Stripe webhook for confirmation.',
                  },
                  {
                    icon: CheckCircle2,
                    label: 'Automated Follow-up',
                    description: 'Payment succeeds. System auto-closes ticket, logs transaction ID, sends confirmation email.',
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
                title="KYC Document Verification"
                scenario="New high-value customer needs expedited account verification"
                steps={[
                  {
                    icon: UserCheck,
                    label: 'Document Request',
                    description: 'Compliance team requests ID + proof of address. Secure upload link sent via encrypted channel.',
                  },
                  {
                    icon: FileCheck,
                    label: 'Document Review',
                    description: 'Documents uploaded. Agent reviews with Alloy integration showing verification status and risk score.',
                  },
                  {
                    icon: Shield,
                    label: 'Risk Assessment',
                    description: 'System checks: sanctions lists, PEP databases, adverse media. Green flag on all checks.',
                  },
                  {
                    icon: CheckCircle2,
                    label: 'Approval & Logging',
                    description: 'Account verified. Customer notified. Full verification trail saved for audit compliance.',
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
                title="Disputed Transaction"
                scenario="Customer disputes $500 charge, threatens chargeback"
                steps={[
                  {
                    icon: AlertTriangle,
                    label: 'Dispute Intake',
                    description: 'Customer submits dispute. System pulls transaction details from Stripe: date, merchant, receipt.',
                  },
                  {
                    icon: Database,
                    label: 'Evidence Collection',
                    description: 'Agent accesses: purchase confirmation, IP address, device ID, delivery confirmation if applicable.',
                  },
                  {
                    icon: MessageSquare,
                    label: 'Customer Discussion',
                    description: 'Agent reviews evidence with customer. Transaction legitimate - customer recalls purchase.',
                  },
                  {
                    icon: Ban,
                    label: 'Case Closure',
                    description: 'Dispute withdrawn. Chargeback prevented. Case documented with full evidence for future reference.',
                  },
                ]}
                outcome={{
                  value: '$87K',
                  metric: 'Chargebacks Prevented',
                  description: 'Better context and faster response prevent costly chargebacks and maintain processor relationships',
                }}
                gradient="from-purple-500/10 to-pink-500/10"
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
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 to-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-lg backdrop-blur-sm">
                <BarChart3 className="h-3.5 w-3.5" />
                ROI Calculator
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Calculate your fintech support ROI
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how much Pullse could save in prevented fraud, faster KYC, and reduced chargebacks
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
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Integrations</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Connect your fintech stack
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Native integrations with payment, banking, and fraud detection platforms
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CreditCard, name: 'Stripe', description: 'Payment processing & disputes', benefit: 'See transaction history inline' },
                { icon: DollarSign, name: 'Plaid', description: 'Bank account linking & verification', benefit: 'Verify accounts instantly' },
                { icon: AlertTriangle, name: 'Sift', description: 'Fraud detection & prevention', benefit: 'Auto-flag high-risk cases' },
                { icon: SearchCheck, name: 'Alloy', description: 'Identity verification & KYC', benefit: 'Streamline verification' },
              ].map((integration, index) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase">
                          Live
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-1">{integration.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{integration.description}</p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {integration.benefit}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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

                  <div className="flex justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-7 shadow-xl shadow-primary/20" href="/contact-sales">
                      Book a demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>SOC 2 certified</span>
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
