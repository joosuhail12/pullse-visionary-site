import type { Metadata } from 'next';
import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';

export const metadata: Metadata = {
  title: 'Terms of Service | Pullse',
  description: 'User agreement and terms of use for Pullse AI-powered customer support platform.',
};

export default function TermsPage() {
  const document = getLegalDocument('terms');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
