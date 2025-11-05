import type { Metadata } from 'next';
import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';

export const metadata: Metadata = {
  title: 'Data Processing Agreement (DPA) | Pullse',
  description: 'Terms governing the processing of personal data under GDPR and other data protection laws.',
};

export default function DataProcessingPage() {
  const document = getLegalDocument('data-processing');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
