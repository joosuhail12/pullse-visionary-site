/**
 * PostHog Autocapture Dashboards Configuration
 *
 * Dashboards built using PostHog's autocaptured events:
 * - $web_vitals (LCP, FCP, CLS, INP)
 * - $pageview, $pageleave
 * - $autocapture (clicks, forms)
 * - $rageclick, $dead_click
 * - $exception
 * - $copy_autocapture
 * - $heatmaps_data
 *
 * Based on comprehensive autocapture research Nov 2025
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 1: Performance & Web Vitals
 * Priority: HIGH
 * Data Source: $web_vitals (already being captured)
 */
export const PERFORMANCE_WEB_VITALS_DASHBOARD: PostHogDashboardConfig = {
  name: 'Performance & Web Vitals',
  description: 'Core Web Vitals monitoring, page performance, and user experience metrics using PostHog autocaptured data',
  pinned: true,
  tags: ['performance', 'web-vitals', 'autocapture'],
  tiles: [
    // Chart 1: Core Web Vitals Overview (Number Cards)
    {
      name: 'LCP Average',
      description: 'Average Largest Contentful Paint (target: < 2.5s)',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_LCP_value',
          },
        ],
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'BoldNumber',
        },
      },
    },

    {
      name: 'CLS Average',
      description: 'Average Cumulative Layout Shift (target: < 0.1)',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_CLS_value',
          },
        ],
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'BoldNumber',
        },
      },
    },

    {
      name: 'FCP Average',
      description: 'Average First Contentful Paint (target: < 1.8s)',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_FCP_value',
          },
        ],
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'BoldNumber',
        },
      },
    },

    {
      name: 'INP Average',
      description: 'Average Interaction to Next Paint (target: < 200ms)',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_INP_value',
          },
        ],
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'BoldNumber',
        },
      },
    },

    // Chart 2: Web Vitals Trends (Line Chart)
    {
      name: 'Web Vitals Trends',
      description: 'All Core Web Vitals metrics over time',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_LCP_value',
            name: 'LCP (ms)',
          },
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_FCP_value',
            name: 'FCP (ms)',
          },
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_INP_value',
            name: 'INP (ms)',
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
      },
    },

    // Chart 3: Slowest Pages by LCP (Bar Chart)
    {
      name: 'Slowest Pages (LCP)',
      description: 'Top 10 pages with worst Largest Contentful Paint',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_LCP_value',
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
      },
    },

    // Chart 4: Pages with Layout Shift Issues (Bar Chart)
    {
      name: 'Layout Shift Issues (CLS > 0.1)',
      description: 'Pages with Cumulative Layout Shift above threshold',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_CLS_value',
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
      },
    },

    // Chart 5: Performance by Device Type (Breakdown)
    {
      name: 'LCP by Device Type',
      description: 'Largest Contentful Paint comparison: Mobile vs Desktop',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_LCP_value',
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
      },
    },

    // Chart 6: Performance by Browser (Breakdown)
    {
      name: 'LCP by Browser',
      description: 'Largest Contentful Paint by browser to identify browser-specific issues',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_LCP_value',
          },
        ],
        breakdownFilter: {
          breakdown: '$browser',
          breakdown_type: 'event',
          breakdown_limit: 5,
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
      },
    },

    // Chart 7: INP by Page (Responsiveness)
    {
      name: 'Page Responsiveness (INP)',
      description: 'Interaction to Next Paint by page - measures responsiveness',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$web_vitals',
            math: 'avg',
            math_property: '$web_vitals_INP_value',
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
      },
    },
  ],
};

/**
 * Dashboard 2: User Engagement & Sessions
 * Priority: HIGH
 * Data Source: $pageview, $pageleave (already being captured)
 */
export const USER_ENGAGEMENT_DASHBOARD: PostHogDashboardConfig = {
  name: 'User Engagement & Sessions',
  description: 'Session metrics, engagement patterns, bounce rates, and scroll depth using PostHog autocaptured pageview data',
  pinned: true,
  tags: ['engagement', 'sessions', 'autocapture'],
  tiles: [
    // Chart 1: Total Pageviews (Number Card)
    {
      name: 'Total Pageviews',
      description: 'Total number of page views in the last 7 days',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$pageview',
            math: 'total',
          },
        ],
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'BoldNumber',
        },
      },
    },

    // Chart 2: Unique Visitors (Number Card)
    {
      name: 'Unique Visitors',
      description: 'Total unique users in the last 7 days',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$pageview',
            math: 'dau',
          },
        ],
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'BoldNumber',
        },
      },
    },

    // Chart 3: Pageviews Over Time (Line Chart)
    {
      name: 'Pageview Trend',
      description: 'Daily pageviews and unique visitors over time',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$pageview',
            math: 'total',
            name: 'Total Pageviews',
          },
          {
            kind: 'EventsNode',
            event: '$pageview',
            math: 'dau',
            name: 'Unique Visitors',
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
      },
    },

    // Chart 4: Top Pages (Bar Chart)
    {
      name: 'Most Viewed Pages',
      description: 'Top 10 most visited pages',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$pageview',
            math: 'total',
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
      },
    },

    // Chart 5: Average Scroll Depth by Page
    {
      name: 'Scroll Depth by Page',
      description: 'Average scroll depth percentage by page',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$pageleave',
            math: 'avg',
            math_property: '$scroll_depth_percentage',
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
      },
    },

    // Chart 6: Traffic Sources (Breakdown)
    {
      name: 'Traffic Sources',
      description: 'Pageviews broken down by referrer source',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$pageview',
            math: 'total',
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
      },
    },

    // Chart 7: User Activity Heatmap (by Hour)
    {
      name: 'Pageviews by Hour of Day',
      description: 'When users are most active during the day',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: '$pageview',
            math: 'total',
          },
        ],
        breakdownFilter: {
          breakdown: 'hour',
          breakdown_type: 'event',
        },
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'ActionsBar',
          showLegend: false,
        },
      },
    },
  ],
};

/**
 * Export all autocapture-based dashboards
 */
export const AUTOCAPTURE_DASHBOARDS = {
  performance: PERFORMANCE_WEB_VITALS_DASHBOARD,
  engagement: USER_ENGAGEMENT_DASHBOARD,
};
