'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Scale, Shield, Cookie, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getAllLegalDocuments } from '@/data/legalData';
import { format } from 'date-fns';

const iconMap = {
  scale: Scale,
  shield: Shield,
  cookie: Cookie,
  'check-circle': CheckCircle,
};

export default function Legal() {
  const documents = getAllLegalDocuments();

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.4} />
      <Navigation />

      <div className="relative pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Scale className="h-4 w-4" />
              Legal Documents
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-6">
              Terms & Policies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read our terms of service, privacy policy, and other legal documents to understand how we protect and serve you.
            </p>
          </motion.div>

          {/* Legal Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {documents.map((doc, index) => {
              const Icon = iconMap[doc.icon];
              const lastUpdated = format(new Date(doc.lastUpdated), 'MMM d, yyyy');

              return (
                <motion.div
                  key={doc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/legal/${doc.slug}`}>
                    <div className="group relative h-full glass-elevated rounded-3xl p-8 border-2 border-gray-200 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
                      {/* Gradient background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-7 w-7" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                          {doc.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {doc.description}
                        </p>

                        {/* Last Updated Badge */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4" />
                          <span>Updated {lastUpdated}</span>
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          Read document
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="glass-elevated rounded-3xl p-8 md:p-12 border border-gray-200 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Have questions about our policies?
              </h2>
              <p className="text-gray-600 mb-6">
                Our team is here to help. Reach out to us with any questions or concerns about our legal documents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@pullse.ai"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact Legal Team
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact-sales"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
