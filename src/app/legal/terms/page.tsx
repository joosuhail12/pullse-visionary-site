import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';
import { generatePageMetadata } from '@/lib/metadata';

// Edge runtime for global performance
export const runtime = 'edge';
// Revalidate weekly - legal documents change very infrequently
export const revalidate = 604800;


export const metadata = generatePageMetadata({
  title: 'Terms of Service | Pullse',
  description: 'User agreement and terms of use for Pullse AI-powered customer support platform.',
  path: '/legal/terms',
  keywords: [
    'terms of service',
    'user agreement',
    'terms and conditions',
    'platform terms',
    'legal terms',
  ],
});

export default function TermsPage() {
  const document = getLegalDocument('terms');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
