'use client';

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const HANDLE_TIME_MINUTES = 12;
const HOURLY_COST = 40;
const AUTOMATION_COVERAGE_TARGET = 0.6;
const AUTOMATED_HANDLE_MINUTES = 2;
const COPILOT_SPEED_BOOST = 0.4;
const HOURS_PER_FTE = 160;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(Math.round(value));

const RoiCalculator = () => {
  const [reps, setReps] = useState(12);
  const [tickets, setTickets] = useState(4500);

  const baselineHours = useMemo(() => (tickets * HANDLE_TIME_MINUTES) / 60, [tickets]);
  const baselineCost = baselineHours * HOURLY_COST;

  const pullse = useMemo(() => {
    const automatedTickets = tickets * AUTOMATION_COVERAGE_TARGET;
    const assistedTickets = tickets - automatedTickets;
    const automatedHours = (automatedTickets * AUTOMATED_HANDLE_MINUTES) / 60;
    const assistedHours = (assistedTickets * HANDLE_TIME_MINUTES * (1 - COPILOT_SPEED_BOOST)) / 60;
    const totalHours = automatedHours + assistedHours;
    return {
      hours: totalHours,
      cost: totalHours * HOURLY_COST,
      automatedTickets,
      assistedTickets,
    };
  }, [tickets]);

  const hoursSaved = Math.max(baselineHours - pullse.hours, 0);
  const costSaved = Math.max(baselineCost - pullse.cost, 0);
  const capacityLift = pullse.hours > 0 ? (baselineHours / pullse.hours - 1) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Estimate your monthly impact</h3>
        <p className="text-sm text-muted-foreground">
          Adjust the inputs to see a directional view of time and cost savings. We’ll tune the model with your real numbers during onboarding.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground" htmlFor="reps">
            Support reps today
          </label>
          <Input
            id="reps"
            type="number"
            min={1}
            value={reps}
            onChange={(event) => setReps(Math.max(1, Number(event.target.value)))}
          />
          <Slider value={[reps]} min={1} max={100} onValueChange={([value]) => setReps(value)} />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground" htmlFor="tickets">
            Monthly tickets across channels
          </label>
          <Input
            id="tickets"
            type="number"
            min={100}
            step={100}
            value={tickets}
            onChange={(event) => setTickets(Math.max(100, Number(event.target.value)))}
          />
          <Slider value={[tickets]} min={500} max={20000} step={100} onValueChange={([value]) => setTickets(value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Manual effort today</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatNumber(baselineHours)} hrs</p>
          <p className="text-xs text-muted-foreground">Approximate team hours each month</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Projected effort with Pullse</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatNumber(pullse.hours)} hrs</p>
          <p className="text-xs text-muted-foreground">Assumes 60% automation coverage & copilots</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hours saved monthly</p>
          <p className="mt-2 text-2xl font-bold text-primary">{formatNumber(hoursSaved)} hrs</p>
          <p className="text-xs text-muted-foreground">Equivalent to {Math.max(0, Math.round(hoursSaved / HOURS_PER_FTE))} FTEs</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Monthly cost today</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(baselineCost)}</p>
          <p className="text-xs text-muted-foreground">Assumes ${HOURLY_COST}/hour fully-loaded cost</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Projected savings</p>
          <p className="mt-2 text-2xl font-bold text-primary">{formatCurrency(costSaved)}</p>
          <p className="text-xs text-muted-foreground">~{Math.round(capacityLift)}% more capacity for the same team</p>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground">
        These figures are directional. During onboarding we will plug in your real handle times, blended costs, and automation targets. Ready to dive deeper?
      </div>
    </div>
  );
};

export default RoiCalculator;
