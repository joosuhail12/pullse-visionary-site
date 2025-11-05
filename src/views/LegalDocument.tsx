'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { ChevronRight, Printer, ArrowLeft, Scale, Shield, Cookie, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { LegalDocument as LegalDocumentType } from '@/data/legalData';
import { format } from 'date-fns';

interface LegalDocumentProps {
  document: LegalDocumentType;
}

const iconMap = {
  scale: Scale,
  shield: Shield,
  cookie: Cookie,
  'check-circle': CheckCircle,
};

export default function LegalDocument({ document }: LegalDocumentProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.sections.map((s) => {
        const element = window.document.getElementById(s.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: s.id,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter((s): s is NonNullable<typeof s> => s !== null);

      // Find the section that's currently in view
      const current = sections.find((s) => s.top <= 150 && s.bottom > 150);
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [document.sections]);

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (sectionId: string) => {
    const element = window.document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const Icon = iconMap[document.icon];
  const lastUpdated = format(new Date(document.lastUpdated), 'MMMM d, yyyy');

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="relative pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/legal"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Legal
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                Last updated: {lastUpdated}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent mb-4">
              {document.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              {document.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Desktop Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24 glass-elevated rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Contents</h3>
                  <button
                    onClick={handlePrint}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors print:hidden"
                    title="Print document"
                  >
                    <Printer className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {document.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="glass-elevated rounded-3xl p-8 md:p-12 border border-gray-200">
                {/* Mobile TOC Dropdown */}
                <div className="lg:hidden mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Quick Navigation</h3>
                    <button
                      onClick={handlePrint}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors print:hidden"
                      title="Print document"
                    >
                      <Printer className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {document.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {section.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Document Sections */}
                <div className="legal-content max-w-none">
                  {document.sections.map((section, index) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className={index > 0 ? 'mt-12 pt-12 border-t border-gray-200' : ''}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                        {section.title}
                      </h2>
                      <div className="legal-text whitespace-pre-line">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    This document was last updated on {lastUpdated}. If you have any questions,
                    please contact us at{' '}
                    <a href="mailto:legal@pullse.ai" className="text-primary hover:underline">
                      legal@pullse.ai
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Legal Document Styles */}
      <style jsx global>{`
        .legal-content {
          font-size: 16px;
          line-height: 1.75;
        }

        .legal-text {
          font-size: 16px;
          line-height: 1.8;
          color: #374151;
          letter-spacing: 0.01em;
        }

        @media print {
          nav,
          footer,
          .print\\:hidden {
            display: none !important;
          }

          .glass-elevated {
            background: white !important;
            backdrop-filter: none !important;
            box-shadow: none !important;
          }

          .legal-content {
            max-width: 100% !important;
          }

          section {
            page-break-inside: avoid;
          }

          h2 {
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
}
