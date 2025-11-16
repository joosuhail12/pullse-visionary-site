/**
 * PostHog Geographic & Device Intelligence Dashboards
 *
 * Dashboard 11: Geographic & Device Intelligence
 * Geographic distribution, device type analysis, and browser performance
 *
 * Events Used:
 * - $pageview (autocaptured with geo and device properties)
 * - $rageclick, $dead_click (autocaptured)
 * - book_appointment, cta_click (custom)
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 11: Geographic & Device Intelligence
 * Priority: MEDIUM
 * Purpose: Understand where users come from and what devices they use
 */
export const SEGMENTATION_DASHBOARD: PostHogDashboardConfig = {
  name: 'Geographic & Device Intelligence',
  description: 'Country/city distribution, mobile vs desktop performance, browser analysis, and device-specific user behavior',
  pinned: true,
  tags: ['geographic', 'device', 'browser', 'segmentation'],
  tiles: [
    // Chart 1: Visitors by Country (Bar Chart)
    {
      name: 'Top Countries by Traffic',
      description: 'Geographic distribution of visitors by country',
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
            breakdown: '$geoip_country_name',
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

    // Chart 2: Top Cities (Bar Chart)
    {
      name: 'Top Cities by Traffic',
      description: 'Most common cities where visitors access the site',
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
            breakdown: '$geoip_city_name',
            breakdown_type: 'event',
            breakdown_limit: 20,
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

    // Chart 3: Mobile vs Desktop Traffic (Pie Chart)
    {
      name: 'Traffic by Device Type',
      description: 'Distribution of mobile vs desktop visitors',
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
            breakdown: '$device_type',
            breakdown_type: 'person',
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

    // Chart 4: Mobile vs Desktop Conversion Rates (Comparison)
    {
      name: 'Bookings by Device Type',
      description: 'Booking conversions: Mobile vs Desktop comparison',
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
            breakdown: '$device_type',
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

    // Chart 5: Browser Performance (Table)
    {
      name: 'Traffic by Browser',
      description: 'Browser distribution and usage patterns',
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
            breakdown: '$browser',
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

    // Chart 6: Device-Specific UX Issues (Bar Chart)
    {
      name: 'Frustration Signals by Device',
      description: 'Rage clicks and dead clicks by device type',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$rageclick',
              name: 'Rage Clicks',
              math: 'total',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$dead_click',
              name: 'Dead Clicks',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$device_type',
            breakdown_type: 'person',
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

    // Chart 7: Geographic Conversion Performance (Table)
    {
      name: 'Bookings by Country',
      description: 'Appointment bookings by geographic location',
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
            breakdown: '$geoip_country_name',
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

    // Chart 8: Screen Resolution Impact (Breakdown)
    {
      name: 'Traffic by Screen Width',
      description: 'Common screen resolutions of visitors',
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
            breakdown: '$screen_width',
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

    // Chart 9: Operating System Distribution (Pie Chart)
    {
      name: 'Operating System Distribution',
      description: 'Breakdown of visitors by OS (Windows, Mac, iOS, Android, etc.)',
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
            breakdown: '$os',
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

    // Funnel 12: Mobile User Journey (Time-to-Convert)
    {
      name: 'Mobile User Conversion Funnel',
      description: 'Complete mobile user journey from page view to booking',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Homepage',
              properties: [
                {
                  key: '$device_type',
                  value: 'Mobile',
                  operator: 'exact',
                  type: 'person',
                },
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
              name: 'Pricing Page',
              properties: [
                {
                  key: '$device_type',
                  value: 'Mobile',
                  operator: 'exact',
                  type: 'person',
                },
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
              properties: [
                {
                  key: '$device_type',
                  value: 'Mobile',
                  operator: 'exact',
                  type: 'person',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              properties: [
                {
                  key: '$device_type',
                  value: 'Mobile',
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
          funnelsFilter: {
            funnelVizType: 'time_to_convert',
            funnelOrderType: 'ordered',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Funnel 13: Desktop User Journey (Time-to-Convert)
    {
      name: 'Desktop User Conversion Funnel',
      description: 'Complete desktop user journey with detailed product exploration',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Homepage',
              properties: [
                {
                  key: '$device_type',
                  value: 'Desktop',
                  operator: 'exact',
                  type: 'person',
                },
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
              name: 'Product Page',
              properties: [
                {
                  key: '$device_type',
                  value: 'Desktop',
                  operator: 'exact',
                  type: 'person',
                },
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
                  key: '$device_type',
                  value: 'Desktop',
                  operator: 'exact',
                  type: 'person',
                },
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
              properties: [
                {
                  key: '$device_type',
                  value: 'Desktop',
                  operator: 'exact',
                  type: 'person',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Appointment Booked',
              properties: [
                {
                  key: '$device_type',
                  value: 'Desktop',
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
 * Export all segmentation dashboards
 */
export const SEGMENTATION_DASHBOARDS = {
  segmentation: SEGMENTATION_DASHBOARD,
};
