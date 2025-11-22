'use client';

import { Sparkles, Check, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

type AssistantState = 'suggestion' | 'applying' | 'applied';

const AppoAIAssistant = () => {
  const [state, setState] = useState<AssistantState>('suggestion');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state === 'suggestion') {
        setState('applying');
        setTimeout(() => {
          setState('applied');
          setTimeout(() => setState('suggestion'), 3000);
        }, 1500);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [state]);

  const suggestions = [
    {
      id: 1,
      title: 'Improve Clarity',
      description: 'Simplify complex sentences for better readability',
      impact: 'High',
    },
    {
      id: 2,
      title: 'Optimize SEO',
      description: 'Add relevant keywords naturally',
      impact: 'Medium',
    },
    {
      id: 3,
      title: 'Fix Grammar',
      description: '2 grammar issues detected',
      impact: 'Low',
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#F4E6D8] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFE8D2] p-6 shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-4 h-32 w-32 rounded-full bg-[#FFB443]/12 blur-3xl" />
        <div className="absolute right-0 top-10 h-28 w-28 rounded-full bg-[#FF6D33]/10 blur-3xl" />
      </div>
      {/* Header */}
      <div className="relative mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6D33] to-[#FF8C52] shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1E120B]">AI Writing Assistant</h3>
            <p className="text-xs text-[#7B614F]">Appo knows your tone, structure, and SEO goals</p>
          </div>
        </div>

        {state === 'applying' && (
          <div className="flex items-center gap-2 rounded-full bg-[#FF6D33]/10 px-3 py-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6D33]"></div>
            <span className="text-xs font-medium text-[#FF6D33]">Applying...</span>
          </div>
        )}

        {state === 'applied' && (
          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">
            <Check className="h-3 w-3 text-green-600" />
            <span className="text-xs font-medium text-green-600">Applied</span>
          </div>
        )}
      </div>

      <div className="relative mb-4 grid grid-cols-1 gap-3 text-xs text-[#6B5848] sm:grid-cols-3">
        <div className="rounded-lg border border-[#F2E6D8] bg-white/90 p-3 shadow-[0_10px_24px_rgba(255,140,40,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A6A54]">Tone</p>
          <p className="text-sm font-semibold text-[#1E120B]">Supportive, concise</p>
        </div>
        <div className="rounded-lg border border-[#F2E6D8] bg-white/90 p-3 shadow-[0_10px_24px_rgba(255,140,40,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A6A54]">Clarity</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#FFE3C5]">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#FF6D33] to-[#FFB443]" />
            </div>
            <span className="text-[11px] font-semibold text-[#3D2A1F]">78%</span>
          </div>
        </div>
        <div className="rounded-lg border border-[#F2E6D8] bg-white/90 p-3 shadow-[0_10px_24px_rgba(255,140,40,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A6A54]">SEO</p>
          <p className="text-sm font-semibold text-[#1E120B]">Keyword density on target</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative mb-4 rounded-lg border border-[#F2E6D8] bg-white/90 p-4 shadow-[0_18px_40px_rgba(255,140,40,0.08)]">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-[#3D2A1F]">Selected Text</p>
          <span className="text-xs text-[#7B614F]">127 words</span>
        </div>
        <div className="rounded bg-[#FFF7ED] p-3 text-sm leading-relaxed text-[#3D2A1F]">
          <p className={state === 'applied' ? 'font-medium text-[#1E120B]' : ''}>
            {state === 'applied'
              ? 'Appo is an intuitive platform for hosting support documentation. It serves as a central knowledge hub for FAQs, guides, and manuals, helping teams improve self-service and agent efficiency.'
              : 'Appo is a robust, user-friendly platform engineered to host all your essential support documentation. Functioning as your central knowledge hub, it\'s a dynamic repository for FAQs, troubleshooting guides, detailed how-to articles, product manuals, and internal team processes.'}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <p className="mb-3 text-xs font-semibold text-[#3D2A1F]">AI Suggestions</p>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className="group flex items-center justify-between rounded-lg border border-[#F2E6D8] bg-white/90 p-3 transition-all shadow-[0_10px_24px_rgba(255,140,40,0.05)] hover:border-[#FF6D33]/30 hover:shadow-md"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: `all 0.2s ease ${index * 0.05}s`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6D33]/10">
                  <Zap className="h-3 w-3 text-[#FF6D33]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E120B]">{suggestion.title}</p>
                  <p className="text-xs text-[#7B614F]">{suggestion.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    suggestion.impact === 'High'
                      ? 'bg-orange-100 text-orange-700'
                      : suggestion.impact === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {suggestion.impact}
                </span>
                <button className="rounded-lg border border-[#F2E6D8] bg-white px-3 py-1 text-xs font-semibold text-[#3D2A1F] opacity-0 transition-all hover:border-[#FF6D33] hover:bg-[#FF6D33]/5 hover:text-[#FF6D33] group-hover:opacity-100">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-lg border border-[#F2E6D8] bg-white py-2 text-xs font-semibold text-[#3D2A1F] transition-all hover:border-[#FF6D33] hover:bg-[#FF6D33]/5 hover:text-[#FF6D33]">
          Make Concise
        </button>
        <button className="flex-1 rounded-lg border border-[#F2E6D8] bg-white py-2 text-xs font-semibold text-[#3D2A1F] transition-all hover:border-[#FF6D33] hover:bg-[#FF6D33]/5 hover:text-[#FF6D33]">
          Expand
        </button>
        <button className="flex-1 rounded-lg border border-[#F2E6D8] bg-white py-2 text-xs font-semibold text-[#3D2A1F] transition-all hover:border-[#FF6D33] hover:bg-[#FF6D33]/5 hover:text-[#FF6D33]">
          Rephrase
        </button>
      </div>
    </div>
  );
};

export default AppoAIAssistant;
