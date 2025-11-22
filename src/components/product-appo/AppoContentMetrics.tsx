'use client';

import { FileText, Clock, TrendingUp, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: typeof FileText;
  iconBg: string;
}

const AppoContentMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats: StatCard[] = [
    {
      label: 'Word Count',
      value: '1,247',
      trend: '+12% from last edit',
      trendUp: true,
      icon: FileText,
      iconBg: 'bg-[#FF6D33]/10',
    },
    {
      label: 'Reading Time',
      value: '4 min',
      trend: 'Average reader',
      trendUp: false,
      icon: Clock,
      iconBg: 'bg-[#FF6D33]/10',
    },
    {
      label: 'SEO Score',
      value: '78/100',
      trend: '+5 from last check',
      trendUp: true,
      icon: TrendingUp,
      iconBg: 'bg-[#10B981]/10',
    },
    {
      label: 'Readability',
      value: '65/100',
      trend: 'Grade 8 level',
      trendUp: false,
      icon: Star,
      iconBg: 'bg-[#F59E0B]/10',
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#F4E6D8] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFE8D0] p-6 shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-4 h-32 w-32 rounded-full bg-[#FFB443]/12 blur-3xl" />
        <div className="absolute right-0 top-8 h-28 w-28 rounded-full bg-[#FF6D33]/10 blur-3xl" />
      </div>
      {/* Header */}
      <div className="relative mb-6">
        <h3 className="text-lg font-bold text-[#1E120B]">Content Metrics</h3>
        <p className="text-sm text-[#7B614F]">Real-time analysis of your article</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="relative grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-xl border border-[#F2E6D8] bg-white/95 p-4 shadow-[0_14px_32px_rgba(255,140,40,0.07)] transition-all hover:shadow-[0_16px_38px_rgba(255,140,40,0.12)]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: `all 0.3s ease ${index * 0.1}s`,
              }}
            >
              {/* Icon in top-right */}
              <div className={`absolute right-4 top-4 rounded-full ${stat.iconBg} p-2`}>
                <Icon className="h-4 w-4 text-[#FF6D33]" />
              </div>

              {/* Value */}
              <div className="mb-1">
                <p className="text-2xl font-bold text-[#1E120B]">{stat.value}</p>
              </div>

              {/* Label */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8A6A54]">{stat.label}</p>

              {/* Trend */}
              <div className="flex items-center gap-1">
                {stat.trendUp && (
                  <svg className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 12 12">
                    <path
                      d="M6 2L6 10M6 2L9 5M6 2L3 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span
                  className={`text-xs font-medium ${
                    stat.trendUp ? 'text-green-600' : 'text-[#7B614F]'
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Insights */}
      <div className="mt-4 rounded-xl border border-[#F2E6D8] bg-white/95 p-3 shadow-[0_12px_28px_rgba(255,140,40,0.07)]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8A6A54]">Quick Insights</p>
        <div className="space-y-1.5 text-[#3D2A1F]">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-1.5 w-1.5 rounded-full bg-[#10B981]"></div>
            <span className="text-[#7B614F]">Keyword density is optimal</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]"></div>
            <span className="text-[#7B614F]">Consider adding 2 more headings</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-1.5 w-1.5 rounded-full bg-[#FF6D33]"></div>
            <span className="text-[#7B614F]">8 internal links detected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoContentMetrics;
