'use client';

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, TrendingDown } from "lucide-react";

// Constants based on your example
const MEDIAN_SALARY_YEARLY = 45000; // $45k/year
const TRADITIONAL_PLATFORM_LICENSE = 140; // $140/month per user
const TRADITIONAL_AUTOMATION_RATE = 0.20; // 20% automation
const TRADITIONAL_AUTOMATION_COST = 1.00; // $1.00 per automated ticket

const PULLSE_LICENSE = 80; // $80/month per user
const PULLSE_AUTOMATION_RATE = 0.70; // 70% automation
const PULLSE_AUTOMATION_COST = 0.24; // $0.24 per automated ticket
const PULLSE_PRODUCTIVITY_BOOST = 1.30; // 30% capacity increase with Pullse

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(Math.round(value));

const RoiCalculator = () => {
  const [reps, setReps] = useState(10);
  const [tickets, setTickets] = useState(12000);

  // Calculate traditional setup costs
  const traditional = useMemo(() => {
    const monthlySalaryCost = (MEDIAN_SALARY_YEARLY / 12) * reps;
    const platformLicenseCost = TRADITIONAL_PLATFORM_LICENSE * reps;
    const automatedTickets = tickets * TRADITIONAL_AUTOMATION_RATE;
    const manualTickets = tickets - automatedTickets;
    const perRepCapacity = manualTickets / reps; // Calculate legacy capacity per rep
    const automationCost = automatedTickets * TRADITIONAL_AUTOMATION_COST;
    const totalCost = monthlySalaryCost + platformLicenseCost + automationCost;

    return {
      reps,
      salaryCost: monthlySalaryCost,
      licenseCost: platformLicenseCost,
      automationCost,
      automatedTickets,
      manualTickets,
      perRepCapacity,
      totalCost,
    };
  }, [reps, tickets]);

  // Calculate Pullse setup costs
  const pullse = useMemo(() => {
    const automatedTickets = tickets * PULLSE_AUTOMATION_RATE;
    const manualTickets = tickets - automatedTickets;

    // Calculate Pullse per-rep capacity: legacy capacity boosted by 30%
    const pullsePerRepCapacity = traditional.perRepCapacity * PULLSE_PRODUCTIVITY_BOOST;

    // Calculate required reps based on boosted capacity
    const requiredReps = Math.ceil(manualTickets / pullsePerRepCapacity);

    const monthlySalaryCost = (MEDIAN_SALARY_YEARLY / 12) * requiredReps;
    const platformLicenseCost = PULLSE_LICENSE * requiredReps;
    const automationCost = automatedTickets * PULLSE_AUTOMATION_COST;
    const totalCost = monthlySalaryCost + platformLicenseCost + automationCost;

    return {
      reps: requiredReps,
      salaryCost: monthlySalaryCost,
      licenseCost: platformLicenseCost,
      automationCost,
      automatedTickets,
      perRepCapacity: pullsePerRepCapacity,
      totalCost,
    };
  }, [tickets, traditional]);

  const savings = traditional.totalCost - pullse.totalCost;
  const savingsPercentage = ((savings / traditional.totalCost) * 100);
  const repsSaved = traditional.reps - pullse.reps;

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">Calculate your savings</h3>
        <p className="text-sm text-muted-foreground">
          Compare costs: traditional setup vs Pullse
        </p>
      </div>

      {/* Compact Input Controls */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Support Reps
            </label>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm font-bold text-primary">{reps}</span>
            </div>
          </div>
          <Slider
            value={[reps]}
            min={5}
            max={100}
            step={5}
            onValueChange={([value]) => setReps(value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Monthly Tickets
            </label>
            <div className="flex h-8 min-w-[60px] items-center justify-center rounded-lg bg-primary/10 border border-primary/20 px-2">
              <span className="text-sm font-bold text-primary">{formatNumber(tickets)}</span>
            </div>
          </div>
          <Slider
            value={[tickets]}
            min={5000}
            max={50000}
            step={1000}
            onValueChange={([value]) => setTickets(value)}
          />
        </div>
      </div>

      {/* Compact Comparison */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Traditional Setup */}
        <div className="rounded-2xl border border-border/50 bg-background p-5 space-y-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Traditional Setup
            </div>
            <div className="text-3xl font-bold text-foreground">{formatCurrency(traditional.totalCost)}</div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Team Size</span>
                <span className="font-bold text-foreground">{reps}</span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-foreground/60 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Automation</span>
                <span className="font-bold text-foreground">20%</span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-foreground/60 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Cost/Ticket</span>
                <span className="font-bold text-foreground">4×</span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-foreground/60 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Pullse Setup */}
        <div className="relative rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 p-5 space-y-4">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-background text-[10px] font-bold uppercase tracking-wider">
            Pullse
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1">
              With Pullse
            </div>
            <div className="text-3xl font-bold text-primary">{formatCurrency(pullse.totalCost)}</div>
            <div className="text-xs text-primary/70">per month ({(100 - savingsPercentage).toFixed(0)}% of traditional)</div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Team Size</span>
                <span className="font-bold text-primary">{pullse.reps} <span className="text-[10px]">(-{repsSaved})</span></span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{ width: `${(pullse.reps / reps) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Automation</span>
                <span className="font-bold text-primary">70% <span className="text-[10px]">(+50%)</span></span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Cost/Ticket</span>
                <span className="font-bold text-primary">1× <span className="text-[10px]">(-75%)</span></span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Savings Summary */}
      <div className="rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/10 to-primary/5 p-6 sm:p-7">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <TrendingDown className="h-3 w-3" />
              Total Savings
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">{formatCurrency(savings)}</div>
            <p className="text-xs text-muted-foreground">per month ({savingsPercentage.toFixed(0)}% savings)</p>
            <p className="text-sm font-semibold text-primary mt-2">{formatCurrency(savings * 12)}/year</p>
          </div>

          <div className="h-px md:h-12 md:w-px bg-border/40 w-full md:w-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 flex-1 w-full">
            <div className="text-center space-y-1.5">
              <div className="text-2xl font-bold text-foreground">{repsSaved}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Fewer Reps</div>
            </div>
            <div className="text-center space-y-1.5">
              <div className="text-2xl font-bold text-foreground">{formatNumber(pullse.automatedTickets)}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Automated</div>
            </div>
            <div className="text-center space-y-1.5">
              <div className="text-2xl font-bold text-primary leading-tight">+50%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Auto Increase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Note */}
      <div className="text-xs text-muted-foreground text-center">
        <span className="font-semibold text-foreground">Note:</span> Projections based on $45k median salary and typical platform costs. We'll use your actual data during onboarding.
      </div>
    </div>
  );
};

export default RoiCalculator;
