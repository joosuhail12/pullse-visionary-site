'use client';

import { Quote, TrendingUp } from "lucide-react";

interface CustomerStoryCardProps {
  companyName: string;
  companySize?: string;
  challenge: string;
  quote: string;
  author: {
    name: string;
    role: string;
  };
  results: {
    metric: string;
    value: string;
  }[];
  gradient?: string;
}

const CustomerStoryCard = ({
  companyName,
  companySize,
  challenge,
  quote,
  author,
  results,
  gradient = "from-purple-500/10 to-pink-500/10"
}: CustomerStoryCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1">
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      <div className="relative p-8 space-y-6">
        {/* Company Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {companyName}
            </h3>
            {companySize && (
              <p className="text-sm text-muted-foreground">
                {companySize}
              </p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Quote className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Challenge */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            Challenge
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {challenge}
          </p>
        </div>

        {/* Quote */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-5">
          <p className="text-base text-foreground leading-relaxed italic mb-4">
            "{quote}"
          </p>
          <div className="flex items-center gap-3 pt-3 border-t border-border/40">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">
                {author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">
                {author.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {author.role}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Results
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-transparent p-4"
              >
                <div className="text-2xl font-black text-primary mb-1">
                  {result.value}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  {result.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};

export default CustomerStoryCard;
