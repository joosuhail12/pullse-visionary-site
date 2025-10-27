'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  Zap,
  TrendingDown,
  Users,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { competitors, comparisonFeatures, faqs, migrationFeatures, stats } from '@/data/comparisonData';
import ComparisonTable from '@/components/compare/ComparisonTable';

const Compare = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');

  const currentCompetitor = competitors.find((c) => c.id === selectedCompetitor);

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                Platform Comparison
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Why Teams Choose{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Pullse
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The all-in-one AI-powered customer support platform that outperforms
              legacy tools at a fraction of the cost
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`glass-strong p-6 rounded-2xl ${
                    stat.highlight
                      ? 'ring-2 ring-purple-500/50'
                      : ''
                  }`}
                >
                  <div
                    className={`text-3xl md:text-4xl font-bold mb-2 ${
                      stat.highlight
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                        : ''
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact-sales">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#comparison-table">
                  See Full Comparison
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Competitor Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="glass-strong p-8 rounded-3xl">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Compare Pullse with:
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {competitors.map((competitor) => (
                  <button
                    key={competitor.id}
                    onClick={() => setSelectedCompetitor(competitor.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCompetitor === competitor.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white/50 hover:bg-white/80 text-gray-700'
                    }`}
                  >
                    {competitor.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Detailed Competitor Comparison Card */}
          {currentCompetitor && (
            <motion.div
              key={selectedCompetitor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto mb-20"
            >
              <div className="glass-strong p-10 rounded-3xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Pullse vs {currentCompetitor.name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {currentCompetitor.tagline}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Pullse Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                      <h3 className="text-xl font-bold">Pullse</h3>
                    </div>
                    {currentCompetitor.whySwitch.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{reason}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Competitor Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      <h3 className="text-xl font-bold">{currentCompetitor.name}</h3>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Pricing Note:</strong>
                      </p>
                      <p className="text-sm text-gray-700">
                        {currentCompetitor.pricingNote}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 text-center">
                  <Button size="lg" asChild>
                    <Link href="/contact-sales">
                      Switch to Pullse
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Comparison Table */}
          <div id="comparison-table" className="max-w-7xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Feature Comparison</h2>
              <p className="text-lg text-muted-foreground">
                See how Pullse stacks up across all key features
              </p>
            </div>
            <div className="glass-strong p-8 rounded-3xl">
              <ComparisonTable />
            </div>
          </div>

          {/* Category Deep Dives - Will add sections */}

          {/* Migration Support Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Switch in Days, Not Months
              </h2>
              <p className="text-lg text-muted-foreground">
                We make migration painless with dedicated support every step of the way
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {migrationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong p-6 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about switching to Pullse
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-strong p-6 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-strong p-12 rounded-3xl text-center relative overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to See Pullse in Action?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join hundreds of teams who've already made the switch
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact-sales">
                      Book a Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Compare;
