'use client';

import WorkflowShowcase from "@/components/WorkflowShowcase";
import {
  CheckCircle2,
  Flame,
  MessageSquare,
  Brain,
  AlertTriangle,
  BarChart3,
  Code,
  Zap,
} from "lucide-react";

export default function SolutionSaaSWorkflowsSection() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              From panic to resolution—in seconds
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Pullse transforms critical support moments from multi-tool chaos to instant AI execution
            </p>
          </div>

          {/* Workflow Examples - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Workflow 1: Angry Customer Refund */}
            <WorkflowShowcase
              title="Angry Customer Refund"
              scenario="Friday 3pm. $10K/year customer: 'Charged $500 extra—refund NOW or I cancel.' 5 minutes to respond."
              category="URGENT REFUND"
              categoryColor="from-blue-500 to-cyan-500"
              steps={[
                {
                  icon: AlertTriangle,
                  label: 'Customer Rage',
                  description: 'Enterprise customer threatens cancellation over billing error',
                },
                {
                  icon: Brain,
                  label: 'Instant Context',
                  description: 'AI loads complete Stripe history and payment timeline',
                },
                {
                  icon: MessageSquare,
                  label: 'Agent Commands',
                  description: 'Agent types refund request in plain English',
                },
                {
                  icon: CheckCircle2,
                  label: 'Complete',
                  description: 'Refund processed, email sent, account saved',
                },
              ]}
              outcome={{
                value: '8s',
                metric: 'Resolution',
                description: 'Pullse: 8s instant execution. Traditional: 220s with tool switching.',
              }}
              gradient="from-blue-500/10 to-cyan-500/10"
            />

            {/* Workflow 2: Critical Bug Escalation */}
            <WorkflowShowcase
              title="Critical Bug Escalation"
              scenario="Saturday night. Dashboard down, CEO on line. $5K/minute downtime. $120K account at risk."
              category="CRITICAL P0"
              categoryColor="from-orange-500 to-red-500"
              steps={[
                {
                  icon: Flame,
                  label: 'Emergency',
                  description: 'Production down, 10,000 users affected, immediate escalation needed',
                },
                {
                  icon: BarChart3,
                  label: 'Context Ready',
                  description: 'AI shows account value, API errors, deploys, logs instantly',
                },
                {
                  icon: Code,
                  label: 'Escalate',
                  description: 'Create P0 ticket with full context automatically',
                },
                {
                  icon: Zap,
                  label: 'Alert Sent',
                  description: 'Jira, Slack, on-call paged with complete information',
                },
              ]}
              outcome={{
                value: '4s',
                metric: 'Escalation',
                description: 'Pullse: 4s with context. Traditional: 15+ min, context lost.',
              }}
              gradient="from-orange-500/10 to-red-500/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
