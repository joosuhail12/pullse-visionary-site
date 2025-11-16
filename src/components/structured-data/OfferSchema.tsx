/**
 * Offer Schema - JSON-LD Structured Data
 *
 * Provides structured pricing data for Pullse plans.
 * Helps with:
 * - Price display in search results
 * - Rich snippets for pricing pages
 * - Better understanding of product offerings
 *
 * @see https://schema.org/Offer
 */

import type { Product, WithContext } from 'schema-dts';
import { pricingTiers, startupProgram } from '@/data/pricingData';

export const OfferSchema = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pullse.ai';

  // Create a Product with all pricing offers
  const schema: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Pullse Customer Support Platform',
    description:
      'AI-powered customer support platform with omnichannel inbox, AI chatbots, workflows, and analytics.',
    brand: {
      '@type': 'Brand',
      name: 'Pullse',
    },
    logo: `${siteUrl}/logo.png`,

    // Multiple pricing offers
    offers: [
      // Standard Plan
      {
        '@type': 'Offer',
        name: pricingTiers[0].name,
        description: pricingTiers[0].tagline,
        price: pricingTiers[0].monthlyPricePerSeat.toString(),
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: pricingTiers[0].monthlyPricePerSeat.toString(),
          priceCurrency: 'USD',
          unitText: 'per seat per month',
        },
        url: `${siteUrl}/pricing`,
        availability: 'https://schema.org/InStock',
      },

      // Pro Plan
      {
        '@type': 'Offer',
        name: pricingTiers[1].name,
        description: pricingTiers[1].tagline,
        price: pricingTiers[1].monthlyPricePerSeat.toString(),
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: pricingTiers[1].monthlyPricePerSeat.toString(),
          priceCurrency: 'USD',
          unitText: 'per seat per month',
        },
        url: `${siteUrl}/pricing`,
        availability: 'https://schema.org/InStock',
      },

      // Startup Program (Special Offer)
      {
        '@type': 'Offer',
        name: 'Startup Program - 50% Off',
        description: `${startupProgram.discount} discount for eligible startups: ${startupProgram.eligibility.join(', ')}`,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'USD',
          unitText: 'per seat per month',
        },
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          value: 15,
          unitText: 'seats maximum',
        },
        url: `${siteUrl}/apply/startup`,
        availability: 'https://schema.org/LimitedAvailability',
        validThrough: '2025-12-31', // Update as needed
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OfferSchema;
