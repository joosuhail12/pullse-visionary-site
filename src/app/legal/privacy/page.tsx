import type { Metadata } from 'next';
import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pullse',
  description: 'How Pullse collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  const document = getLegalDocument('privacy');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
