import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import ResultCard from "@/components/ResultCard";
import Image from "next/image";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import {
  Mail,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Zap,
  FileText,
  Lightbulb,
  MessageCircle,
  AtSign,
  Users,
  Keyboard,
  Bell,
  Search,
  TrendingUp,
  Bot,
  Play,
} from "lucide-react";
import inboxScreenshot from "@/assets/Platform-inbox-view.webp";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import ProductInboxChannelsHeroBackground from "@/components/product-inbox-channels/ProductInboxChannelsHeroBackground";
import RoutingMethodsSelector from "@/components/product-inbox-channels/RoutingMethodsSelector";
import FadeInUpObserver from "@/components/product-workflows/FadeInUpObserver";
import ProductInboxChannelsStyles from "@/components/product-inbox-channels/ProductInboxChannelsStyles";

const ProductInboxChannels = () => {
  const channels = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      headline: 'Multi-account email management',
      description: 'Connect unlimited email accounts and manage all messages in one intelligent workspace.',
      features: [
        { label: 'Multi-account support', detail: 'Gmail, Outlook, custom domains' },
        { label: 'Threaded conversations', detail: 'Full context in every reply' },
        { label: 'Rich formatting', detail: 'HTML editor with templates' },
        { label: 'Smart forwarding', detail: 'Auto-route to inbox by rules' },
      ],
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
      stats: { value: '< 2s', label: 'Avg sync time' },
    },
    {
      id: 'chat',
      icon: MessageSquare,
      title: 'Live Chat',
      headline: 'Real-time customer engagement',
      description: 'Embeddable chat widget with instant messaging, typing indicators, and offline message capture.',
      features: [
        { label: 'Website widget', detail: 'Embed in 5 minutes' },
        { label: 'Real-time messaging', detail: 'Sub-100ms latency' },
        { label: 'File sharing', detail: 'Images, docs, screenshots' },
        { label: 'Offline messages', detail: 'Capture leads 24/7' },
      ],
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 via-emerald-500/5 to-transparent',
      stats: { value: '< 100ms', label: 'Message latency' },
    },
  ];

  const aiFeatures = [
    {
      icon: FileText,
      title: 'AI Summaries',
      description: 'Instant conversation context at a glance',
      capabilities: [
        'Auto-generate summaries of long ticket threads',
        'Extract key points and action items',
        'Sentiment analysis (positive/neutral/negative)',
        'Customer intent detection for routing',
      ],
      color: 'from-amber-500 to-orange-500',
      demo: 'Summarize → AI extracts: Issue, sentiment, next steps',
    },
    {
      icon: Lightbulb,
      title: 'Smart Suggestions',
      description: 'AI recommends the best next action',
      capabilities: [
        'Knowledge base article suggestions',
        'Canned response recommendations',
        'Suggested tags based on content',
        'Escalation triggers for complex issues',
      ],
      color: 'from-cyan-500 to-teal-500',
      demo: 'Type "refund" → AI suggests refund policy article + template',
    },
  ];

  const productivityFeatures = [
    {
      icon: MessageCircle,
      title: 'Canned Responses',
      description: 'Library of pre-written replies with shortcuts and variables',
      benefit: '5x faster replies',
    },
    {
      icon: AtSign,
      title: 'Internal Notes',
      description: 'Team collaboration with @mentions and private comments',
      benefit: 'Seamless handoffs',
    },
    {
      icon: Users,
      title: 'Collision Detection',
      description: 'See who is viewing or replying in real-time',
      benefit: 'Zero duplicate work',
    },
    {
      icon: Keyboard,
      title: 'Keyboard Shortcuts',
      description: 'Quick actions for power users (assign, close, tag)',
      benefit: '40% faster workflows',
    },
    {
      icon: Bell,
      title: 'Status Management',
      description: 'Online/away/busy indicators with auto-away',
      benefit: 'Accurate routing',
    },
    {
      icon: Search,
      title: 'Search & Filters',
      description: 'Advanced ticket search with saved views',
      benefit: 'Find anything instantly',
    },
  ];

  const results = [
    {
      value: '73%',
      label: 'Faster responses',
      description: 'With AI rewriting and canned responses',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      visualizationType: 'comparison' as const,
      animatedValue: 73,
      contextData: {
        subtitle: 'Average response time reduction',
        comparison: {
          before: { label: 'Manual', value: '60min' },
          after: { label: 'With AI', value: '16min' },
        },
        progressValue: 73,
      },
    },
    {
      value: '80%',
      label: 'Automation rate',
      description: 'Tickets handled without human touch',
      icon: Bot,
      color: 'from-purple-500 to-pink-500',
      visualizationType: 'stacked' as const,
      animatedValue: 80,
      contextData: {
        subtitle: '2.4M tickets per year',
        stackedData: {
          primary: 80,
          secondary: 20,
          primaryLabel: 'Automated',
          secondaryLabel: 'Manual',
        },
        badge: {
          text: 'Savings: $2.1M annually',
          color: 'bg-green-500/10 text-green-500 border border-green-500/20',
        },
      },
    },
    {
      value: '4.8',
      label: 'CSAT score',
      description: 'Average customer satisfaction rating',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      visualizationType: 'stars' as const,
      animatedValue: 4.8,
      contextData: {
        subtitle: 'From 12,847 responses',
        trend: {
          value: '0.3',
          direction: 'up' as const,
          label: 'vs last quarter',
        },
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <SoftwareApplicationSchema
        name="Unified Inbox & Channels"
        description="Centralize all customer conversations from email, chat, and webhooks into one intelligent workspace with smart routing and collaboration tools."
      />
      <ProductInboxChannelsStyles />
      <FadeInUpObserver />

      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />

        <ProductInboxChannelsHeroBackground />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Content - CENTERED */}
            <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-4 md:space-y-6 lg:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Every conversation,
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent mt-2">
                  one workspace
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Email and live chat unified in a single intelligent inbox. AI-powered rewriting, smart routing, and collaboration tools that keep your team moving fast.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <RouteButton size="lg" href="/contact-sales" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-6 shadow-xl shadow-primary/20 group">
                  See it live
                  <Play className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
                <RouteButton size="lg" variant="outline" href="/pricing" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-6">
                  View pricing
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </RouteButton>
              </div>
            </div>

            {/* Hero Screenshot - BELOW TEXT */}
            <div className="relative max-w-6xl mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

              {/* Main card */}
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 md:p-2.5 lg:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                  <Image
                    src={inboxScreenshot}
                    alt="Pullse Unified Inbox"
                    className="w-full"
                    sizes="(min-width: 1280px) 70vw, (min-width: 768px) 90vw, 100vw"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Supported Channels */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6 fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Two channels, infinite possibilities
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Email and live chat, unified in one workspace
              </p>
            </div>

            {/* Channel Cards */}
            <div className="space-y-12 md:space-y-16 lg:space-y-24">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                const isEven = index % 2 === 0;

                return (
                  <div key={channel.id} className="relative fade-in-up" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}>
                      {/* Content */}
                      <div className={`space-y-5 md:space-y-6 lg:space-y-8 ${!isEven ? 'lg:direction-ltr' : ''}`}>
                        <div className="space-y-3 md:space-y-4">
                          <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${channel.color} shadow-lg`}>
                            <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-background" />
                          </div>
                          <div>
                            <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-2">
                              {channel.title}
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
                              {channel.headline}
                            </h3>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              {channel.description}
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 md:space-y-4">
                          {channel.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-start gap-3 md:gap-4">
                              <div className="flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5 md:mt-1">
                                <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm md:text-base font-bold text-foreground">{feature.label}</div>
                                <div className="text-xs md:text-sm text-muted-foreground">{feature.detail}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Visual */}
                      <div className={`relative ${!isEven ? 'lg:direction-ltr' : ''}`}>
                        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/80 shadow-2xl">
                          <div className={`absolute inset-0 bg-gradient-to-br ${channel.bgGradient}`} />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

                          <div className="relative p-8 md:p-10 lg:p-12 xl:p-16">
                            <div className="space-y-6 md:space-y-8">
                              {/* Large Icon */}
                              <div className="flex items-center justify-center">
                                <div className={`flex h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 items-center justify-center rounded-3xl bg-gradient-to-br ${channel.color} shadow-2xl`}>
                                  <Icon className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-background" />
                                </div>
                              </div>

                              {/* Stat */}
                              <div className="text-center space-y-2">
                                <div className={`text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r ${channel.color} bg-clip-text text-transparent`}>
                                  {channel.stats.value}
                                </div>
                                <div className="text-base md:text-lg text-foreground/80">
                                  {channel.stats.label}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6 fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI that makes agents superhuman
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Built-in tools that rewrite, summarize, and suggest
              </p>
            </div>

            {/* AI Feature Cards */}
            <div className="grid lg:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 fade-in-up"
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`} />

                    <div className="relative p-5 md:p-6 lg:p-8 space-y-4 md:space-y-5 lg:space-y-6">
                      <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-all group-hover:scale-110`}>
                        <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-background" />
                      </div>

                      <div className="space-y-2 md:space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">{feature.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                      </div>

                      <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-border/40">
                        {feature.capabilities.map((capability, cIndex) => (
                          <div key={cIndex} className="flex items-start gap-2 md:gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 md:mt-2 shrink-0" />
                            <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                              {capability}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 md:pt-4">
                        <div className="rounded-xl bg-muted/30 p-3 md:p-4 border border-border/30">
                          <p className="text-[10px] md:text-xs font-mono text-muted-foreground">
                            {feature.demo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Routing Mechanisms */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6 fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Three ways to route conversations
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the assignment method that fits your team
              </p>
            </div>

            {/* Routing Cards */}
            <RoutingMethodsSelector />
          </div>
        </div>
      </section>

      {/* Productivity Features */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6 fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Built for speed and collaboration
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything your team needs to work faster together
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
              {productivityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 md:p-6 lg:p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative space-y-3 md:space-y-4">
                      <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/15">
                        <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                      </div>

                      <div className="space-y-1.5 md:space-y-2">
                        <h3 className="text-base md:text-lg font-bold text-foreground">{feature.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      <div className="pt-1 md:pt-2">
                        <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-lg bg-primary/10 px-2.5 py-1.5 md:px-3 border border-primary/20">
                          <Zap className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                          <span className="text-[10px] md:text-xs font-bold text-primary">{feature.benefit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Real impact, measurable results
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Target outcomes for your team
              </p>
            </div>

            {/* Result Cards */}
            <div className="grid md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
              {results.map((result, index) => (
                <ResultCard
                  key={index}
                  icon={result.icon}
                  value={result.value}
                  label={result.label}
                  description={result.description}
                  color={result.color}
                  visualizationType={result.visualizationType}
                  animatedValue={result.animatedValue}
                  contextData={result.contextData}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                <div className="text-center space-y-6 md:space-y-8 lg:space-y-10">
                  <div className="space-y-4 md:space-y-5 lg:space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      See the inbox in action
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                      Book a demo with our team. We'll show you how Pullse unifies your channels and supercharges your agents.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <RouteButton size="lg" className="text-sm md:text-base px-8 py-5 md:px-10 md:py-7 shadow-xl shadow-primary/20" href="/contact-sales">
                      Book a demo
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-sm md:text-base px-8 py-5 md:px-10 md:py-7" href="/pricing">
                      View pricing
                    </RouteButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-3 md:gap-y-4 pt-6 md:pt-8 border-t border-border/40">
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                      <span>2-4 week implementation</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                      <span>Founder-led onboarding</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                      <span>No credit card required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductInboxChannels;
