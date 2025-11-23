// Server Component - no 'use client' directive
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import LegalDocumentCard from '@/components/LegalDocumentCard';
import { getAllLegalDocuments } from '@/data/legalData';

export default function Legal() {
  const documents = getAllLegalDocuments();

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <main id="main-content" role="main">
      <div className="relative pt-18 md:pt-22 pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          {/* Header - Server-rendered, no animation on server */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
              Terms & Policies
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Read our terms of service, privacy policy, and other legal documents to understand how we protect and serve you.
            </p>
          </div>

          {/* Legal Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {documents.map((doc, index) => {
              return (
                <LegalDocumentCard
                  key={doc.slug}
                  doc={doc}
                  iconKey={doc.icon}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
}
