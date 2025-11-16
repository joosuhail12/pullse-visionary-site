/**
 * WebSite Schema - JSON-LD Structured Data
 *
 * Provides structured data about the Pullse website for search engines.
 * Helps with:
 * - Sitelinks search box in Google
 * - Site name in search results
 * - Better understanding of website structure
 *
 * @see https://schema.org/WebSite
 */

import type { WebSite, WithContext } from 'schema-dts';

export const WebSiteSchema = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pullse.ai';

  const schema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pullse',
    url: siteUrl,
    description:
      'AI-Powered Customer Support Platform - Unify all customer conversations across email, chat, and API events. Automate with AI chatbots, copilots, and autonomous agents. Deliver exceptional support experiences at scale with intelligent workflows, analytics, and self-service knowledge bases.',

    // Publisher information
    publisher: {
      '@type': 'Organization',
      name: 'Pullse',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },

    // Search action (for sitelinks search box)
    // Note: Requires implementing site search to be fully functional
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    } as any,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default WebSiteSchema;
