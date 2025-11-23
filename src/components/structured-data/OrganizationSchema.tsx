/**
 * Organization Schema - JSON-LD Structured Data
 *
 * Provides structured data about Pullse as an organization for search engines.
 * This schema appears globally across all pages and helps with:
 * - Brand knowledge panels in Google
 * - Rich search results
 * - Social media link discovery
 *
 * @see https://schema.org/Organization
 */

import type { Organization, WithContext } from 'schema-dts';

export const OrganizationSchema = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pullse.ai';

  const schema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pullse',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'AI-Powered Customer Support Platform - Unify all customer conversations, automate with AI, and deliver exceptional support experiences at scale.',
    foundingDate: '2024-11',

    // Founders
    founder: [
      {
        '@type': 'Person',
        name: 'Suhail Joo',
        jobTitle: 'Founder & CEO',
        description:
          'Visionary leader driving AI innovation in customer support. Former experience at top tech companies, passionate about transforming support experiences.',
      },
      {
        '@type': 'Person',
        name: 'Manminder Tomar',
        jobTitle: 'Co-founder & CTO',
        description:
          'Technical architect behind Pullse AI engine. Expertise in machine learning, distributed systems, and building scalable platforms.',
        sameAs: 'https://linkedin.com/in/manminder-tomar',
      },
    ],

    // Social media (placeholders - can be updated when actual URLs available)
    sameAs: [
      'https://twitter.com/pullse',
      'https://linkedin.com/company/pullse',
    ],

    // Contact information
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${siteUrl}/contact-sales`,
    },
  };

  return (
    <script
      key="organization-schema"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationSchema;
