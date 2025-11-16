'use client';

import { useState } from 'react';
import { Wand2, Search, MessageCircle } from 'lucide-react';

export default function AIAccordion() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: Wand2,
      title: 'AI Writing & Optimization',
      content: 'AI co-authors articles with you. Suggests better phrasing, improves clarity, optimizes for SEO. Makes every writer sound like your best writer.',
      color: 'from-[#F28D1B] to-[#FFB633]'
    },
    {
      icon: Search,
      title: 'Content Gap Analysis',
      content: 'AI identifies missing content by analyzing unanswered searches and customer questions. Shows you exactly what articles to write next.',
      color: 'from-[#FFB633] to-[#FEE3AC]'
    },
    {
      icon: MessageCircle,
      title: 'Pullse Chatbot Integration',
      content: 'Appo plugs directly into Pullse AI chatbots. Customers ask questions, chatbot pulls instant answers from your help centers—no setup required.',
      color: 'from-[#F28D1B] to-[#503225]'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === index;

          return (
            <div key={index} className="group">
              <button
                type="button"
                onClick={() => setActiveTab(index)}
                className={`w-full text-left rounded-xl border transition-all ${
                  isActive
                    ? 'border-[#F28D1B]/50 bg-gradient-to-r from-[#F28D1B]/15 to-[#FFB633]/5 shadow-lg'
                    : 'border-border/40 bg-card/80 hover:border-[#F28D1B]/30 hover:bg-card'
                }`}
              >
                <div className="flex items-center gap-3 p-3.5 md:p-4">
                  <div className={`flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tab.color} shadow-lg transition-all ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon className="h-4.5 w-4.5 md:h-5 md:w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold transition-colors ${isActive ? 'text-[#F28D1B]' : 'text-foreground group-hover:text-[#F28D1B]'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  <div className={`text-[#F28D1B] transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {isActive && (
                <div className="mt-2 rounded-xl border border-[#F28D1B]/20 bg-gradient-to-br from-[#FEE3AC]/10 to-transparent backdrop-blur-sm p-4 md:p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tab.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
