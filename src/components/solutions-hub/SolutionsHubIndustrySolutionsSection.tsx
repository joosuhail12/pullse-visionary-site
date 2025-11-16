'use client';

import Link from "next/link";
import { Briefcase, ShoppingCart, Shield, ArrowRight, HelpCircle, TrendingUp } from "lucide-react";

const SolutionsHubIndustrySolutionsSection = () => {
  const industrySolutions = [
    {
      icon: Briefcase,
      title: "B2B SaaS",
      category: "Software & Technology",
      headline: "Convert more trials and reduce churn with technical support that scales",
      subheadline: "Support that understands your API, automates technical troubleshooting, and turns support into a growth engine",
      painPoints: [
        "Losing 40% of trials due to integration issues?",
        "Technical questions taking 2+ hours to resolve?",
        "Missing upsell opportunities in every conversation?",
      ],
      stat: { value: "28%", label: "churn reduction in first 90 days" },
      roi: "Save $180K annually per 10 agents",
      link: "/solutions/b2b-saas",
      gradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-600",
      bgColor: "bg-blue-500/10",
      ctaGradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      category: "Online Retail",
      headline: "Handle 10x Black Friday volume without hiring seasonal staff",
      subheadline: "Automate order tracking, returns, and exchanges while your team focuses on complex issues",
      painPoints: [
        "Drowning in 1,000+ daily 'Where's my order?' tickets?",
        "Returns taking 15+ minutes to process manually?",
        "Peak season forcing you to hire (and train) 50+ temps?",
      ],
      stat: { value: "62%", label: "fewer WISMO tickets automatically resolved" },
      roi: "Save $240K during holiday season vs. hiring temps",
      link: "/solutions/ecommerce",
      gradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-600",
      bgColor: "bg-green-500/10",
      ctaGradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Fintech",
      category: "Financial Services",
      headline: "Respond to financial risks instantly—fraud alerts, chargebacks, disputes",
      subheadline: "SOC 2 compliant support that orchestrates risk workflows, verifies KYC, and passes every audit automatically",
      painPoints: [
        "Risk alerts taking 2+ minutes to action = $100K+ annual losses?",
        "Failing SOC 2 audits due to inconsistent support?",
        "Payment failures driving 15%+ customer churn?",
      ],
      stat: { value: "<8s", label: "average risk response time" },
      roi: "Prevent $500K+ in losses with orchestrated risk workflows",
      link: "/solutions/fintech",
      gradient: "from-red-500/10 to-orange-500/10",
      borderColor: "border-red-500/20",
      textColor: "text-red-600",
      bgColor: "bg-red-500/10",
      ctaGradient: "from-red-500 to-orange-500",
    },
  ];

  return (
    <section id="solutions" className="relative py-14 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12 space-y-4 md:space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              Choose your industry to see exact ROI
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Each solution is pre-configured for your industry's workflows, challenges, and compliance requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {industrySolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border-2 ${solution.borderColor} bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-50`} />

                  <div className="relative p-4 md:p-5 lg:p-6 space-y-3 md:space-y-4 lg:space-y-5">
                    {/* Header */}
                    <div className="space-y-3 md:space-y-4">
                      <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 items-center justify-center rounded-xl md:rounded-2xl ${solution.bgColor} border-2 ${solution.borderColor} shadow-lg`}>
                        <Icon className={`h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 ${solution.textColor}`} />
                      </div>
                      <div>
                        <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${solution.textColor} mb-1.5 md:mb-2`}>
                          {solution.category}
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{solution.title}</h3>
                      </div>
                    </div>

                    {/* Headline & Subheadline */}
                    <div className="space-y-1.5 md:space-y-2 lg:space-y-3">
                      <p className="text-base md:text-lg lg:text-xl font-bold text-foreground leading-tight">
                        {solution.headline}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {solution.subheadline}
                      </p>
                    </div>

                    {/* Pain Points as Questions */}
                    <div className="space-y-1.5 md:space-y-2 lg:space-y-3">
                      {solution.painPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-2 md:gap-3">
                          <div className={`mt-0.5 md:mt-1 h-4 w-4 md:h-5 md:w-5 rounded-full ${solution.bgColor} border ${solution.borderColor} flex items-center justify-center shrink-0`}>
                            <HelpCircle className={`h-2.5 w-2.5 md:h-3 md:w-3 ${solution.textColor}`} />
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">{point}</p>
                        </div>
                      ))}
                    </div>

                    {/* Key Stat & ROI */}
                    <div className="space-y-2 md:space-y-3">
                      <div className={`p-3 md:p-4 lg:p-5 xl:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br ${solution.gradient} border-2 ${solution.borderColor}`}>
                        <div className={`text-3xl md:text-4xl lg:text-5xl font-black ${solution.textColor} mb-1.5 md:mb-2`}>
                          {solution.stat.value}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-foreground/80">{solution.stat.label}</div>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-primary/10 border border-primary/20">
                        <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0" />
                        <p className="text-xs md:text-sm font-semibold text-primary">{solution.roi}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={solution.link}
                      className={`block w-full py-2.5 px-4 md:py-3 md:px-5 lg:py-4 lg:px-6 rounded-lg md:rounded-xl bg-gradient-to-r ${solution.ctaGradient} text-background font-bold text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm md:text-base`}
                    >
                      <div className="flex items-center justify-center gap-1.5 md:gap-2">
                        <span>Explore {solution.title} Solution</span>
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHubIndustrySolutionsSection;
