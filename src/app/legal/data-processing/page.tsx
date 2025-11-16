import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Data Processing Agreement (DPA) | Pullse',
  description: 'Terms governing the processing of personal data under GDPR and other data protection laws.',
  path: '/legal/data-processing',
  keywords: 'dpa, data processing agreement, gdpr, data protection, personal data processing',
});

export default function DataProcessingPage() {
  const document = getLegalDocument('data-processing');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
