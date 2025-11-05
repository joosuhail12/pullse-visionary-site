import type { Metadata } from 'next';
import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | Pullse',
  description: 'Rules and guidelines for using Pullse services responsibly and legally.',
};

export default function AcceptableUsePage() {
  const document = getLegalDocument('acceptable-use');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
