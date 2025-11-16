/**
 * PostHog User Journey & Path Analysis Dashboards
 *
 * Dashboard 8: User Journey & Path Analysis
 * Tracks navigation patterns, page sequences, and paths to conversion
 *
 * Events Used:
 * - $pageview, $pageleave (autocaptured)
 * - cta_click, book_appointment (custom)
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 8: User Journey & Path Analysis
 * Priority: HIGH
 * Purpose: Understand how users navigate and discover key pages
 */
export const USER_JOURNEY_DASHBOARD: PostHogDashboardConfig = {
  name: 'User Journey & Path Analysis',
  description: 'Navigation patterns, page sequences before conversion, entry/exit points, and user discovery paths',
  pinned: true,
  tags: ['journey', 'paths', 'navigation', 'discovery'],
  tiles: [
    // Chart 1: Top Entry Pages (Bar Chart)
    {
      name: 'Top Entry Pages',
      description: 'Most common landing pages where users start their journey',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'total',
              properties: [
                {
                  key: '$entry_referring_domain',
                  value: null,
                  operator: 'is_set',
                  type: 'event',
                },
              ],
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$entry_current_url',
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

    // Chart 2: Top Exit Pages (Bar Chart)
    {
      name: 'Top Exit Pages',
      description: 'Pages where users most commonly leave the site',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageleave',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$current_url',
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

    // Chart 3: Average Pages Per Session (Number Card)
    {
      name: 'Avg Pages Per Session',
      description: 'Average number of pages viewed per user session',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'avg',
              math_property: '$session_id',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          trendsFilter: {
            display: 'BoldNumber',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 4: Pages Before Booking (Bar Chart)
    {
      name: 'Pages Visited Before Booking',
      description: 'Which pages users view immediately before booking an appointment',
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
            breakdown: '$prev_pageview_pathname',
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

    // Chart 5: Pages Before Application (Bar Chart)
    {
      name: 'Pages Visited Before Application',
      description: 'Which pages users view before submitting startup application',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'submit_application',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$prev_pageview_pathname',
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

    // Chart 6: Session Duration Distribution (Histogram-style Bar)
    {
      name: 'Average Session Duration',
      description: 'Average time users spend on site per session (in seconds)',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageleave',
              math: 'avg',
              math_property: '$session_duration',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          trendsFilter: {
            display: 'BoldNumber',
            aggregationAxisFormat: 'duration',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 7: Bounce Rate by Landing Page (Table)
    {
      name: 'Single-Page Sessions',
      description: 'Sessions where users viewed only one page (bounce)',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'total',
              properties: [
                {
                  key: '$pageview_id',
                  value: 1,
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$entry_current_url',
            breakdown_type: 'event',
            breakdown_limit: 10,
          },
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

    // Funnel 1: Homepage Discovery Path (with time-to-convert)
    {
      name: 'Homepage Discovery Funnel',
      description: 'User journey from homepage through product/pricing to CTA click',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Homepage Visit',
              properties: [
                {
                  key: '$current_url',
                  value: '/',
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Product Page Visit',
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
              name: 'Pricing Page Visit',
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

    // Funnel 2: Blog-to-Conversion Path (with time-to-convert)
    {
      name: 'Blog-to-Conversion Funnel',
      description: 'Journey from blog content to product exploration to booking',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Blog Visit',
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

    // Funnel 3: Solution Explorer Path (with time-to-convert)
    {
      name: 'Solution Explorer Funnel',
      description: 'Path from solutions page through specific solution to pricing and CTA',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Solutions Overview',
              properties: [
                {
                  key: '$current_url',
                  value: '/solutions',
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Specific Solution',
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
  ],
};

/**
 * Export all journey analysis dashboards
 */
export const JOURNEY_DASHBOARDS = {
  journey: USER_JOURNEY_DASHBOARD,
};
