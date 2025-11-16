'use client';

import WorkflowShowcase from '@/components/WorkflowShowcase';
import {
  CreditCard,
  MessageSquare,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Database,
  Ban,
  UserCheck,
  FileCheck,
  Shield,
} from 'lucide-react';

const SolutionFintechWorkflowsSection = () => {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32">
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
  );
};

export default SolutionFintechWorkflowsSection;
