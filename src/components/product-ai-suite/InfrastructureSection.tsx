'use client';

import { useState } from 'react';
import Link from 'next/link';
import RouteButton from '@/components/RouteButton';
import {
  Database,
  Zap,
  Brain,
  FileText,
  RefreshCw,
  Layers,
  CheckCircle2,
  Code,
  Settings,
  Play,
  Lock,
  MessageSquare,
  TrendingUp,
  Shield,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function InfrastructureSection() {
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<'content' | 'action' | 'engine'>('content');

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6">
            Unified infrastructure.
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Infinite scale.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            One knowledge base, one AI brain, unlimited tools. Build faster, scale easier, manage smarter.
          </p>
        </div>

        <div className="max-w-[1300px] mx-auto">
          <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)_inset]">
            {/* Light mode mesh gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.06)_0%,transparent_50%)]" />

            <div className="grid lg:grid-cols-[360px,1fr] relative">
              {/* Left Sidebar - Navigation Pills */}
              <div className="border-r border-border/50 bg-gradient-to-b from-background/40 via-card/20 to-background/40 p-5 md:p-6 lg:p-8 relative backdrop-blur-sm">
                <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
                  {/* Content Center Pill */}
                  <button
                    onClick={() => setSelectedInfrastructure('content')}
                    className={`group relative w-full text-left p-4 md:p-4.5 lg:p-5 rounded-[18px] transition-all duration-500 ease-out overflow-hidden ${
                      selectedInfrastructure === 'content'
                        ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                        : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-[18px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedInfrastructure === 'content' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    <div className="relative flex items-center gap-3 md:gap-3.5 lg:gap-4">
                      <div className={`flex h-11 w-11 md:h-11.5 lg:h-12 md:w-11.5 lg:w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                        selectedInfrastructure === 'content' ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                      }`}>
                        <Database className="h-5.5 w-5.5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-[15px] md:text-base tracking-tight transition-colors duration-500 ${selectedInfrastructure === 'content' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Content Center</div>
                        <div className="text-[11px] text-muted-foreground/70 mt-0.5">Knowledge hub</div>
                      </div>
                      {selectedInfrastructure === 'content' && (
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                      )}
                    </div>
                  </button>

                  {/* Action Center Pill */}
                  <button
                    onClick={() => setSelectedInfrastructure('action')}
                    className={`group relative w-full text-left p-4 md:p-4.5 lg:p-5 rounded-[18px] transition-all duration-500 ease-out overflow-hidden ${
                      selectedInfrastructure === 'action'
                        ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                        : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-[18px] bg-gradient-to-br from-purple-500/5 to-transparent transition-opacity duration-500 ${selectedInfrastructure === 'action' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    <div className="relative flex items-center gap-3 md:gap-3.5 lg:gap-4">
                      <div className={`flex h-11 w-11 md:h-11.5 lg:h-12 md:w-11.5 lg:w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                        selectedInfrastructure === 'action' ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                      }`}>
                        <Zap className="h-5.5 w-5.5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-[15px] md:text-base tracking-tight transition-colors duration-500 ${selectedInfrastructure === 'action' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Action Center</div>
                        <div className="text-[11px] text-muted-foreground/70 mt-0.5">Integrations</div>
                      </div>
                      {selectedInfrastructure === 'action' && (
                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse" />
                      )}
                    </div>
                  </button>

                  {/* AI Engine Pill */}
                  <button
                    onClick={() => setSelectedInfrastructure('engine')}
                    className={`group relative w-full text-left p-4 md:p-4.5 lg:p-5 rounded-[18px] transition-all duration-500 ease-out overflow-hidden ${
                      selectedInfrastructure === 'engine'
                        ? 'bg-gradient-to-br from-indigo-600/10 to-primary/5 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                        : 'bg-card/50 border border-border/40 hover:border-indigo-500/30 hover:bg-indigo-500/5'
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-[18px] bg-gradient-to-br from-indigo-500/5 to-transparent transition-opacity duration-500 ${selectedInfrastructure === 'engine' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    <div className="relative flex items-center gap-3 md:gap-3.5 lg:gap-4">
                      <div className={`flex h-11 w-11 md:h-11.5 lg:h-12 md:w-11.5 lg:w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-600 to-primary shadow-md transition-all duration-500 ${
                        selectedInfrastructure === 'engine' ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                      }`}>
                        <Brain className="h-5.5 w-5.5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-[15px] md:text-base tracking-tight transition-colors duration-500 ${selectedInfrastructure === 'engine' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>AI Engine</div>
                        <div className="text-[11px] text-muted-foreground/70 mt-0.5">Core intelligence</div>
                      </div>
                      {selectedInfrastructure === 'engine' && (
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Content Panel */}
              <div className="p-6 md:p-8 lg:p-10 xl:p-12 relative">
                <div className="relative min-h-[400px] md:min-h-[500px]">
                  {/* Content Center Content */}
                  {selectedInfrastructure === 'content' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                      <div className="flex items-start gap-3 md:gap-4 lg:gap-5 mb-6 md:mb-8 lg:mb-10">
                        <div className="flex h-16 w-16 md:h-18 lg:h-20 md:w-18 lg:w-20 flex-shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-primary to-purple-600 shadow-2xl">
                          <Database className="h-8 w-8 md:h-9 lg:h-10 md:w-9 lg:w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2 md:mb-3 tracking-tight">Content Center</h3>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">Add content 4 ways—snippets, files, URLs, or Appo articles. The AI Engine retrieves exactly what it needs.</p>
                        </div>
                      </div>

                      <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                        {[
                          { icon: FileText, title: 'Add Content Your Way', desc: 'Drop in quick snippets, upload files, paste URLs, or sync from Appo. We handle the rest.' },
                          { icon: RefreshCw, title: 'Instantly Ready to Use', desc: 'Your content is automatically organized and ready for AI to use. No setup, no waiting.' },
                          { icon: Layers, title: 'Stays Fresh Automatically', desc: 'Update once, and it works everywhere. Your chatbots and copilots always have the latest info.' },
                          { icon: CheckCircle2, title: 'Works Across All Tools', desc: 'Power your AI chatbots and copilots from one place. No need to update content in multiple locations.' }
                        ].map((feature, i) => (
                          <div key={i} className="group relative p-5 md:p-5.5 lg:p-6 rounded-[20px] border border-border/40 bg-gradient-to-br from-card via-background/50 to-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-start gap-3 md:gap-4">
                              <div className="flex h-11 w-11 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-primary/20 to-purple-600/10 group-hover:scale-110 transition-transform duration-500">
                                <feature.icon className="h-4.5 w-4.5 md:h-5 md:w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[15px] md:text-base text-foreground mb-1.5 md:mb-2 tracking-tight">{feature.title}</div>
                                <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 md:mt-8 p-5 md:p-6 rounded-[20px] bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5 border border-primary/20">
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                          <span className="font-medium">Set it and forget it • No maintenance needed • Works everywhere your AI does</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Center Content */}
                  {selectedInfrastructure === 'action' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                      <div className="flex items-start gap-3 md:gap-4 lg:gap-5 mb-6 md:mb-8 lg:mb-10">
                        <div className="flex h-16 w-16 md:h-18 lg:h-20 md:w-18 lg:w-20 flex-shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl">
                          <Zap className="h-8 w-8 md:h-9 lg:h-10 md:w-9 lg:w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2 md:mb-3 tracking-tight">Action Center</h3>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">Connect tools once—the AI Engine executes real actions. Secure, governed, and fully audited.</p>
                        </div>
                      </div>

                      <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                        {[
                          { icon: Code, title: 'Connectors', desc: '50+ integrations including Stripe, Salesforce, Slack, HubSpot, Shopify. Pull data and trigger actions.' },
                          { icon: Settings, title: 'Custom APIs', desc: 'Any REST API. Connect internal tools or external services with custom endpoints.' },
                          { icon: Play, title: 'Approvals', desc: 'Gated actions with multi-level approval workflows. Define who can do what with full control.' },
                          { icon: Lock, title: 'Audit Log', desc: 'Full tracking of every action. Complete audit trail with who, what, when, and why for compliance.' }
                        ].map((feature, i) => (
                          <div key={i} className="group relative p-5 md:p-5.5 lg:p-6 rounded-[20px] border border-border/40 bg-gradient-to-br from-card via-background/50 to-card hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500">
                            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-start gap-3 md:gap-4">
                              <div className="flex h-11 w-11 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-purple-600/20 to-indigo-600/10 group-hover:scale-110 transition-transform duration-500">
                                <feature.icon className="h-4.5 w-4.5 md:h-5 md:w-5 text-purple-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[15px] md:text-base text-foreground mb-1.5 md:mb-2 tracking-tight">{feature.title}</div>
                                <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 md:mt-8 p-5 md:p-6 rounded-[20px] bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-600/5 border border-purple-500/20">
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
                          <span className="font-medium">Refunds, updates, workflows, tickets • Multi-level approval workflows • Complete audit trail & governance</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Engine Content */}
                  {selectedInfrastructure === 'engine' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                      <div className="flex items-start gap-3 md:gap-4 lg:gap-5 mb-6 md:mb-8 lg:mb-10">
                        <div className="flex h-16 w-16 md:h-18 lg:h-20 md:w-18 lg:w-20 flex-shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-indigo-600 to-primary shadow-2xl">
                          <Brain className="h-8 w-8 md:h-9 lg:h-10 md:w-9 lg:w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2 md:mb-3 tracking-tight">AI Engine</h3>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">The intelligent core that understands context, learns from interactions, and gets smarter over time.</p>
                        </div>
                      </div>

                      <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                        {[
                          { icon: MessageSquare, title: 'Contextual Memory', desc: 'Remembers conversation history, user preferences, and past interactions for personalized responses.' },
                          { icon: Brain, title: 'Advanced Reasoning', desc: 'Multi-step problem solving, clarifying questions, and complex query understanding with chain-of-thought.' },
                          { icon: TrendingUp, title: 'Continuous Learning', desc: 'Learns from corrections, feedback, and human oversight to improve accuracy without retraining.' },
                          { icon: Shield, title: 'Enterprise-Grade AI', desc: 'Data isolation, complete audit logs, and role-based access control. SOC 2 Type II controls in progress.' }
                        ].map((feature, i) => (
                          <div key={i} className="group relative p-5 md:p-5.5 lg:p-6 rounded-[20px] border border-border/40 bg-gradient-to-br from-card via-background/50 to-card hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-start gap-3 md:gap-4">
                              <div className="flex h-11 w-11 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-600/20 to-primary/10 group-hover:scale-110 transition-transform duration-500">
                                <feature.icon className="h-4.5 w-4.5 md:h-5 md:w-5 text-indigo-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[15px] md:text-base text-foreground mb-1.5 md:mb-2 tracking-tight">{feature.title}</div>
                                <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <Link href="/product/ai-engine">
                          <RouteButton
                            href="/product/ai-engine"
                            variant="default"
                            size="lg"
                            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-primary hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              Explore AI Engine in Detail
                              <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </span>
                          </RouteButton>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
