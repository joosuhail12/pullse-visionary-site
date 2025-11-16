/**
 * FAQPage Schema - JSON-LD Structured Data
 *
 * Provides structured FAQ data for search engines.
 * Enables FAQ rich results in Google search, which can dramatically improve CTR.
 *
 * Benefits:
 * - FAQ accordion in search results
 * - Answer Box eligibility
 * - Voice search optimization
 * - Higher visibility in SERPs
 *
 * @see https://schema.org/FAQPage
 */

import type { FAQPage, WithContext } from 'schema-dts';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQ[];
}

export const FAQPageSchema = ({ faqs }: FAQPageSchemaProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pullse.ai';

  const schema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FAQPageSchema;
