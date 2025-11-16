'use client';

import AnimatedCounter from '@/components/AnimatedCounter';

export default function ProductInboxChannelsHeroStats() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-6">
      <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-4 md:p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative space-y-2">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tabular-nums">
            <AnimatedCounter value={2} duration={1500} />
          </div>
          <div className="text-sm font-semibold text-muted-foreground">channels</div>
          <div className="text-xs text-muted-foreground/70">Email + Live Chat</div>
        </div>
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary animate-pulse" />
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-4 md:p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative space-y-2">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tabular-nums">
            <AnimatedCounter value={80} suffix="%" duration={1800} />
          </div>
          <div className="text-sm font-semibold text-muted-foreground">automation</div>
          <div className="text-xs text-muted-foreground/70">Avg rate achieved</div>
        </div>
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-4 md:p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative space-y-2">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent tabular-nums">
            <AnimatedCounter value={100} prefix="<" suffix="ms" duration={1600} />
          </div>
          <div className="text-sm font-semibold text-muted-foreground">latency</div>
          <div className="text-xs text-muted-foreground/70">Real-time sync</div>
        </div>
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-4 md:p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative space-y-2">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent tabular-nums">
            <AnimatedCounter value={3} duration={1400} />
          </div>
          <div className="text-sm font-semibold text-muted-foreground">routing methods</div>
          <div className="text-xs text-muted-foreground/70">Assignment options</div>
        </div>
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );
}
