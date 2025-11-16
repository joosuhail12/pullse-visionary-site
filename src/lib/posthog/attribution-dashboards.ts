/**
 * PostHog Traffic Source & Campaign Performance Dashboards
 *
 * Dashboard 12: Traffic Source & Campaign Performance
 * UTM tracking, referrer analysis, and marketing attribution
 *
 * Events Used:
 * - $pageview (autocaptured with UTM and referrer properties)
 * - book_appointment, submit_application, cta_click (custom)
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 12: Traffic Source & Campaign Performance
 * Priority: MEDIUM
 * Purpose: Understand which channels and campaigns drive the best results
 */
export const ATTRIBUTION_DASHBOARD: PostHogDashboardConfig = {
  name: 'Traffic Source & Campaign Performance',
  description: 'UTM campaign tracking, referrer analysis, marketing attribution, and traffic source ROI',
  pinned: true,
  tags: ['attribution', 'utm', 'campaigns', 'traffic-sources', 'marketing'],
  tiles: [
    // Chart 1: Traffic by Source (Pie Chart)
    {
      name: 'Traffic Source Distribution',
      description: 'Breakdown of traffic by referrer domain',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              math: 'dau',
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
            display: 'ActionsPie',
            showLegend: true,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 2: UTM Campaign Performance (Table)
    {
      name: 'Campaign Performance Overview',
      description: 'Traffic and engagement by UTM campaign',
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
          ],
          breakdownFilter: {
            breakdown: 'utm_campaign',
            breakdown_type: 'event',
            breakdown_limit: 15,
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

    // Chart 3: UTM Source ROI Analysis (Table)
    {
      name: 'Traffic Source Conversions',
      description: 'Bookings and applications by UTM source',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Bookings',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'submit_application',
              name: 'Applications',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: 'utm_source',
            breakdown_type: 'event',
            breakdown_limit: 15,
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

    // Chart 4: Organic vs Paid Traffic (Trend Line)
    {
      name: 'Organic vs Paid Traffic Trend',
      description: 'Daily comparison of organic and paid traffic sources',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Organic Traffic',
              math: 'total',
              properties: [
                {
                  key: 'utm_source',
                  value: null,
                  operator: 'is_not_set',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Paid Traffic',
              math: 'total',
              properties: [
                {
                  key: 'utm_source',
                  value: null,
                  operator: 'is_set',
                  type: 'event',
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

    // Chart 5: Best Converting Referrers (Bar Chart)
    {
      name: 'Top Referrers by Bookings',
      description: 'Referral domains that drive the most appointment bookings',
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
            breakdown_limit: 15,
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

    // Chart 6: UTM Medium Performance (Bar Chart)
    {
      name: 'Performance by UTM Medium',
      description: 'Traffic breakdown by marketing medium (cpc, email, social, etc.)',
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
            breakdown: 'utm_medium',
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

    // Chart 7: Landing Page by Source (Table)
    {
      name: 'Landing Pages by Traffic Source',
      description: 'Which landing pages each traffic source hits most',
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
                  key: '$entry_current_url',
                  value: null,
                  operator: 'is_set',
                  type: 'event',
                },
              ],
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
            display: 'ActionsTable',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 8: Social Media Performance (Bar Chart)
    {
      name: 'Social Media Traffic & Conversions',
      description: 'Performance across social media platforms',
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
              properties: [
                {
                  key: '$referring_domain',
                  value: 'facebook|linkedin|twitter|instagram',
                  operator: 'regex',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Bookings',
              math: 'total',
              properties: [
                {
                  key: '$referring_domain',
                  value: 'facebook|linkedin|twitter|instagram',
                  operator: 'regex',
                  type: 'event',
                },
              ],
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$referring_domain',
            breakdown_type: 'event',
          },
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

    // Chart 9: Campaign Conversion Rates (Table)
    {
      name: 'Campaign ROI Metrics',
      description: 'Conversion metrics for each UTM campaign',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Sessions',
              math: 'unique_session',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Bookings',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'submit_application',
              name: 'Applications',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: 'utm_campaign',
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

    // Chart 10: Direct vs Referral Traffic (Number Cards)
    {
      name: 'Direct Traffic Volume',
      description: 'Total visitors arriving directly (no referrer)',
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
                  key: '$referring_domain',
                  value: '',
                  operator: 'exact',
                  type: 'event',
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

    // Funnel 14: Campaign Performance Funnel (Time-to-Convert)
    {
      name: 'Campaign Attribution Funnel',
      description: 'Full conversion path with UTM campaign breakdown',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Landing Page',
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
              event: 'form_start',
              name: 'Form Started',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: 'utm_campaign',
            breakdown_type: 'event',
            breakdown_limit: 10,
          },
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
 * Export all attribution dashboards
 */
export const ATTRIBUTION_DASHBOARDS = {
  attribution: ATTRIBUTION_DASHBOARD,
};
