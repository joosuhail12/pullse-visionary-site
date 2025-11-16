/**
 * PostHog Phase 2 Dashboards Configuration
 *
 * Advanced dashboards built after 7+ days of data collection:
 * - Content Engagement & Behavior (custom events)
 * - Advanced Performance & Technical (custom performance events)
 *
 * Events Used:
 * - video_start, user_engagement, cta_click
 * - $copy_autocapture, $heatmaps_data
 * - long_task, api_performance
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 6: Content Engagement & Behavior
 * Priority: MEDIUM
 * Data Source: Custom events + autocapture (needs 7+ days for patterns)
 */
export const CONTENT_ENGAGEMENT_DASHBOARD: PostHogDashboardConfig = {
  name: 'Content Engagement & Behavior',
  description: 'User behavior patterns, content interaction, video engagement, and copy/paste analysis',
  pinned: true,
  tags: ['engagement', 'behavior', 'content', 'custom'],
  tiles: [
    // Chart 1: Total Video Starts (Number Card)
    {
      name: 'Video Starts (7 Days)',
      description: 'Total number of video plays initiated',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'video_start',
              math: 'total',
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

    // Chart 2: CTA Click-Through Rate (Number Card)
    {
      name: 'CTA Clicks (7 Days)',
      description: 'Total call-to-action button clicks',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'cta_click',
              math: 'total',
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

    // Chart 3: User Engagement Events (Number Card)
    {
      name: 'Engagement Events (7 Days)',
      description: 'Total user engagement interactions tracked',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'user_engagement',
              math: 'total',
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

    // Chart 4: Content Copy Activity (Number Card)
    {
      name: 'Content Copied (7 Days)',
      description: 'Total copy events - users copying content',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$copy_autocapture',
              math: 'total',
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

    // Chart 5: Video Engagement Over Time (Line Chart)
    {
      name: 'Video Engagement Trend',
      description: 'Daily video start events showing content consumption patterns',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'video_start',
              math: 'total',
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
            showLegend: false,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 6: CTA Performance by Type (Bar Chart)
    {
      name: 'Top CTA Buttons Clicked',
      description: 'Most clicked call-to-action buttons by element text',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'cta_click',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: 'element_text',
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

    // Chart 7: Most Copied Content (Bar Chart)
    {
      name: 'Most Copied Text',
      description: 'Content users are copying most frequently',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$copy_autocapture',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$selected_content',
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

    // Chart 8: Pages Where Content Is Copied (Bar Chart)
    {
      name: 'Copy Activity by Page',
      description: 'Pages where users copy content most often',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$copy_autocapture',
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

    // Chart 9: Engagement Patterns Over Time (Line Chart)
    {
      name: 'Engagement Event Trends',
      description: 'User engagement patterns across all tracked interactions',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'user_engagement',
              math: 'total',
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
 * Dashboard 7: Advanced Performance & Technical
 * Priority: MEDIUM
 * Data Source: Custom performance events (needs 7+ days for baseline)
 */
export const ADVANCED_PERFORMANCE_DASHBOARD: PostHogDashboardConfig = {
  name: 'Advanced Performance & Technical',
  description: 'Long tasks, API performance, technical monitoring, and advanced performance metrics',
  pinned: true,
  tags: ['performance', 'technical', 'api', 'custom'],
  tiles: [
    // Chart 1: Total Long Tasks (Number Card)
    {
      name: 'Long Tasks Detected (7 Days)',
      description: 'JavaScript long tasks blocking the main thread (>50ms)',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'long_task',
              math: 'total',
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

    // Chart 2: Average Long Task Duration (Number Card)
    {
      name: 'Avg Long Task Duration',
      description: 'Average duration of long tasks in milliseconds',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'long_task',
              math: 'avg',
              math_property: 'duration',
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

    // Chart 3: API Performance Tracking (Number Card)
    {
      name: 'API Calls Tracked (7 Days)',
      description: 'Total API performance events captured',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'api_performance',
              math: 'total',
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

    // Chart 4: Average API Response Time (Number Card)
    {
      name: 'Avg API Response Time',
      description: 'Average API response time in milliseconds',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'api_performance',
              math: 'avg',
              math_property: 'duration',
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

    // Chart 5: Long Tasks Over Time (Line Chart)
    {
      name: 'Long Task Occurrence Trend',
      description: 'Daily long task detections showing UI blocking patterns',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'long_task',
              math: 'total',
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
            showLegend: false,
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 6: Pages with Most Long Tasks (Bar Chart)
    {
      name: 'Pages with Long Tasks',
      description: 'Pages experiencing the most JavaScript long tasks',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'long_task',
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

    // Chart 7: API Performance by Endpoint (Bar Chart)
    {
      name: 'Slowest API Endpoints',
      description: 'API endpoints with highest average response times',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'api_performance',
              math: 'avg',
              math_property: 'duration',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: 'endpoint',
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

    // Chart 8: API Response Time Distribution (Line Chart)
    {
      name: 'API Response Time Trends',
      description: 'API performance trends showing p50, p90, p95 response times',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'api_performance',
              math: 'median',
              math_property: 'duration',
              name: 'p50 (Median)',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'api_performance',
              math: 'p90',
              math_property: 'duration',
              name: 'p90',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'api_performance',
              math: 'p95',
              math_property: 'duration',
              name: 'p95',
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

    // Chart 9: API Error Rate (Line Chart)
    {
      name: 'API Error Trends',
      description: 'API calls resulting in errors or failures',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'api_performance',
              math: 'total',
              properties: [
                {
                  key: 'status',
                  value: ['4', '5'],
                  operator: 'icontains',
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
 * Export all Phase 2 dashboards
 */
export const PHASE2_DASHBOARDS = {
  content: CONTENT_ENGAGEMENT_DASHBOARD,
  technical: ADVANCED_PERFORMANCE_DASHBOARD,
};
