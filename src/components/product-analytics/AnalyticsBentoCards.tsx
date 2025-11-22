'use client';

import { ArrowUpRight, BarChart2, CheckCircle2, Clock, LayoutGrid, Shield, Sparkles, Target, TrendingUp, Users } from 'lucide-react';

export const VolumeTrendsCard = () => {
  const weekly = [320, 410, 380, 520, 470, 610, 680];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-white/95 p-4 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Volume & trends</p>
          <p className="text-2xl font-bold text-foreground mt-1">12,483 tickets</p>
          <p className="text-xs font-semibold text-primary mt-1 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            +8% vs last 30d
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>
      <div className="relative mt-4 flex items-end gap-1">
        {weekly.map((v, idx) => (
          <span
            key={idx}
            className="flex-1 rounded-full bg-primary/60"
            style={{ height: `${Math.max(16, v / 12)}px`, opacity: 0.5 + idx * 0.06 }}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-semibold text-muted-foreground">
        <span className="rounded-lg bg-muted/40 px-2 py-1 text-center">Peak: Thu</span>
        <span className="rounded-lg bg-muted/40 px-2 py-1 text-center">AI deflect: 43%</span>
        <span className="rounded-lg bg-muted/40 px-2 py-1 text-center">Forecast: +6%</span>
      </div>
    </div>
  );
};

export const ResolutionBreakdownCard = () => {
  const intents = [
    { name: 'Billing & plans', percent: 28, change: '+12%' },
    { name: 'Account access', percent: 18, change: '+4%' },
    { name: 'Integrations', percent: 14, change: '+19%' },
    { name: 'Bug reports', percent: 9, change: '-6%' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-white/95 p-4 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/12 via-transparent to-primary/8" />
      <div className="relative flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resolution breakdown</p>
          <p className="text-lg font-bold text-foreground">Top intents</p>
        </div>
        <Target className="h-5 w-5 text-primary" />
      </div>
      <div className="relative space-y-2">
        {intents.map((intent) => (
          <div key={intent.name} className="rounded-xl border border-border/50 bg-muted/30 p-3">
            <div className="flex items-center justify-between text-sm font-semibold text-foreground">
              <span>{intent.name}</span>
              <span className="text-primary text-xs">{intent.change}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
              <span className="block h-full rounded-full bg-primary/70" style={{ width: `${intent.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AgentPerformanceCard = () => {
  const agents = [
    { name: 'Sarah Johnson', fcr: '74%', csat: '96%', time: '1m 02s', status: 'Coaching' },
    { name: 'Jamal Kim', fcr: '69%', csat: '93%', time: '1m 21s', status: 'On track' },
    { name: 'Priya Desai', fcr: '65%', csat: '92%', time: '1m 30s', status: 'Focus' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-white/95 p-4 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-[#22C55E]/10" />
      <div className="relative flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Agent performance</p>
          <p className="text-lg font-bold text-foreground">Scorecards</p>
        </div>
        <Users className="h-5 w-5 text-primary" />
      </div>
      <div className="relative space-y-2 text-xs font-semibold text-muted-foreground">
        {agents.map((agent) => (
          <div key={agent.name} className="rounded-xl border border-border/50 bg-muted/30 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  {agent.name.slice(0, 2)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{agent.name}</p>
                  <p className="text-[11px] text-muted-foreground">Status: {agent.status}</p>
                </div>
              </div>
              <span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-semibold text-foreground border border-border/50">
                {agent.status}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
              <div className="rounded-lg bg-white/80 px-2 py-1">
                <p className="font-semibold text-muted-foreground">FCR</p>
                <p className="text-base font-bold text-foreground">{agent.fcr}</p>
              </div>
              <div className="rounded-lg bg-white/80 px-2 py-1">
                <p className="font-semibold text-muted-foreground">CSAT</p>
                <p className="text-base font-bold text-foreground">{agent.csat}</p>
              </div>
              <div className="rounded-lg bg-white/80 px-2 py-1">
                <p className="font-semibold text-muted-foreground">Handle</p>
                <p className="text-base font-bold text-foreground">{agent.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomerSatisfactionCard = () => {
  const drivers = [
    { name: 'Documentation accuracy', score: 4.7 },
    { name: 'Speed to resolution', score: 4.5 },
    { name: 'Proactive updates', score: 4.2 },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-white/95 p-4 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 via-transparent to-primary/8" />
      <div className="relative flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">CSAT & NPS</p>
          <p className="text-lg font-bold text-foreground">Customers at a glance</p>
        </div>
        <BarChart2 className="h-5 w-5 text-primary" />
      </div>
      <div className="relative grid grid-cols-2 gap-3 text-sm font-semibold">
        <div className="rounded-xl bg-primary/10 text-primary p-3">
          <p className="text-xs uppercase tracking-wide">CSAT</p>
          <p className="text-2xl font-black">92%</p>
          <p className="text-[11px] font-semibold text-primary/80">+3.1 pts</p>
        </div>
        <div className="rounded-xl bg-muted/40 p-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">NPS</p>
          <p className="text-2xl font-black text-foreground">61</p>
          <p className="text-[11px] font-semibold text-primary/80">Detractors ↓ 9%</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {drivers.map((driver) => (
          <div key={driver.name} className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 px-3 py-2">
            <p className="text-sm font-semibold text-foreground">{driver.name}</p>
            <p className="text-sm font-bold text-primary">{driver.score.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AIPerformanceCard = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-white/95 p-4 shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/12 via-transparent to-primary/8" />
    <div className="relative flex items-center justify-between mb-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI performance</p>
        <p className="text-lg font-bold text-foreground">Deflection & quality</p>
      </div>
      <Sparkles className="h-5 w-5 text-primary" />
    </div>
    <div className="relative grid grid-cols-2 gap-3 text-sm font-semibold">
      <div className="rounded-xl bg-muted/30 p-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Deflection</p>
        <p className="text-2xl font-black text-foreground">43%</p>
        <p className="text-[11px] font-semibold text-primary">+6% vs 30d</p>
      </div>
      <div className="rounded-xl bg-muted/30 p-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Action success</p>
        <p className="text-2xl font-black text-foreground">92%</p>
        <p className="text-[11px] font-semibold text-primary">+4% accuracy</p>
      </div>
    </div>
    <div className="mt-3 space-y-2 text-xs font-semibold text-muted-foreground">
      {[
        { label: 'Hallucination detection', status: 'Passing', icon: Shield },
        { label: 'Grounding confidence', status: '97%', icon: CheckCircle2 },
        { label: 'Escalation to agents', status: '12%', icon: ArrowUpRight },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex items-center justify-between rounded-lg border border-border/40 bg-white/80 px-3 py-2">
            <span className="flex items-center gap-2 text-foreground">
              <Icon className="h-4 w-4 text-primary" />
              {item.label}
            </span>
            <span className="text-primary">{item.status}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export const ResponseTimeCard = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-white/95 p-4 shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/12 via-transparent to-primary/8" />
    <div className="relative flex items-center justify-between mb-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Speed & reliability</p>
        <p className="text-lg font-bold text-foreground">Response time</p>
      </div>
      <Clock className="h-5 w-5 text-primary" />
    </div>
    <div className="space-y-2">
      {[
        { label: 'First response time', value: '1m 14s', change: '-18%' },
        { label: 'Resolution time', value: '8m 33s', change: '+2%' },
        { label: 'SLA compliance', value: '94%', change: '+3%' },
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-border/40 bg-muted/30 px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            <p className="text-xs font-semibold text-primary">{item.change}</p>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white">
            <span className="block h-full rounded-full bg-primary/70" style={{ width: item.value.includes('%') ? item.value : '70%' }} />
          </div>
          <p className="text-xs font-semibold text-muted-foreground mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

export const ScheduledReportsCard = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-white/95 p-4 shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/12 via-transparent to-primary/8" />
    <div className="relative flex items-center justify-between mb-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Scheduled reports</p>
        <p className="text-lg font-bold text-foreground">Auto-delivery</p>
      </div>
      <LayoutGrid className="h-5 w-5 text-primary" />
    </div>
    <div className="space-y-2 text-sm font-semibold">
      <div className="rounded-xl border border-border/40 bg-muted/30 px-3 py-2">
        <p className="text-foreground">Weekly exec summary</p>
        <p className="text-xs text-muted-foreground">Mondays 8:00 AM • email + Slack</p>
        <p className="text-xs font-semibold text-primary mt-1">Next: Mar 18</p>
      </div>
      <div className="rounded-xl border border-border/40 bg-muted/30 px-3 py-2">
        <p className="text-foreground">Channel performance</p>
        <p className="text-xs text-muted-foreground">Daily 7:30 AM • Slack</p>
        <p className="text-xs font-semibold text-primary mt-1">Next: tomorrow</p>
      </div>
      <div className="rounded-xl border border-border/40 bg-muted/30 px-3 py-2 flex items-center justify-between">
        <div>
          <p className="text-foreground">Custom dashboard export</p>
          <p className="text-xs text-muted-foreground">CSV + PDF</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Schedule</span>
      </div>
    </div>
  </div>
);
