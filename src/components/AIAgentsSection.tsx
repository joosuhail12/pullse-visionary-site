import { useState, useEffect } from 'react';
import { Bot, User, Zap, Database, Code, CheckCircle, MessageSquare, Sparkles } from 'lucide-react';

export const AIAgentsSection = () => {
  const [activeTab, setActiveTab] = useState<'bots' | 'copilots'>('bots');
  const [animateApi, setAnimateApi] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateApi(true);
      setTimeout(() => setAnimateApi(false), 2000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const apiActions = [
    { icon: Code, label: 'Update Shipping', color: 'text-blue-400' },
    { icon: Zap, label: 'Change Plan', color: 'text-purple-400' },
    { icon: CheckCircle, label: 'Reset Password', color: 'text-green-400' },
  ];

  const copilotFeatures = [
    { icon: MessageSquare, label: 'Summarize Conversations', desc: 'Instant context' },
    { icon: Sparkles, label: 'Draft Replies', desc: 'AI-powered responses' },
    { icon: Zap, label: 'API Actions', desc: 'On-demand automation' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Beyond Traditional Chatbots</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            AI Agents & Copilots
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Self-service bots that execute actions and intelligent copilots that augment your team
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-muted p-1 gap-1">
            <button
              onClick={() => setActiveTab('bots')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'bots'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bot className="w-4 h-4 inline-block mr-2" />
              Self-Service Bots
            </button>
            <button
              onClick={() => setActiveTab('copilots')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'copilots'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-4 h-4 inline-block mr-2" />
              Agent Copilots
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'bots' ? (
            <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
              {/* Left: Description */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Connect to Any API</h3>
                <p className="text-muted-foreground text-lg">
                  Unlike competitors that rely on third-party integrations, Pullse bots directly connect to your entire stack.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Knowledge Base Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Pull from your docs, FAQs, and resources in real-time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Universal API Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Execute actions across your systems without middleware
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Instant Task Completion</h4>
                      <p className="text-sm text-muted-foreground">
                        Handle complex workflows end-to-end autonomously
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Visual Demo */}
              <div className="relative">
                <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                  {/* Bot conversation */}
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                        <p className="text-sm">Can you update my shipping address?</p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-primary rounded-lg px-4 py-2 max-w-[80%]">
                        <p className="text-sm text-primary-foreground">I'll help you update that right away.</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* API Actions */}
                  <div className="border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground mb-4 font-semibold">EXECUTING API CALLS</p>
                    <div className="space-y-3">
                      {apiActions.map((action, idx) => {
                        const Icon = action.icon;
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border transition-all duration-500 ${
                              animateApi ? 'scale-105 border-primary/50 bg-primary/5' : ''
                            }`}
                            style={{ transitionDelay: `${idx * 200}ms` }}
                          >
                            <Icon className={`w-4 h-4 ${action.color}`} />
                            <span className="text-sm font-medium flex-1">{action.label}</span>
                            <CheckCircle
                              className={`w-4 h-4 text-green-500 transition-opacity duration-300 ${
                                animateApi ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Any API ⚡
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
              {/* Left: Visual Demo */}
              <div className="relative order-2 md:order-1">
                <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                  {/* Agent view */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Martinez</h4>
                      <p className="text-xs text-muted-foreground">Support Agent</p>
                    </div>
                  </div>

                  {/* Copilot features */}
                  <div className="space-y-4">
                    {copilotFeatures.map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="group p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm mb-1">{feature.label}</h5>
                              <p className="text-xs text-muted-foreground">{feature.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* AI suggestion */}
                  <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-primary mb-1">AI SUGGESTION</p>
                        <p className="text-sm">Customer seems frustrated. Suggest offering expedited shipping as a gesture of goodwill.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Augments Agents 🚀
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6 order-1 md:order-2">
                <h3 className="text-3xl font-bold">Supercharge Your Team</h3>
                <p className="text-muted-foreground text-lg">
                  AI copilots work alongside agents, handling complexity so your team can focus on what matters.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Instant Context</h4>
                      <p className="text-sm text-muted-foreground">
                        Summarize long conversations in seconds, giving agents full context at a glance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Smart Response Drafts</h4>
                      <p className="text-sm text-muted-foreground">
                        AI-powered reply suggestions that agents can customize and send
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">On-Demand Actions</h4>
                      <p className="text-sm text-muted-foreground">
                        Execute API calls across your entire stack without leaving the conversation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison note */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border">
            <Code className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">
              While competitors like <span className="font-semibold text-foreground">UseResponse</span> rely on third-party integrations,
              <span className="font-semibold text-foreground"> Pullse connects directly to any API</span> for true flexibility
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
