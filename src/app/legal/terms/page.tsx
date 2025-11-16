import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Terms of Service | Pullse',
  description: 'User agreement and terms of use for Pullse AI-powered customer support platform.',
  path: '/legal/terms',
  keywords: 'terms of service, user agreement, terms and conditions, legal terms',
});

export default function TermsPage() {
  const document = getLegalDocument('terms');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
