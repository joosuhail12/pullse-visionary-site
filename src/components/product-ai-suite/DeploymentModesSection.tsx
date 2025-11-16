'use client';

import { useState } from "react";
import { Bot, Sparkles, CheckCircle2, Target } from "lucide-react";

export default function DeploymentModesSection() {
  const [activeDeploymentTab, setActiveDeploymentTab] = useState<'chatbot' | 'copilot'>('chatbot');

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6">
            Same engine,{" "}
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              different reach
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 lg:mb-12">
            Deploy AI that talks to customers or assists agents—or both.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-2xl bg-card border border-border/50 shadow-xl">
            <button
              onClick={() => setActiveDeploymentTab('chatbot')}
              className={`relative px-6 py-3 md:px-7 md:py-3.5 lg:px-8 lg:py-4 rounded-xl font-bold transition-all duration-300 ${
                activeDeploymentTab === 'chatbot'
                  ? 'bg-gradient-to-r from-primary to-purple-600 text-background shadow-lg scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Bot className="h-4 w-4 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 inline-block mr-2" />
              AI Chatbots
            </button>
            <button
              onClick={() => setActiveDeploymentTab('copilot')}
              className={`relative px-6 py-3 md:px-7 md:py-3.5 lg:px-8 lg:py-4 rounded-xl font-bold transition-all duration-300 ${
                activeDeploymentTab === 'copilot'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-background shadow-lg scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Sparkles className="h-4 w-4 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 inline-block mr-2" />
              AI Copilots
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="max-w-5xl mx-auto">
          {activeDeploymentTab === 'chatbot' ? (
            <div className="relative p-8 md:p-10 lg:p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute -top-6 left-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background font-bold shadow-xl">
                  <Bot className="h-5 w-5" />
                  Customer-Facing AI
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-8 mt-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Autonomous Resolution
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                    Answer questions AND execute lightweight actions autonomously. Process refunds, lookups, updates—24/7 across every channel. Resolve with actions, not just deflect with answers.
                  </p>

                  <div className="space-y-4">
                    {[
                      { label: '24/7 Availability', detail: 'Never closes, never sleeps' },
                      { label: 'Multi-Channel', detail: 'Web, Slack, Email, Teams, API webhooks' },
                      { label: 'Smart Handoff', detail: 'Seamless escalation with full context' },
                      { label: 'Action Execution', detail: 'Refunds, updates, data lookups' }
                    ].map((feature, i) => (
                      <div key={i} className="group/feature flex items-start gap-4 p-3 md:p-3.5 lg:p-4 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                        <div className="flex h-7 w-7 md:h-7.5 lg:h-8 md:w-7.5 lg:w-8 items-center justify-center rounded-lg bg-primary/20">
                          <CheckCircle2 className="h-4 w-4 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{feature.label}</div>
                          <div className="text-sm text-muted-foreground">{feature.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                    <div className="text-5xl md:text-6xl font-black text-primary mb-2">87%</div>
                    <div className="text-lg font-bold text-foreground mb-1">Average Deflection Rate</div>
                    <div className="text-sm text-muted-foreground">Across all industries and use cases</div>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border/50">
                    <div className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Best For
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>• High-volume repetitive questions</div>
                      <div>• After-hours support coverage</div>
                      <div>• Order tracking & account inquiries</div>
                      <div>• Self-service automation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative p-8 md:p-10 lg:p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute -top-6 left-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-background font-bold shadow-xl">
                  <Sparkles className="h-5 w-5" />
                  Agent-Facing AI
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-8 mt-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Action Execution Engine
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                    Execute actions across your entire stack from one interface. No tool switching, no copy-paste. Agents trigger actions; Copilot executes with proper controls.
                  </p>

                  <div className="space-y-4">
                    {[
                      { label: 'Stack-Wide Actions', detail: 'Refunds, updates, cancellations across all systems' },
                      { label: 'Knowledge Retrieval', detail: 'Instant access to all documentation' },
                      { label: 'Response Drafting', detail: 'AI-written answers in your brand voice' },
                      { label: 'Agent-Triggered', detail: 'Full control with audit trails' }
                    ].map((feature, i) => (
                      <div key={i} className="group/feature flex items-start gap-4 p-3 md:p-3.5 lg:p-4 rounded-xl bg-background/50 border border-purple-500/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300">
                        <div className="flex h-7 w-7 md:h-7.5 lg:h-8 md:w-7.5 lg:w-8 items-center justify-center rounded-lg bg-purple-500/20">
                          <CheckCircle2 className="h-4 w-4 md:h-4.5 lg:h-5 md:w-4.5 lg:w-5 text-purple-500" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{feature.label}</div>
                          <div className="text-sm text-muted-foreground">{feature.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                    <div className="text-5xl md:text-6xl font-black text-purple-500 mb-2">50%</div>
                    <div className="text-lg font-bold text-foreground mb-1">Faster Ramp Time</div>
                    <div className="text-sm text-muted-foreground">New agents productive in days, not weeks</div>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border/50">
                    <div className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-500" />
                      Best For
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>• Complex technical support</div>
                      <div>• New hire onboarding</div>
                      <div>• Compliance & regulations</div>
                      <div>• High-volume peak periods</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
