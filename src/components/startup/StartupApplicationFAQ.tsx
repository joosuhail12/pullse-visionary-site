'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: string;
  questions: FAQQuestion[];
}

interface StartupApplicationFAQProps {
  faqCategories: FAQCategory[];
}

const StartupApplicationFAQ = ({ faqCategories }: StartupApplicationFAQProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10 lg:mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1">
              Questions before you apply?
            </h2>
          </motion.div>

          {/* Category Accordion */}
          <div className="space-y-4 md:space-y-5 lg:space-y-6">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
                className="glass-strong rounded-2xl md:rounded-3xl border-2 border-primary/20 overflow-hidden shadow-lg"
              >
                {/* Category Header */}
                <button
                  onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                  className="w-full p-4 md:p-5 lg:p-6 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">{category.icon}</span>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">{category.category}</h3>
                    <span className="text-xs md:text-sm font-medium text-gray-500 bg-white px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-gray-200">
                      {category.questions.length} {category.questions.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 md:w-6 md:h-6 text-primary transition-transform duration-300 ${
                      openCategory === category.category ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Questions List */}
                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                      className="overflow-hidden border-t-2 border-primary/10"
                    >
                      <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6 bg-primary/5">
                        {category.questions.map((faq, faqIndex) => (
                          <div
                            key={faqIndex}
                            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-sm"
                          >
                            <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">
                              {faq.question}
                            </h4>
                            <div className="pl-3 md:pl-4 border-l-2 border-primary/30">
                              <p className="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* "Still have questions?" CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-10 lg:mt-12"
          >
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Still have questions?</p>
            <a
              href="#application-form"
              className="inline-flex items-center gap-2 text-sm md:text-base text-primary font-semibold hover:underline transition-all"
            >
              Apply now and ask us directly
              <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-[-90deg]" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StartupApplicationFAQ;
