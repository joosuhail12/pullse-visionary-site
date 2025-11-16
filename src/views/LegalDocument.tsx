// Server Component - no 'use client' directive
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import LegalDocumentContent from '@/components/legal/LegalDocumentContent';
import type { LegalDocument as LegalDocumentType } from '@/data/legalData';

interface LegalDocumentProps {
  document: LegalDocumentType;
}

export default function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <LegalDocumentContent document={document} />

      <Footer />
    </div>
  );
}
