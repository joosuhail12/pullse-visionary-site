/**
 * PostHog Retention & Returning Visitors Dashboards
 *
 * Dashboard 10: Retention & Returning Visitors
 * Multi-visit behavior, visit frequency, and retention analysis
 *
 * Events Used:
 * - $pageview (autocaptured with session properties)
 * - cta_click, book_appointment (custom)
 * - User properties: $session_id, $session_duration
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 10: Retention & Returning Visitors
 * Priority: HIGH
 * Purpose: Understand user retention and multi-session behavior
 */
export const RETENTION_DASHBOARD: PostHogDashboardConfig = {
  name: 'Retention & Returning Visitors',
  description: 'Multi-visit behavior, visit frequency, new vs returning analysis, and engagement patterns',
  pinned: true,
  tags: ['retention', 'returning', 'engagement', 'loyalty'],
  tiles: [
    // Chart 1: New vs Returning Visitors (Trend Line)
    {
      name: 'New vs Returning Visitors Trend',
      description: 'Daily comparison of new and returning user traffic',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'New Visitors',
              math: 'dau',
              properties: [
                {
                  key: '$is_identified',
                  value: false,
                  operator: 'exact',
                  type: 'person',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Returning Visitors',
              math: 'dau',
              properties: [
                {
                  key: '$is_identified',
                  value: true,
                  operator: 'exact',
                  type: 'person',
                },
              ],
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          interval: 'day',
          trendsFilter: {
            display: 'ActionsLineGraph',
            showLegend: true,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 2: Total Returning Visitors (Number Card)
    {
      name: 'Returning Visitors (7 Days)',
      description: 'Total unique returning visitors in the last 7 days',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'dau',
              properties: [
                {
                  key: '$is_identified',
                  value: true,
                  operator: 'exact',
                  type: 'person',
                },
              ],
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

    // Chart 3: Session Count Distribution (Bar Chart)
    {
      name: 'Sessions Per User Distribution',
      description: 'How many times users visit (1x, 2x, 3x, etc.)',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'unique_session',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-30d',
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

    // Chart 4: Average Session Duration by Visit Number (Bar Chart)
    {
      name: 'Session Duration: New vs Returning',
      description: 'Average session length for new vs returning visitors',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageleave',
              name: 'New Visitors',
              math: 'avg',
              math_property: '$session_duration',
              properties: [
                {
                  key: '$is_identified',
                  value: false,
                  operator: 'exact',
                  type: 'person',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageleave',
              name: 'Returning Visitors',
              math: 'avg',
              math_property: '$session_duration',
              properties: [
                {
                  key: '$is_identified',
                  value: true,
                  operator: 'exact',
                  type: 'person',
                },
              ],
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
            aggregationAxisFormat: 'duration',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 5: Returning Visitor Conversion Rate (Number Card)
    {
      name: 'Returning Visitor Bookings',
      description: 'Total bookings from returning visitors',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              math: 'total',
              properties: [
                {
                  key: '$is_identified',
                  value: true,
                  operator: 'exact',
                  type: 'person',
                },
              ],
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

    // Chart 6: Pages Viewed by Visit Type (Breakdown)
    {
      name: 'Page Views: New vs Returning',
      description: 'Total pageviews breakdown by visitor type',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$is_identified',
            breakdown_type: 'person',
          },
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          interval: 'day',
          trendsFilter: {
            display: 'ActionsLineGraph',
            showLegend: true,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 7: Multi-Session User Activity (Line Chart)
    {
      name: 'Multi-Session Users Over Time',
      description: 'Users with 2+ sessions showing engagement trend',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'dau',
              properties: [
                {
                  key: '$is_identified',
                  value: true,
                  operator: 'exact',
                  type: 'person',
                },
              ],
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-30d',
            date_to: null,
          },
          interval: 'day',
          trendsFilter: {
            display: 'ActionsLineGraph',
            showLegend: false,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 8: Engagement Depth by Visitor Type (Table)
    {
      name: 'Engagement Metrics by Visitor Type',
      description: 'Comparison of key engagement metrics',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Pageviews',
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
              event: 'book_appointment',
              name: 'Bookings',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$is_identified',
            breakdown_type: 'person',
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

    // Chart 9: Feature Exploration by Visit Count (Breakdown)
    {
      name: 'Product Page Views by Visit Type',
      description: 'Product exploration by new vs returning visitors',
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
                  key: '$current_url',
                  value: '/product',
                  operator: 'icontains',
                  type: 'event',
                },
              ],
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$is_identified',
            breakdown_type: 'person',
          },
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          interval: 'day',
          trendsFilter: {
            display: 'ActionsLineGraph',
            showLegend: true,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 10: Returning User Engagement Rate (Number Card)
    {
      name: 'Repeat Visitor Rate',
      description: 'Percentage of visitors who return for a second visit',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'dau',
              properties: [
                {
                  key: '$is_identified',
                  value: true,
                  operator: 'exact',
                  type: 'person',
                },
              ],
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-30d',
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

    // Funnel 11: Multi-Session Booking Journey (Time-to-Convert)
    {
      name: 'Multi-Session Booking Funnel',
      description: 'Users who return before booking (multi-visit conversion)',
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
                  key: '$is_identified',
                  value: false,
                  operator: 'exact',
                  type: 'person',
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
                  key: '$is_identified',
                  value: true,
                  operator: 'exact',
                  type: 'person',
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
            date_from: '-30d',
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
 * Export all retention analysis dashboards
 */
export const RETENTION_DASHBOARDS = {
  retention: RETENTION_DASHBOARD,
};
