// Server Component - no 'use client' directive
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import LegalDocumentCard from '@/components/LegalDocumentCard';
import { Scale, Shield, Cookie, CheckCircle } from 'lucide-react';
import { getAllLegalDocuments } from '@/data/legalData';

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
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="relative pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header - Server-rendered, no animation on server */}
          <div className="text-center mb-16">
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
          </div>

          {/* Legal Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {documents.map((doc, index) => {
              const Icon = iconMap[doc.icon];

              return (
                <LegalDocumentCard
                  key={doc.slug}
                  doc={doc}
                  Icon={Icon}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
