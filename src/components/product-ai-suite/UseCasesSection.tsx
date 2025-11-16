'use client';

import { useState } from 'react';
import {
  Bot,
  Sparkles,
  ShoppingCart,
  Clock,
  LifeBuoy,
  Zap,
  Database,
  Users,
  TrendingUp,
} from 'lucide-react';

export default function UseCasesSection() {
  const [activeUseCaseTab, setActiveUseCaseTab] = useState<'chatbot' | 'copilot'>('chatbot');
  const [selectedStat, setSelectedStat] = useState<number | null>(0);
  const [expandedUseCase, setExpandedUseCase] = useState<number | null>(null);
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/20 mb-6">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">AI-Powered Solutions</span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            Real problems.
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Real solutions.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how AI Chatbots and Copilots transform your support operations
          </p>
        </div>

        {/* Single Card with Sidebar - Light Mode */}
        <div className="max-w-[1300px] mx-auto">
          <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)_inset]">
            {/* Light mode mesh gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.06)_0%,transparent_50%)]" />

            <div className="grid lg:grid-cols-[360px,1fr] relative">
              {/* Left Sidebar - Use Case Selector */}
              <div className="border-r border-border/50 bg-gradient-to-b from-background/40 via-card/20 to-background/40 p-5 md:p-6 lg:p-8 relative backdrop-blur-sm">
                {/* Tabs with sliding indicator - Light Mode */}
                <div className="relative flex gap-1 mb-4 md:mb-5 lg:mb-6 p-1 bg-background/80 rounded-[18px] backdrop-blur-xl border border-border/60 shadow-sm">
                  {/* Sliding indicator - Light mode */}
                  <div
                    className={`absolute top-1 h-[calc(100%-8px)] rounded-[14px] transition-all duration-700 ease-out ${
                      activeUseCaseTab === 'chatbot'
                        ? 'left-1 w-[calc(50%-6px)] bg-gradient-to-br from-primary to-purple-600 shadow-md'
                        : 'left-[calc(50%+3px)] w-[calc(50%-6px)] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md'
                    }`}
                  />
                  <button
                    onClick={() => {
                      setActiveUseCaseTab('chatbot');
                      setSelectedStat(0);
                    }}
                    className={`flex-1 px-4 py-2.5 md:px-4.5 md:py-2.5 lg:px-5 lg:py-3 rounded-[14px] text-[13px] font-bold tracking-wide transition-all duration-500 relative z-10 ${
                      activeUseCaseTab === 'chatbot'
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Bot className="h-3.5 w-3.5 md:h-3.5 lg:h-4 md:w-3.5 lg:w-4 inline mr-2 -mt-0.5" />
                    Chatbots
                  </button>
                  <button
                    onClick={() => {
                      setActiveUseCaseTab('copilot');
                      setSelectedStat(3);
                    }}
                    className={`flex-1 px-4 py-2.5 md:px-4.5 md:py-2.5 lg:px-5 lg:py-3 rounded-[14px] text-[13px] font-bold tracking-wide transition-all duration-500 relative z-10 ${
                      activeUseCaseTab === 'copilot'
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5 md:h-3.5 lg:h-4 md:w-3.5 lg:w-4 inline mr-2 -mt-0.5" />
                    Copilots
                  </button>
                </div>

                {/* Use Case List */}
                <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
                  {activeUseCaseTab === 'chatbot' ? (
                    <>
                      <button
                        onClick={() => setSelectedStat(0)}
                        className={`group relative w-full text-left p-3 md:p-3.5 lg:p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedStat === 0
                            ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                            : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedStat === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                        <div className="relative flex items-center gap-2.5 md:gap-3 mb-2">
                          <div className={`flex h-9 w-9 md:h-9.5 lg:h-10 md:w-9.5 lg:w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                            selectedStat === 0 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <ShoppingCart className="h-4.5 w-4.5 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-[13px] md:text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 0 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Order Tracking</div>
                          </div>
                          {selectedStat === 0 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                          )}
                        </div>
                        <div className={`text-[11px] leading-relaxed ml-[44px] md:ml-[50px] lg:ml-[52px] transition-colors duration-500 ${selectedStat === 0 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Automate WISMO inquiries</div>
                      </button>

                      <button
                        onClick={() => setSelectedStat(1)}
                        className={`group relative w-full text-left p-3 md:p-3.5 lg:p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedStat === 1
                            ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                            : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedStat === 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                        <div className="relative flex items-center gap-2.5 md:gap-3 mb-2">
                          <div className={`flex h-9 w-9 md:h-9.5 lg:h-10 md:w-9.5 lg:w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                            selectedStat === 1 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <Clock className="h-4.5 w-4.5 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-[13px] md:text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 1 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>After-Hours Support</div>
                          </div>
                          {selectedStat === 1 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                          )}
                        </div>
                        <div className={`text-[11px] leading-relaxed ml-[44px] md:ml-[50px] lg:ml-[52px] transition-colors duration-500 ${selectedStat === 1 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>24/7 coverage</div>
                      </button>

                      <button
                        onClick={() => setSelectedStat(2)}
                        className={`group relative w-full text-left p-3 md:p-3.5 lg:p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedStat === 2
                            ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                            : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedStat === 2 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                        <div className="relative flex items-center gap-2.5 md:gap-3 mb-2">
                          <div className={`flex h-9 w-9 md:h-9.5 lg:h-10 md:w-9.5 lg:w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                            selectedStat === 2 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <LifeBuoy className="h-4.5 w-4.5 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-[13px] md:text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 2 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>FAQ Deflection</div>
                          </div>
                          {selectedStat === 2 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                          )}
                        </div>
                        <div className={`text-[11px] leading-relaxed ml-[44px] md:ml-[50px] lg:ml-[52px] transition-colors duration-500 ${selectedStat === 2 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Instant answers</div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedStat(3)}
                        className={`group relative w-full text-left p-3 md:p-3.5 lg:p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedStat === 3
                            ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                            : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-purple-600/5 to-transparent transition-opacity duration-500 ${selectedStat === 3 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                        <div className="relative flex items-center gap-2.5 md:gap-3 mb-2">
                          <div className={`flex h-9 w-9 md:h-9.5 lg:h-10 md:w-9.5 lg:w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                            selectedStat === 3 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <Zap className="h-4.5 w-4.5 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-[13px] md:text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 3 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Go Live Faster</div>
                          </div>
                          {selectedStat === 3 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.6)] animate-pulse" />
                          )}
                        </div>
                        <div className={`text-[11px] leading-relaxed ml-[44px] md:ml-[50px] lg:ml-[52px] transition-colors duration-500 ${selectedStat === 3 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>AI-guided setup</div>
                      </button>

                      <button
                        onClick={() => setSelectedStat(4)}
                        className={`group relative w-full text-left p-3 md:p-3.5 lg:p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedStat === 4
                            ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                            : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-purple-600/5 to-transparent transition-opacity duration-500 ${selectedStat === 4 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                        <div className="relative flex items-center gap-2.5 md:gap-3 mb-2">
                          <div className={`flex h-9 w-9 md:h-9.5 lg:h-10 md:w-9.5 lg:w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                            selectedStat === 4 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <Database className="h-4.5 w-4.5 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-[13px] md:text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 4 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>On-Demand Execution</div>
                          </div>
                          {selectedStat === 4 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.6)] animate-pulse" />
                          )}
                        </div>
                        <div className={`text-[11px] leading-relaxed ml-[44px] md:ml-[50px] lg:ml-[52px] transition-colors duration-500 ${selectedStat === 4 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Cross-system actions</div>
                      </button>

                      <button
                        onClick={() => setSelectedStat(5)}
                        className={`group relative w-full text-left p-3 md:p-3.5 lg:p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedStat === 5
                            ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                            : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-purple-600/5 to-transparent transition-opacity duration-500 ${selectedStat === 5 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                        <div className="relative flex items-center gap-2.5 md:gap-3 mb-2">
                          <div className={`flex h-9 w-9 md:h-9.5 lg:h-10 md:w-9.5 lg:w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                            selectedStat === 5 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <Users className="h-4.5 w-4.5 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-[13px] md:text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 5 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Faster Ramp Time</div>
                          </div>
                          {selectedStat === 5 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.6)] animate-pulse" />
                          )}
                        </div>
                        <div className={`text-[11px] leading-relaxed ml-[44px] md:ml-[50px] lg:ml-[52px] transition-colors duration-500 ${selectedStat === 5 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Agent onboarding</div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Right Content Area */}
              <div className="p-6 md:p-8 lg:p-10 xl:p-12 relative">
                {selectedStat === 0 && (
                  <div className="space-y-6 md:space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 relative">
                    {/* Floating gradient orbs */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl opacity-40 animate-pulse" />

                    <div className="relative">
                      <div className="flex items-start gap-3 md:gap-4 lg:gap-5 mb-4 md:mb-5 lg:mb-6">
                        <div className="relative group">
                          <div className="flex h-16 w-16 md:h-18 lg:h-20 md:w-18 lg:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-purple-700 shadow-2xl shadow-primary/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                            <ShoppingCart className="h-8 w-8 md:h-9 lg:h-10 md:w-9 lg:w-10 text-white relative z-10" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Order Tracking</h3>
                          <p className="text-sm md:text-base text-muted-foreground font-medium">Automate "Where's my order?" inquiries with instant answers</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 relative">
                      <div className="group relative overflow-hidden p-5 md:p-5.5 lg:p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-red-600/5 border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/10">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                          <div className="h-1.5 w-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50" />
                          <span className="text-xs font-black text-red-500 uppercase tracking-widest">The Challenge</span>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed relative z-10">
                          Agents spending <span className="text-foreground font-bold">40% of time</span> on repetitive "Where's my order?" questions
                        </p>
                      </div>

                      <div className="group relative overflow-hidden p-5 md:p-5.5 lg:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-600/5 to-purple-700/5 border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/30 to-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                          <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg shadow-primary/50" />
                          <span className="text-xs font-black text-primary uppercase tracking-widest">AI Solution</span>
                        </div>
                        <p className="text-base md:text-lg text-foreground leading-relaxed font-semibold relative z-10">
                          Bot checks status, sends tracking links, updates customers—<span className="text-primary">instantly</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 md:pt-7 lg:pt-8 relative">
                      <div className="group inline-flex items-center gap-4 md:gap-5 lg:gap-6 px-6 py-5 md:px-7 md:py-5.5 lg:px-8 lg:py-6 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-600/15 to-purple-700/10 border-2 border-primary/40 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 hover:scale-105">
                        <div className="relative">
                          <TrendingUp className="h-10 w-10 md:h-11 lg:h-12 md:w-11 lg:w-12 text-primary relative z-10 group-hover:rotate-12 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
                        </div>
                        <div>
                          <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-purple-600 to-purple-700 bg-clip-text text-transparent">80% reduction</div>
                          <div className="text-xs md:text-sm text-muted-foreground font-semibold uppercase tracking-wider mt-1">in WISMO tickets</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStat === 1 && (
                  <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div>
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="relative flex h-14 w-14 md:h-15 lg:h-16 md:w-15 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl">
                          <Clock className="h-7 w-7 md:h-7.5 lg:h-8 md:w-7.5 lg:w-8 text-background relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-50" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-foreground">After-Hours Support</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">24/7 customer service coverage</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                          <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          Customers frustrated waiting until business hours
                        </p>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-primary rounded-full" />
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Solution</span>
                        </div>
                        <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                          24/7 AI coverage for FAQs, basic troubleshooting, order changes
                        </p>
                      </div>
                    </div>
                    <div className="pt-5 md:pt-6 border-t border-border/50">
                      <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/10 border border-primary/30">
                        <TrendingUp className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                        <div>
                          <div className="text-2xl md:text-3xl font-black text-primary">3x more</div>
                          <div className="text-xs md:text-sm text-muted-foreground">issues resolved outside 9-5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStat === 2 && (
                  <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div>
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="relative flex h-14 w-14 md:h-15 lg:h-16 md:w-15 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl">
                          <LifeBuoy className="h-7 w-7 md:h-7.5 lg:h-8 md:w-7.5 lg:w-8 text-background relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-50" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-foreground">FAQ Deflection</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">Instantly resolve common questions</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                          <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          Same questions asked hundreds of times daily
                        </p>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-primary rounded-full" />
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Solution</span>
                        </div>
                        <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                          AI instantly answers password resets, how-tos, account setup
                        </p>
                      </div>
                    </div>
                    <div className="pt-5 md:pt-6 border-t border-border/50">
                      <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/10 border border-primary/30">
                        <TrendingUp className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                        <div>
                          <div className="text-2xl md:text-3xl font-black text-primary">85%</div>
                          <div className="text-xs md:text-sm text-muted-foreground">FAQ deflection rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStat === 3 && (
                  <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div>
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="relative flex h-14 w-14 md:h-15 lg:h-16 md:w-15 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl">
                          <Zap className="h-7 w-7 md:h-7.5 lg:h-8 md:w-7.5 lg:w-8 text-background relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 blur-xl opacity-50" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-foreground">Go Live Faster</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">AI-guided platform configuration</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                          <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          Months of manual configuration delays deployment
                        </p>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-purple-500 rounded-full" />
                          <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">AI Solution</span>
                        </div>
                        <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                          Use copilots to configure Pullse—AI guides setup, suggests best practices, automates workflows
                        </p>
                      </div>
                    </div>
                    <div className="pt-5 md:pt-6 border-t border-border/50">
                      <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-500/30">
                        <TrendingUp className="h-7 w-7 md:h-8 md:w-8 text-purple-500" />
                        <div>
                          <div className="text-2xl md:text-3xl font-black text-purple-500">10x faster</div>
                          <div className="text-xs md:text-sm text-muted-foreground">time-to-value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStat === 4 && (
                  <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div>
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="relative flex h-14 w-14 md:h-15 lg:h-16 md:w-15 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl">
                          <Database className="h-7 w-7 md:h-7.5 lg:h-8 md:w-7.5 lg:w-8 text-background relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 blur-xl opacity-50" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-foreground">On-Demand Execution</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">Cross-system action automation</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                          <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          Critical actions require jumping between multiple systems
                        </p>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-purple-500 rounded-full" />
                          <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">AI Solution</span>
                        </div>
                        <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                          Execute actions across your entire org stack—CRM, billing, ticketing—all from one place
                        </p>
                      </div>
                    </div>
                    <div className="pt-5 md:pt-6 border-t border-border/50">
                      <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-500/30">
                        <TrendingUp className="h-7 w-7 md:h-8 md:w-8 text-purple-500" />
                        <div>
                          <div className="text-2xl md:text-3xl font-black text-purple-500">5min → 30sec</div>
                          <div className="text-xs md:text-sm text-muted-foreground">task completion time</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStat === 5 && (
                  <div className="space-y-6 md:space-y-7 lg:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div>
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="relative flex h-14 w-14 md:h-15 lg:h-16 md:w-15 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl">
                          <Users className="h-7 w-7 md:h-7.5 lg:h-8 md:w-7.5 lg:w-8 text-background relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 blur-xl opacity-50" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-foreground">Faster Ramp Time</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">AI-powered agent onboarding</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                          <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          New agents take 6-8 weeks to become productive
                        </p>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-purple-500 rounded-full" />
                          <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">AI Solution</span>
                        </div>
                        <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                          Copilot acts as always-available senior mentor—suggests answers, surfaces docs in real-time
                        </p>
                      </div>
                    </div>
                    <div className="pt-5 md:pt-6 border-t border-border/50">
                      <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-500/30">
                        <TrendingUp className="h-7 w-7 md:h-8 md:w-8 text-purple-500" />
                        <div>
                          <div className="text-2xl md:text-3xl font-black text-purple-500">50% faster</div>
                          <div className="text-xs md:text-sm text-muted-foreground">agent onboarding</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
