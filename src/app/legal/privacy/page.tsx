import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';
import { generatePageMetadata } from '@/lib/metadata';

// Revalidate weekly - legal documents change very infrequently
export const revalidate = 604800;


export const metadata = generatePageMetadata({
  title: 'Privacy Policy | Pullse',
  description: 'How Pullse collects, uses, and protects your personal information.',
  path: '/legal/privacy',
  keywords: [
    'privacy policy',
    'data protection',
    'personal information',
    'gdpr compliance',
    'ccpa',
    'security and privacy',
  ],
});

export default function PrivacyPage() {
  const document = getLegalDocument('privacy');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
