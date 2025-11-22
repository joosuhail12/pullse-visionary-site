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
import { Check, Zap, Smile, Users, Settings, ArrowRight } from 'lucide-react';
import { migrationFeatures, faqCategories } from '@/data/comparisonData';
import PricingComparisonSection from './PricingComparisonSection';
import ComparisonTable from './ComparisonTable';

export default function CompareContentSections() {
  const SectionDivider = () => (
    <div className="flex justify-center">
      <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
    </div>
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background opacity-70 pointer-events-none" />
      <div className="absolute inset-x-0 top-6 h-28 bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
      <div className="relative space-y-12 md:space-y-14 lg:space-y-16">

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        id="comparison-table"
        className="max-w-7xl mx-auto"
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
        <div className="glass-strong p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-lg">
          <ComparisonTable />
        </div>
      </motion.div>

      <SectionDivider />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto glass-strong p-5 md:p-7 lg:p-8 rounded-3xl shadow-lg"
      >
        <div className="text-center mb-6 md:mb-8">
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
      </motion.section>

      <SectionDivider />

      {/* Pricing Calculator Section */}
      <div className="max-w-6xl mx-auto">
        <PricingComparisonSection />
      </div>

      <SectionDivider />

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto glass-strong p-5 md:p-7 lg:p-8 rounded-3xl shadow-lg">
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
                    className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-xl md:rounded-2xl px-4 md:px-6 shadow-sm hover:shadow-md transition-shadow"
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
      </div>
    </div>
  );
}
