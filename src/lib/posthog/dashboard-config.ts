/**
 * PostHog Performance Dashboard Configuration
 *
 * Defines all 11 charts for Core Web Vitals and performance monitoring
 * Based on: docs/POSTHOG_PERFORMANCE_DASHBOARD.md
 */

import type { PostHogDashboardConfig } from './types';

export const PERFORMANCE_DASHBOARD_CONFIG: PostHogDashboardConfig = {
  name: 'Core Web Vitals & Performance',
  description:
    'Comprehensive performance monitoring dashboard tracking Core Web Vitals, Long Tasks, API Performance, and Route Changes',
  pinned: true,
  tags: ['performance', 'web-vitals', 'monitoring'],
  tiles: [
    // Chart 1: Core Web Vitals Trend
    {
      name: 'Core Web Vitals Trend',
      description: 'Time series showing all Core Web Vitals metrics over the last 30 days',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'web_vitals',
            math: 'avg',
            math_property: 'metric_value',
          },
        ],
        breakdownFilter: {
          breakdown: 'metric_name',
          breakdown_type: 'event',
        },
        dateRange: {
          date_from: '-30d',
          date_to: null,
        },
        interval: 'day',
        trendsFilter: {
          display: 'ActionsLineGraph',
          showLegend: true,
        },
      },
    },

    // Chart 2: LCP by Page
    {
      name: 'LCP by Page',
      description: 'Top 10 pages by average Largest Contentful Paint time',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'lcp',
            math: 'avg',
            math_property: 'value',
          },
        ],
        breakdownFilter: {
          breakdown: 'page_path',
          breakdown_type: 'event',
          breakdown_limit: 10,
        },
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'ActionsBar',
          aggregationAxisFormat: 'duration_ms',
        },
      },
    },

    // Chart 3: Web Vitals Rating Distribution
    {
      name: 'Web Vitals Rating Distribution',
      description: 'Percentage breakdown of good, needs-improvement, and poor ratings',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'web_vitals',
            math: 'total',
          },
        ],
        breakdownFilter: {
          breakdown: 'metric_rating',
          breakdown_type: 'event',
        },
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'ActionsPie',
        },
      },
    },

    // Chart 4: Long Tasks Over Time
    {
      name: 'Long Tasks Over Time',
      description: 'Frequency and average duration of JavaScript tasks exceeding 50ms',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'long_task',
            math: 'total',
            name: 'Long Task Count',
          },
          {
            kind: 'EventsNode',
            event: 'long_task',
            math: 'avg',
            math_property: 'task_duration',
            name: 'Avg Duration (ms)',
          },
        ],
        dateRange: {
          date_from: '-24h',
          date_to: null,
        },
        interval: 'hour',
        trendsFilter: {
          display: 'ActionsBar',
        },
      },
    },

    // Chart 5: Top Long Task Culprits
    {
      name: 'Top Long Task Culprits',
      description: 'Scripts and pages causing the most blocking JavaScript',
      query: {
        kind: 'EventsQuery',
        select: [
          'properties.page_path as page_path',
          'properties.attribution as attribution',
          'avg(properties.task_duration) as avg_duration',
          'count() as occurrences',
        ],
        where: ["event = 'long_task'"],
        orderBy: ['avg(properties.task_duration) DESC'],
        limit: 20,
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
      },
    },

    // Chart 6: Route Change Performance
    {
      name: 'Route Change Performance',
      description: 'Client-side navigation speed by destination route',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'route_change',
            math: 'avg',
            math_property: 'duration_ms',
          },
        ],
        breakdownFilter: {
          breakdown: 'to_path',
          breakdown_type: 'event',
        },
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'ActionsLineGraph',
          aggregationAxisFormat: 'duration_ms',
        },
      },
    },

    // Chart 7: TTI by Page
    {
      name: 'TTI by Page',
      description: 'Time to Interactive by page - when pages become fully responsive',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'tti',
            math: 'avg',
            math_property: 'metric_value',
          },
        ],
        breakdownFilter: {
          breakdown: 'page_path',
          breakdown_type: 'event',
        },
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'ActionsBar',
          aggregationAxisFormat: 'duration_ms',
        },
        filterTestAccounts: true,
      },
    },

    // Chart 8: API Response Times
    {
      name: 'API Response Times',
      description: 'Average response time by API endpoint over the last 24 hours',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'api_performance',
            math: 'avg',
            math_property: 'api_duration',
          },
        ],
        breakdownFilter: {
          breakdown: 'api_endpoint',
          breakdown_type: 'event',
        },
        dateRange: {
          date_from: '-24h',
          date_to: null,
        },
        interval: 'hour',
        trendsFilter: {
          display: 'ActionsLineGraph',
          aggregationAxisFormat: 'duration_ms',
        },
      },
    },

    // Chart 9: API Success Rate
    {
      name: 'API Success Rate',
      description: 'Percentage of successful API requests with week-over-week comparison',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'api_performance',
            math: 'total',
            properties: [
              {
                key: 'api_success',
                value: ['true'],
                operator: 'exact',
                type: 'event',
              },
            ],
          },
        ],
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'BoldNumber',
          showPercentStackView: true,
        },
        compareFilter: {
          compare: true,
          compare_to: '-7d',
        },
      },
    },

    // Chart 10: Failed API Requests
    {
      name: 'Failed API Requests',
      description: 'Table of API failures by endpoint, method, and status code',
      query: {
        kind: 'EventsQuery',
        select: [
          'properties.api_endpoint as endpoint',
          'properties.api_method as method',
          'properties.api_status as status',
          'count() as failures',
        ],
        where: ["event = 'api_performance'", "properties.api_success = 'false'"],
        orderBy: ['count() DESC'],
        limit: 50,
        dateRange: {
          date_from: '-24h',
          date_to: null,
        },
      },
    },

    // Chart 11: Custom Journey Times
    {
      name: 'Custom Journey Times',
      description: 'Average duration of tracked user journeys by journey type',
      query: {
        kind: 'TrendsQuery',
        series: [
          {
            kind: 'EventsNode',
            event: 'user_journey',
            math: 'avg',
            math_property: 'journey_duration',
          },
        ],
        breakdownFilter: {
          breakdown: 'journey_name',
          breakdown_type: 'event',
        },
        dateRange: {
          date_from: '-7d',
          date_to: null,
        },
        trendsFilter: {
          display: 'ActionsBar',
          aggregationAxisFormat: 'duration_ms',
        },
      },
    },
  ],
};
