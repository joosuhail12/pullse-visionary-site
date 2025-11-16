/**
 * Comprehensive PostHog Dashboards Configuration
 *
 * Additional dashboards using both autocaptured and custom events:
 * - User Frustration & UX Issues
 * - Form Performance & Conversions
 * - Conversion & Revenue Tracking
 * - Content Engagement & Behavior
 * - Advanced Performance & Technical
 *
 * These complement the autocapture dashboards with deeper business insights
 */

import type { PostHogDashboardConfig } from './types';

/**
 * Dashboard 3: User Frustration & UX Issues
 * Priority: HIGH
 * Data Source: $rageclick, $dead_click, $exception (autocaptured)
 * Build: Immediate (data collecting for 3-7 days)
 */
export const USER_FRUSTRATION_DASHBOARD: PostHogDashboardConfig = {
  name: 'User Frustration & UX Issues',
  description: 'Identify broken UX, user frustration signals, and errors to improve user experience',
  pinned: true,
  tags: ['ux', 'frustration', 'errors', 'autocapture'],
  tiles: [
    // Chart 1: Rage Click Count
    {
      name: 'Rage Clicks (Last 7 Days)',
      description: 'Total rapid clicks indicating user frustration',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$rageclick',
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

    // Chart 2: Dead Click Count
    {
      name: 'Dead Clicks (Last 7 Days)',
      description: 'Clicks with no effect - potential broken UX',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$dead_click',
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

    // Chart 3: Exception Count
    {
      name: 'Exceptions (Last 7 Days)',
      description: 'Unhandled errors and promise rejections',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$exception',
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

    // Chart 4: Frustration Events Over Time
    {
      name: 'Frustration Events Trend',
      description: 'Rage clicks and dead clicks over time',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$rageclick',
              math: 'total',
              name: 'Rage Clicks',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: '$dead_click',
              math: 'total',
              name: 'Dead Clicks',
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

    // Chart 5: Pages with Most Rage Clicks
    {
      name: 'Pages with Most Rage Clicks',
      description: 'Top 10 pages causing user frustration',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$rageclick',
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

    // Chart 6: Elements with Dead Clicks
    {
      name: 'Elements with Dead Clicks',
      description: 'Top 10 elements that receive clicks but do nothing',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$dead_click',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$el_text',
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

    // Chart 7: Exceptions by Type
    {
      name: 'Exceptions by Type',
      description: 'Error distribution by exception type',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$exception',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: '$exception_type',
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

    // Chart 8: Exceptions by Page
    {
      name: 'Exceptions by Page',
      description: 'Top 10 pages with most errors',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$exception',
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
  ],
};

/**
 * Dashboard 4: Form Performance & Conversions
 * Priority: HIGH
 * Data Source: form_view, form_start, form_submit, form_complete, form_error (custom events)
 * Build: Immediate (Startup Application Form actively tracking)
 */
export const FORM_PERFORMANCE_DASHBOARD: PostHogDashboardConfig = {
  name: 'Form Performance & Conversions',
  description: 'Track form funnels, abandonment, completion rates, and conversion optimization',
  pinned: true,
  tags: ['forms', 'conversion', 'funnel'],
  tiles: [
    // Chart 1: Form Impressions
    {
      name: 'Form Impressions',
      description: 'Total form views in the last 7 days',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_view',
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

    // Chart 2: Form Starts
    {
      name: 'Form Starts',
      description: 'Users who began filling out forms',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_start',
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

    // Chart 3: Form Completions
    {
      name: 'Form Completions',
      description: 'Successful form submissions',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_complete',
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

    // Chart 4: Form Funnel
    {
      name: 'Form Funnel',
      description: 'Complete form journey from view to completion',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_view',
              name: 'Form View',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_start',
              name: 'Form Start',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_submit',
              name: 'Form Submit',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_complete',
              name: 'Form Complete',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'steps',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 5: Form Performance by Form ID
    {
      name: 'Form Completions by Form',
      description: 'Which forms convert best',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_complete',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: 'form_id',
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

    // Chart 6: Form Starts Over Time
    {
      name: 'Form Activity Trend',
      description: 'Form starts and completions over time',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_start',
              math: 'total',
              name: 'Form Starts',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_complete',
              math: 'total',
              name: 'Form Completions',
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

    // Chart 7: Multi-Step Form Progression (Startup Application)
    {
      name: 'Startup Application Form Steps',
      description: 'Step-by-step progression through application form',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_step',
              name: 'Step 1',
              properties: [
                {
                  key: 'form_id',
                  value: ['startup-application-form'],
                  operator: 'exact',
                  type: 'event',
                },
                {
                  key: 'form_step_name',
                  value: ['Step 1'],
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_step',
              name: 'Step 2',
              properties: [
                {
                  key: 'form_id',
                  value: ['startup-application-form'],
                  operator: 'exact',
                  type: 'event',
                },
                {
                  key: 'form_step_name',
                  value: ['Step 2'],
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_step',
              name: 'Step 3',
              properties: [
                {
                  key: 'form_id',
                  value: ['startup-application-form'],
                  operator: 'exact',
                  type: 'event',
                },
                {
                  key: 'form_step_name',
                  value: ['Step 3'],
                  operator: 'exact',
                  type: 'event',
                },
              ],
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_complete',
              name: 'Complete',
              properties: [
                {
                  key: 'form_id',
                  value: ['startup-application-form'],
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
          funnelsFilter: {
            funnelVizType: 'steps',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 8: Form Errors by Field
    {
      name: 'Form Errors by Field',
      description: 'Which fields cause most validation errors',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_error',
              math: 'total',
              version: 1,
            },
          ],
          breakdownFilter: {
            breakdown: 'field_name',
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

    // Chart 9: Form Views by Page
    {
      name: 'Form Views by Page',
      description: 'Which pages drive most form views',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_view',
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

    // Chart 10: Form Errors Trend
    {
      name: 'Form Errors Over Time',
      description: 'Daily form validation errors',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'form_error',
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
 * Dashboard 5: Conversion & Revenue Tracking
 * Priority: CRITICAL
 * Data Source: book_appointment, submit_application, cta_click (custom events)
 * Build: Immediate (Cal.com integration active)
 */
export const CONVERSION_REVENUE_DASHBOARD: PostHogDashboardConfig = {
  name: 'Conversion & Revenue Tracking',
  description: 'Business-critical revenue metrics, conversion funnels, and high-intent user behavior',
  pinned: true,
  tags: ['conversion', 'revenue', 'business'],
  tiles: [
    // Chart 1: Appointments Booked
    {
      name: 'Appointments Booked',
      description: 'Total Cal.com bookings in last 7 days',
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

    // Chart 2: Applications Submitted
    {
      name: 'Applications Submitted',
      description: 'Startup program applications',
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

    // Chart 3: CTA Clicks
    {
      name: 'CTA Clicks',
      description: 'High-value call-to-action clicks',
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

    // Chart 4: Conversion Funnel
    {
      name: 'Main Conversion Funnel',
      description: 'From pageview to booking',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'FunnelsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: '$pageview',
              name: 'Page View',
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
              name: 'Form Start',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'form_complete',
              name: 'Form Complete',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              name: 'Booking',
              version: 1,
            },
          ],
          dateRange: {
            date_from: '-7d',
            date_to: null,
          },
          funnelsFilter: {
            funnelVizType: 'steps',
          },
          version: 1,
        },
        version: 1,
      },
    },

    // Chart 5: Conversions Over Time
    {
      name: 'Conversions Trend',
      description: 'Daily conversion events',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'book_appointment',
              math: 'total',
              name: 'Bookings',
              version: 1,
            },
            {
              kind: 'EventsNode',
              event: 'submit_application',
              math: 'total',
              name: 'Applications',
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

    // Chart 6: Conversion by Traffic Source
    {
      name: 'Bookings by Traffic Source',
      description: 'Which sources drive conversions',
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

    // Chart 7: CTA Performance
    {
      name: 'CTA Performance by Button',
      description: 'Which CTAs get most clicks',
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
            breakdown: 'button_text',
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

    // Chart 8: Calendar Widget Loads
    {
      name: 'Calendar Widget Loads',
      description: 'Cal.com embed impressions',
      query: {
        kind: 'InsightVizNode',
        source: {
          kind: 'TrendsQuery',
          series: [
            {
              kind: 'EventsNode',
              event: 'calendar_load',
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
  ],
};

/**
 * Export all comprehensive dashboards
 * Phase 1 (Build Today): Dashboards 3, 4, 5
 * Phase 2 (Build After 7 Days): Dashboards 6, 7
 */
export const COMPREHENSIVE_DASHBOARDS = {
  frustration: USER_FRUSTRATION_DASHBOARD,
  forms: FORM_PERFORMANCE_DASHBOARD,
  conversion: CONVERSION_REVENUE_DASHBOARD,
};
