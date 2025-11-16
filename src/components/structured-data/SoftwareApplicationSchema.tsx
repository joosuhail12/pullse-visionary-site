/**
 * SoftwareApplication Schema - JSON-LD Structured Data
 *
 * Provides structured data about Pullse's software products for search engines.
 * Helps with:
 * - Software discovery in search results
 * - Rich snippets with pricing and features
 * - Better categorization in app searches
 *
 * @see https://schema.org/SoftwareApplication
 */

import type { SoftwareApplication, WithContext } from 'schema-dts';

interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export const SoftwareApplicationSchema = ({
  name,
  description,
  applicationCategory = 'BusinessApplication',
  operatingSystem = 'Web Browser, iOS, Android',
  offers,
}: SoftwareApplicationSchemaProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pullse.ai';

  const schema: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,

    // Publisher information
    publisher: {
      '@type': 'Organization',
      name: 'Pullse',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },

    // Pricing offer (if provided)
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        url: `${siteUrl}/pricing`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SoftwareApplicationSchema;
