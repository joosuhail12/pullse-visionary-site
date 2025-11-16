'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlowCard from '@/components/ui/glow-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Check,
  X,
  MessageSquare,
  Zap,
  Smile,
  Users,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { migrationFeatures, faqCategories } from '@/data/comparisonData';
import PricingComparisonSection from './PricingComparisonSection';
import ComparisonTable from './ComparisonTable';

export default function CompareContentSections() {
  return (
    <>
      {/* AI That Executes Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto mb-14 md:mb-16 lg:mb-20"
      >
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
          >
            AI That <motion.span
              className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >Executes</motion.span>, Not Just Answers
          </motion.h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Most support AI just deflects questions or suggests responses.
            Pullse's agentic AI actually completes tasks across your entire stack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative">
          {/* VS Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-gray-400/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-600 to-gray-600 flex items-center justify-center shadow-lg md:shadow-xl border-2 border-white">
                <span className="text-base md:text-lg font-black text-white">VS</span>
              </div>
            </div>
          </motion.div>

          {/* Pullse: Action-Taking */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <GlowCard
              className="glass-strong p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border-2 border-green-500/30 relative overflow-hidden h-full"
              glowColor="34, 197, 94"
              glowIntensity={0.6}
              hoverElevation={true}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-green-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              {/* Floating Badge */}
              <motion.div
                className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-green-600 text-white text-[10px] md:text-xs font-bold shadow-md md:shadow-lg"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓ Executes
              </motion.div>

              <div className="flex items-center gap-2.5 md:gap-3 mb-5 md:mb-6 relative z-10">
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-green-600">Pullse AI</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Executes actions autonomously</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 relative z-10">
                {[
                  { title: 'Process refunds across Stripe/PayPal', desc: 'AI executes the refund, not just tells you how' },
                  { title: 'Look up orders in Shopify/WooCommerce', desc: 'Real-time data pulled and displayed automatically' },
                  { title: 'Update customer records in Salesforce/HubSpot', desc: 'Copilot executes CRM updates with one click' },
                  { title: 'Cancel/modify subscriptions', desc: 'Direct integration with billing systems' },
                  { title: 'Custom actions with approval workflows', desc: 'Build any action, control with smart approvals' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex gap-2 md:gap-2.5 lg:gap-3 items-start p-2 md:p-2.5 lg:p-3 rounded-md md:rounded-lg hover:bg-green-50/50 transition-colors group"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <div>
                      <p className="text-sm md:text-base font-medium text-gray-900 group-hover:text-green-600 transition-colors">{item.title}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* Competitors: Answer-Only */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <GlowCard
              className="glass-strong p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border-2 border-gray-300 relative overflow-hidden h-full"
              glowColor="156, 163, 175"
              glowIntensity={0.3}
              hoverElevation={true}
            >
              {/* Floating Badge */}
              <motion.div
                className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-gray-400 text-white text-[10px] md:text-xs font-bold shadow-md md:shadow-lg"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✗ Answer Only
              </motion.div>

              <div className="flex items-center gap-2.5 md:gap-3 mb-5 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gray-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-700">Most Competitors</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Answer or suggest only</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {[
                  { title: 'Chatbot deflects to help articles', desc: 'Customer still needs agent for actual help' },
                  { title: 'Copilot suggests reply text', desc: 'Agent must manually execute actions in other systems' },
                  { title: 'Limited to answering questions', desc: "Can't process refunds, look up orders, or modify accounts" },
                  { title: 'No cross-system execution', desc: 'Agent switches between 5+ tools manually' },
                  { title: 'Basic workflows only', desc: "Can't build custom automated actions" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-2 md:gap-2.5 lg:gap-3 items-start p-2 md:p-2.5 lg:p-3 rounded-md md:rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-gray-700">{item.title}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        id="comparison-table"
        className="max-w-7xl mx-auto mb-14 md:mb-16 lg:mb-20"
      >
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
          >
            Feature Comparison
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            See how Pullse stacks up across all key features
          </motion.p>
        </div>
        <div className="glass-strong p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
          <ComparisonTable />
        </div>
      </motion.div>

      {/* Category Deep Dives - Will add sections */}

      {/* Ease of Use Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto mb-12 md:mb-14 lg:mb-16"
      >
        <div className="text-center mb-6 md:mb-7 lg:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            Simple Setup, Powerful Results
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with an intuitive platform anyone can use
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {migrationFeatures.map((feature, index) => {
            const iconMap = {
              zap: Zap,
              smile: Smile,
              users: Users,
              settings: Settings,
            };
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-strong p-4 md:p-5 rounded-xl md:rounded-2xl relative overflow-hidden group cursor-default"
              >
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start gap-3 md:gap-4 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md md:shadow-lg"
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-bold mb-1 md:mb-1.5 group-hover:text-green-600 transition-colors">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Pricing Calculator Section */}
      <PricingComparisonSection />

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto mb-14 md:mb-16 lg:mb-20">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Everything you need to know about switching to Pullse
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {faqCategories.map((categoryGroup, catIndex) => (
            <motion.div
              key={categoryGroup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="space-y-3 md:space-y-4"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span>{categoryGroup.icon}</span>
                {categoryGroup.category}
              </h3>

              {categoryGroup.questions.map((faq, index) => (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl md:rounded-2xl px-4 md:px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 md:py-5">
                      <span className="text-sm md:text-base font-semibold text-gray-900 pr-3 md:pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-xs md:text-sm leading-relaxed pb-4 md:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
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
        <GlowCard
          className="glass-strong p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl text-center relative overflow-hidden"
          glowColor="132, 0, 255"
          glowIntensity={0.7}
          hoverElevation={true}
        >
          {/* Animated Mesh Gradient Background */}
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-blue-500/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Ready to See Pullse in Action?
            </motion.h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-7 lg:mb-8">
              Built for teams ready to make the switch
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" asChild className="relative group h-11 md:h-12 px-5 md:px-6 text-sm md:text-base">
                  <Link href="/contact-sales">
                    <span className="relative z-10">Book a Demo</span>
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-100 blur-lg transition-opacity"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" asChild className="h-11 md:h-12 px-5 md:px-6 text-sm md:text-base">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Trust badges with Sequential Animation */}
            <div className="mt-6 md:mt-7 lg:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center text-xs md:text-sm text-muted-foreground">
              {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((text, index) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-1.5 md:gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500" />
                  </motion.div>
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </>
  );
}
