'use client';

import { useEffect, useState, useRef } from "react";
import {
  Zap,
  Clock,
  AlertTriangle,
  DollarSign,
  Loader2,
  CheckCircle2,
  Brain,
  UserCheck,
  RefreshCw,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";

export default function VisualWorkflowRace() {
  const [raceProgress, setRaceProgress] = useState(0);
  const [raceAnimated, setRaceAnimated] = useState(false);
  const [isRacePlaying, setIsRacePlaying] = useState(false);
  const raceRef = useRef<HTMLDivElement>(null);

  // Race animation trigger on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Race animation trigger
      if (raceRef.current && !raceAnimated) {
        const rect = raceRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6) {
          setRaceAnimated(true);
          // Start auto-play after a brief delay
          setTimeout(() => {
            setIsRacePlaying(true);
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [raceAnimated]);

  // Race auto-play animation
  useEffect(() => {
    if (!isRacePlaying) return;

    const duration = 4000; // 4 seconds for snappier, more dramatic animation
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentProgress = easeProgress * 100;

      setRaceProgress(currentProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsRacePlaying(false);
      }
    };

    requestAnimationFrame(animate);
  }, [isRacePlaying]);

  return (
    <section ref={raceRef} className="relative py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] max-w-5xl mx-auto">
              One angry customer. Two completely different outcomes.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real refund request. Watch what happens with traditional tools vs Pullse.
            </p>
          </div>

          {/* The Scenario */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-2xl border-2 border-destructive/40 bg-gradient-to-br from-destructive/10 to-destructive/5 p-8 overflow-hidden">
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/20 border border-destructive/40">
                <Clock className="h-3.5 w-3.5 text-destructive animate-pulse" />
                <span className="text-xs font-bold text-destructive">Friday 4:47 PM</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 border-2 border-destructive/40 shrink-0">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Enterprise Customer (ID: #8472)</div>
                    <div className="text-xs text-muted-foreground">$10,000/year subscription • 47 seats</div>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5">
                  <div className="text-lg font-semibold text-destructive mb-2">
                    "I was charged $500 EXTRA this month! This is UNACCEPTABLE!"
                  </div>
                  <p className="text-base text-foreground leading-relaxed">
                    "Refund me RIGHT NOW or I'm canceling our entire company account. I need this resolved immediately—I'm escalating to our executive team in 5 minutes if I don't hear back."
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-destructive" />
                  <span className="font-bold text-destructive">At Risk: $10K/year contract</span>
                  <span className="text-muted-foreground">•</span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">5 minutes to respond</span>
                </div>
              </div>
            </div>
          </div>

          {/* Split-Screen Comparison */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Traditional Side - Chaos */}
            <div className="relative rounded-3xl border-[3px] border-destructive/50 bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent pt-12 px-8 pb-8 overflow-hidden shadow-xl">
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-destructive/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/20 border border-destructive/40">
                    <AlertTriangle className="h-7 w-7 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-destructive">Traditional Workflow</h3>
                    <p className="text-sm text-muted-foreground">Multiple browser tabs • Constant switching</p>
                  </div>
                </div>

              {/* Browser Windows - Tool Chaos */}
              <div className="space-y-4 mb-8">
                {[
                  { tool: 'Zendesk Support', icon: '🎫', action: 'Open ticket, read message, copy customer ID...', progress: raceProgress > 0, delay: 0, color: 'bg-red-500' },
                  { tool: 'Stripe Dashboard', icon: '💳', action: 'Search customer, find transaction, verify amount...', progress: raceProgress > 25, delay: 100, color: 'bg-blue-500' },
                  { tool: 'Gmail', icon: '✉️', action: 'Draft email, copy details, paste confirmation...', progress: raceProgress > 50, delay: 200, color: 'bg-green-500' },
                  { tool: 'Zendesk Support', icon: '🎫', action: 'Update ticket, add notes, change status...', progress: raceProgress > 75, delay: 300, color: 'bg-red-500' },
                ].map((window, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-lg border transition-all duration-500 overflow-hidden ${
                      window.progress
                        ? 'border-destructive/60 shadow-lg scale-[1.02] z-10'
                        : 'border-border/30 opacity-30'
                    }`}
                    style={{ transitionDelay: `${window.delay}ms` }}
                  >
                    {/* Browser Chrome */}
                    <div className={`flex items-center gap-2 px-3 py-2 border-b ${
                      window.progress ? 'bg-card border-destructive/30 animate-pulse' : 'bg-muted/50 border-border/20'
                    }`}>
                      <div className="flex gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-destructive/40" />
                        <div className="h-2 w-2 rounded-full bg-orange-500/40" />
                        <div className="h-2 w-2 rounded-full bg-green-500/40" />
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs">{window.icon}</span>
                        <span className="text-xs font-medium text-foreground/70 truncate">{window.tool}</span>
                        {window.progress && (
                          <div className="ml-auto flex items-center gap-1">
                            <Loader2 className="h-3 w-3 text-destructive animate-spin" />
                            <span className={`h-1.5 w-1.5 rounded-full ${window.color} animate-pulse`} />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Window Content */}
                    <div className={`p-4 ${window.progress ? 'bg-destructive/5' : 'bg-card/50'}`}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{window.action}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Agent Stress Indicator */}
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-destructive">Agent Status</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                    <span className="text-xs font-bold text-destructive">Stressed</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Time elapsed</span>
                    <span className="font-bold text-destructive tabular-nums">
                      {Math.round((raceProgress / 100) * 220)}s
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-destructive/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-destructive to-destructive/60 transition-all duration-300"
                      style={{ width: `${Math.min(raceProgress, 100)}%` }}
                    />
                  </div>
                </div>

                {raceProgress >= 100 && (
                  <div className="pt-3 border-t border-destructive/20 animate-in fade-in duration-500">
                    <p className="text-sm text-destructive font-semibold">
                      ✗ 3 minutes 40 seconds wasted • Customer still angry
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Impact */}
              <div className="mt-8 pt-8 border-t border-destructive/20 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Browser tabs open</span>
                  <span className="font-bold text-destructive">4-6 windows active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Context switches</span>
                  <span className="font-bold text-destructive">15+ tab changes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Customer outcome</span>
                  <span className="font-bold text-destructive">Still escalating</span>
                </div>
              </div>
              </div>
            </div>

            {/* Pullse Side - Calm */}
            <div className="relative rounded-3xl border-2 border-primary/60 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent pt-12 px-8 pb-8 overflow-hidden shadow-xl">
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-primary/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                    <Zap className="h-7 w-7 text-background" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-primary">Pullse Unified Dashboard</h3>
                    <p className="text-sm text-primary/80">Single interface • All tools connected</p>
                  </div>
                </div>

              {/* Unified Dashboard Interface */}
              <div className="space-y-4 mb-8">
                {/* Dashboard Header - Command Input */}
                <div className="relative rounded-lg border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--primary-rgb),0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />

                  {/* Dashboard Chrome */}
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/20 bg-primary/5">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500/40" />
                      <div className="h-2 w-2 rounded-full bg-green-500/40" />
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Zap className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-primary">Pullse AI Dashboard</span>
                      <div className="ml-auto flex items-center gap-1.5 bg-green-600/10 px-2 py-0.5 rounded-full">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                        <span className="text-xs font-semibold text-green-600">Live</span>
                      </div>
                    </div>
                  </div>

                  {/* Command Input */}
                  <div className="relative p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">AI Command</span>
                    </div>
                    <p className="text-base font-semibold text-foreground">
                      "Issue $250 refund and email confirmation"
                    </p>
                  </div>
                </div>

                {/* Dashboard Activity Feed - Unified View */}
                <div className="relative rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
                  <div className="p-4 space-y-3">
                    {[
                      { icon: Brain, action: 'AI analyzing request', detail: 'Intent: refund + notify', progress: raceProgress > 0, time: '0.5s' },
                      { icon: Zap, action: 'Executing Stripe API', detail: '$250 processed', progress: raceProgress > 0.9, time: '2s' },
                      { icon: CheckCircle2, action: 'Updating systems', detail: 'Ticket + Email auto-updated', progress: raceProgress > 2, time: '4s' },
                      { icon: UserCheck, action: 'Customer notified', detail: 'Confirmation sent', progress: raceProgress > 3, time: '8s' },
                    ].map((action, idx) => {
                      const Icon = action.icon;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                            action.progress
                              ? 'bg-primary/10 border border-primary/30'
                              : 'bg-muted/20 opacity-30'
                          }`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 transition-all duration-500 ${
                            action.progress
                              ? 'bg-gradient-to-br from-primary to-purple-600 shadow-md'
                              : 'bg-muted'
                          }`}>
                            <Icon className={`h-4 w-4 ${action.progress ? 'text-background' : 'text-muted-foreground'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${action.progress ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {action.action}
                            </p>
                            <p className="text-xs text-muted-foreground">{action.detail}</p>
                          </div>
                          {action.progress && (
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-bold text-green-600 tabular-nums">{action.time}</span>
                              <CheckCircle2 className="h-5 w-5 text-green-600 animate-in zoom-in duration-300" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Agent Status - Calm */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">Agent Status</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs font-bold text-green-600">Relaxed</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Time elapsed</span>
                    <span className="font-bold text-primary tabular-nums">
                      {Math.min(Math.round((raceProgress / 100) * 8), 8)}s
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 shadow-sm"
                      style={{ width: `${Math.min(raceProgress * 27.5, 100)}%` }}
                    />
                  </div>
                </div>

                {raceProgress >= 3.6 && (
                  <div className="pt-3 border-t border-primary/20 animate-in fade-in duration-500">
                    <p className="text-sm text-green-600 font-semibold">
                      ✓ Done in 8 seconds • Customer satisfied • On to next ticket
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Impact */}
              <div className="mt-8 pt-8 border-t border-primary/20 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dashboard tabs</span>
                  <span className="font-bold text-primary">1 unified interface</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Context switches</span>
                  <span className="font-bold text-primary">0 tab changes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Customer outcome</span>
                  <span className="font-bold text-green-600">Account saved</span>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Business Impact Summary */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card/90 p-8 md:p-12 overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative">
                <div className="text-center mb-8">
                  <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                    The Bottom Line
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    What this transformation means for your business
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {/* Time Saved */}
                  <div className="group text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg mb-4 group-hover:scale-110 transition-all duration-300">
                      <Clock className="h-8 w-8 text-background" />
                    </div>
                    <div className="text-5xl font-black text-foreground mb-2">
                      {raceProgress >= 100 ? '212s' : '---'}
                    </div>
                    <div className="text-sm font-bold text-foreground mb-1">Saved Per Refund</div>
                    <div className="text-xs text-muted-foreground">
                      27× faster execution
                    </div>
                  </div>

                  {/* Account Saved */}
                  <div className="group text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg mb-4 group-hover:scale-110 transition-all duration-300">
                      <DollarSign className="h-8 w-8 text-background" />
                    </div>
                    <div className="text-5xl font-black text-green-600 mb-2">
                      {raceProgress >= 3.6 ? '$10K' : '---'}
                    </div>
                    <div className="text-sm font-bold text-foreground mb-1">Account Retained</div>
                    <div className="text-xs text-muted-foreground">
                      Customer satisfaction ↑
                    </div>
                  </div>

                  {/* Error Prevention */}
                  <div className="group text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg mb-4 group-hover:scale-110 transition-all duration-300">
                      <Shield className="h-8 w-8 text-background" />
                    </div>
                    <div className="text-5xl font-black text-foreground mb-2">
                      {raceProgress >= 3.6 ? '85%' : '---'}
                    </div>
                    <div className="text-sm font-bold text-foreground mb-1">Fewer Errors</div>
                    <div className="text-xs text-muted-foreground">
                      API-driven accuracy
                    </div>
                  </div>
                </div>

                {raceProgress >= 100 && (
                  <div className="mt-8 pt-8 border-t border-border/40 text-center animate-in fade-in duration-500">
                    <p className="text-base text-foreground mb-4 font-semibold">
                      This is just one refund. Multiply this across your entire support team.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <TrendingUp className="h-4 w-4" />
                        <span>10 agents × 50 refunds/month = 29 hours saved</span>
                      </div>
                      <span className="hidden sm:inline text-border">•</span>
                      <div className="flex items-center gap-2 text-green-600 font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Zero customer churn from refund delays</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Replay Button */}
          <div className="max-w-5xl mx-auto text-center">
            <button
              onClick={() => {
                setRaceProgress(0);
                setTimeout(() => setIsRacePlaying(true), 100);
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-background font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              Watch Again
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              See the dramatic difference between traditional tools and Pullse AI execution
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
