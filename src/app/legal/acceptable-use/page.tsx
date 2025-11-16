import LegalDocument from '@/views/LegalDocument';
import { getLegalDocument } from '@/data/legalData';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Acceptable Use Policy | Pullse',
  description: 'Rules and guidelines for using Pullse services responsibly and legally.',
  path: '/legal/acceptable-use',
  keywords: 'acceptable use policy, usage guidelines, service rules, prohibited activities',
});

export default function AcceptableUsePage() {
  const document = getLegalDocument('acceptable-use');

  if (!document) {
    return <div>Document not found</div>;
  }

  return <LegalDocument document={document} />;
}
