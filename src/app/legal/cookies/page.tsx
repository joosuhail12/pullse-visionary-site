import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Cookie Policy | Pullse',
  description: 'How Pullse uses cookies and similar tracking technologies on our platform.',
  path: '/legal/cookies',
  keywords: 'cookie policy, cookies, tracking technologies, web tracking, analytics',
});

export default function CookiesPage() {
  const document = getLegalDocument('cookies');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
