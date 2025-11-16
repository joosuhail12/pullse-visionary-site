/**
 * PostHog Advanced Conversion Funnels Dashboards
 *
 * Dashboard 9: Advanced Conversion Funnels
 * Deep dive into specific conversion paths with multiple variations
 *
 * Events Used:
 * - $pageview (autocaptured)
 * - form_view, form_start, form_step, form_submit
 * - book_appointment, submit_application, cta_click, calendar_load
 * - outbound_link
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 9: Advanced Conversion Funnels
 * Priority: HIGH
 * Purpose: Comprehensive funnel analysis with time-to-convert insights
 */
export const ADVANCED_FUNNELS_DASHBOARD: PostHogDashboardConfig = {
  name: 'Advanced Conversion Funnels',
  description: 'Comprehensive conversion path analysis: pricing, multi-session, content-led, applications, and quick booking funnels with time-to-convert',
  pinned: true,
  tags: ['funnels', 'conversion', 'optimization', 'time-to-convert'],
  tiles: [
    // Funnel 1: Feature Discovery to Booking (Ordered, Time-to-Convert)
    {
      name: 'Feature Discovery → Booking Funnel',
      description: 'Product exploration to appointment booking journey with timing',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Product Page View',
              properties: [
                {
                  key: '$current_url',
                  value: '/product',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Pricing Page View',
              properties: [
                {
                  key: '$current_url',
                  value: '/pricing',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'cta_click',
              name: 'CTA Click',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'time_to_convert',
            funnelOrderType: 'ordered',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Funnel 2: Pricing Exploration (Unordered, Time-to-Convert)
    {
      name: 'Pricing Exploration Funnel (Unordered)',
      description: 'Users exploring pricing and comparison in any order before booking',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Pricing Page',
              properties: [
                {
                  key: '$current_url',
                  value: '/pricing',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Compare Page',
              properties: [
                {
                  key: '$current_url',
                  value: '/compare',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'cta_click',
              name: 'CTA Click',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'time_to_convert',
            funnelOrderType: 'unordered',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Funnel 3: Multi-Session Conversion (Ordered, Time-to-Convert)
    {
      name: 'Multi-Session Conversion Funnel',
      description: 'Users who return for a second visit before converting',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'First Visit',
              properties: [
                {
                  key: '$session_duration',
                  value: 0,
                  operator: 'gt',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Return Visit',
              properties: [
                {
                  key: '$session_duration',
                  value: 0,
                  operator: 'gt',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'cta_click',
              name: 'CTA Click',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'time_to_convert',
            funnelOrderType: 'ordered',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Funnel 4: Content-Led Conversion (Ordered, Time-to-Convert)
    {
      name: 'Content-Led Conversion Funnel',
      description: 'Blog content to product discovery to booking journey',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Blog Article',
              properties: [
                {
                  key: '$current_url',
                  value: '/blog',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Product Page',
              properties: [
                {
                  key: '$current_url',
                  value: '/product',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Pricing Page',
              properties: [
                {
                  key: '$current_url',
                  value: '/pricing',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'cta_click',
              name: 'CTA Click',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'time_to_convert',
            funnelOrderType: 'ordered',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Funnel 5: Complete Startup Application Journey (Ordered, Time-to-Convert)
    {
      name: 'Startup Application Complete Journey',
      description: 'Full path from solution discovery through all form steps to submission',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Solution Page',
              properties: [
                {
                  key: '$current_url',
                  value: '/solutions/',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Apply Page',
              properties: [
                {
                  key: '$current_url',
                  value: '/apply',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_view',
              name: 'Form Viewed',
              properties: [
                {
                  key: 'form_id',
                  value: 'startup-application-form',
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_start',
              name: 'Form Started',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_step',
              name: 'Step 1 Complete',
              properties: [
                {
                  key: 'step_number',
                  value: 1,
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_step',
              name: 'Step 2 Complete',
              properties: [
                {
                  key: 'step_number',
                  value: 2,
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_step',
              name: 'Step 3 Complete',
              properties: [
                {
                  key: 'step_number',
                  value: 3,
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_submit',
              name: 'Form Submitted',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'submit_application',
              name: 'Application Complete',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'time_to_convert',
            funnelOrderType: 'ordered',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Funnel 6: Quick Booker (Strict, Time-to-Convert)
    {
      name: 'Quick Booker Funnel (Strict)',
      description: 'Fast path from page view to immediate booking (strict sequence)',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Any Page View',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'cta_click',
              name: 'CTA Click',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'calendar_load',
              name: 'Calendar Loaded',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'time_to_convert',
            funnelOrderType: 'strict',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 7: Funnel Conversion Rate Comparison (Table)
    {
      name: 'Funnel Conversion Rates Summary',
      description: 'Comparison of all funnel conversion rates side-by-side',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Booking Conversions',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'submit_application',
              name: 'Application Conversions',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'cta_click',
              name: 'CTA Clicks',
              math: 'total',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          trendsFilter: {
            display: 'ActionsTable',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 8: Drop-off Analysis by Funnel Stage (Bar Chart)
    {
      name: 'Conversion Drop-off Points',
      description: 'Where users drop out of the main conversion funnel',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Initial Pageviews',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'cta_click',
              name: 'CTA Clicks',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_start',
              name: 'Form Starts',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Bookings',
              math: 'total',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          trendsFilter: {
            display: 'ActionsBar',
            showLegend: true,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 9: Traffic Source Funnel Performance (Breakdown)
    {
      name: 'Booking Funnel by Traffic Source',
      description: 'Conversion rates broken down by where users came from',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$referring_domain',
            breakdown_type: 'event',
            breakdown_limit: 10,
          },
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          trendsFilter: {
            display: 'ActionsBar',
            showLegend: false,
          },
          version: 1,
        },
        version: 1,
      },
    },
  ],
};

/**
 * Export all advanced funnel dashboards
 */
export const FUNNEL_DASHBOARDS = {
  funnels: ADVANCED_FUNNELS_DASHBOARD,
};
