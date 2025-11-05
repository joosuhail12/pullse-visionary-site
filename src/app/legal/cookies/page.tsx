import type { Metadata } from 'next';
import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';

export const metadata: Metadata = {
  title: 'Cookie Policy | Pullse',
  description: 'How Pullse uses cookies and similar tracking technologies on our platform.',
};

export default function CookiesPage() {
  const document = getLegalDocument('cookies');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
