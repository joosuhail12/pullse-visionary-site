# PostHog Performance Dashboard Setup Guide

This guide explains how to set up a comprehensive performance monitoring dashboard in PostHog to track the custom Core Web Vitals metrics implemented in the application.

## Overview

The application now tracks the following performance metrics and sends them to PostHog:

### Core Web Vitals
- **LCP** (Largest Contentful Paint) - Loading performance
- **FCP** (First Contentful Paint) - Initial render time
- **INP** (Interaction to Next Paint) - Responsiveness
- **CLS** (Cumulative Layout Shift) - Visual stability
- **TTFB** (Time to First Byte) - Server response time
- **TTI** (Time to Interactive) - Full interactivity time

### Custom Performance Metrics
- **Long Tasks** - JavaScript execution >50ms blocking the main thread
- **Route Changes** - Client-side navigation performance
- **API Performance** - HTTP request timing and success rates
- **Custom Measures** - User journey performance tracking
- **User Journeys** - Complete flow timing (e.g., checkout, form submission)

## Setting Up Your Dashboard

### Step 1: Access PostHog Dashboards

1. Log into your PostHog account
2. Navigate to **Dashboards** in the left sidebar
3. Click **+ New dashboard**
4. Name it "Core Web Vitals & Performance"

### Step 2: Create Performance Overview Charts

#### Chart 1: Core Web Vitals Trend
**Type:** Time Series Line Chart

**Configuration:**
- **Events:** `web_vitals`
- **Filter:** Group by `metric_name` property
- **Y-axis:** Average of `metric_value`
- **Breakdown:** By `metric_name` (LCP, FCP, INP, CLS, TTFB)
- **Time range:** Last 30 days

**Purpose:** Shows trends for all Core Web Vitals over time

#### Chart 2: LCP by Page
**Type:** Bar Chart

**Configuration:**
- **Events:** `lcp` (lowercase event)
- **Y-axis:** Average of `value`
- **Breakdown:** By `page_path`
- **Time range:** Last 7 days
- **Limit:** Top 10 pages

**Purpose:** Identifies pages with slow Largest Contentful Paint

#### Chart 3: Web Vitals Rating Distribution
**Type:** Pie Chart

**Configuration:**
- **Events:** `web_vitals`
- **Filter:** All `metric_rating` values
- **Breakdown:** By `metric_rating` (good, needs-improvement, poor)
- **Time range:** Last 7 days

**Purpose:** Shows percentage of good vs poor performance scores

### Step 3: Long Task Monitoring

#### Chart 4: Long Tasks Over Time
**Type:** Time Series Bar Chart

**Configuration:**
- **Events:** `long_task`
- **Y-axis:** Count of events
- **Secondary Y-axis:** Average of `task_duration`
- **Time range:** Last 24 hours
- **Interval:** Hourly

**Purpose:** Monitors frequency and duration of blocking JavaScript

#### Chart 5: Top Long Task Culprits
**Type:** Table

**Configuration:**
- **Events:** `long_task`
- **Columns:**
  - `page_path`
  - `attribution` (script causing the long task)
  - Average `task_duration`
  - Count
- **Sort:** By average duration (descending)
- **Limit:** Top 20

**Purpose:** Identifies which scripts are causing performance bottlenecks

### Step 4: Navigation Performance

#### Chart 6: Route Change Performance
**Type:** Time Series Line Chart

**Configuration:**
- **Events:** `route_change`
- **Y-axis:** Average of `duration_ms`
- **Breakdown:** By `to_path`
- **Time range:** Last 7 days

**Purpose:** Tracks client-side navigation speed

#### Chart 7: TTI by Page
**Type:** Bar Chart

**Configuration:**
- **Events:** `tti`
- **Y-axis:** Average of `metric_value`
- **Breakdown:** By `page_path`
- **Filter:** Exclude events with `fallback: true` (optional)
- **Time range:** Last 7 days

**Purpose:** Shows which pages become interactive fastest

### Step 5: API Performance Monitoring

#### Chart 8: API Response Times
**Type:** Time Series Line Chart

**Configuration:**
- **Events:** `api_performance`
- **Y-axis:** Average of `api_duration`
- **Breakdown:** By `api_endpoint`
- **Time range:** Last 24 hours

**Purpose:** Monitors API endpoint performance

#### Chart 9: API Success Rate
**Type:** Number with Trend

**Configuration:**
- **Events:** `api_performance`
- **Formula:** `(count where api_success = true) / (total count) * 100`
- **Time range:** Last 7 days
- **Comparison:** Previous period

**Purpose:** Tracks API reliability

#### Chart 10: Failed API Requests
**Type:** Table

**Configuration:**
- **Events:** `api_performance`
- **Filter:** Where `api_success = false`
- **Columns:**
  - `api_endpoint`
  - `api_method`
  - `api_status`
  - Count
- **Sort:** By count (descending)
- **Time range:** Last 24 hours

**Purpose:** Quickly identifies problematic API endpoints

### Step 6: User Journey Performance

#### Chart 11: Custom Journey Times
**Type:** Funnel Chart

**Configuration:**
- **Events:** `user_journey`
- **Breakdown:** By `journey_name`
- **Y-axis:** Average of `journey_duration`
- **Time range:** Last 7 days

**Purpose:** Tracks performance of critical user flows

## Setting Up Alerts

### Alert 1: Poor Core Web Vitals
**Configuration:**
- **Metric:** `web_vitals` event count
- **Filter:** Where `metric_rating = 'poor'`
- **Threshold:** > 100 events per hour
- **Notification:** Slack/Email

**Purpose:** Get notified when performance degrades

### Alert 2: High Long Task Frequency
**Configuration:**
- **Metric:** `long_task` event count
- **Threshold:** > 50 events per hour
- **Notification:** Slack/Email

**Purpose:** Detect JavaScript performance issues

### Alert 3: API Failures
**Configuration:**
- **Metric:** `api_performance` event count
- **Filter:** Where `api_success = false`
- **Threshold:** > 10 events per 15 minutes
- **Notification:** Slack/Email/PagerDuty

**Purpose:** Immediate notification of API issues

## Advanced: Session Recordings Filter

Create a saved filter to watch sessions with poor performance:

**Filter Configuration:**
1. Go to **Session Recordings**
2. Create filter:
   - Event: `web_vitals`
   - Property: `metric_rating = 'poor'`
   - Property: `metric_name = 'LCP'`
3. Save as "Poor LCP Sessions"

**Purpose:** Watch real user sessions experiencing slow load times

## Performance Budget Dashboard

Create a separate dashboard for tracking performance budgets:

### Budget Chart 1: Bundle Size Tracking
**Type:** Number with Trend

**Configuration:**
- Track bundle size from Vercel deployment notifications
- Set budget threshold: 1MB initial JS
- Alert if exceeded

### Budget Chart 2: Lighthouse Scores
**Type:** Time Series Line Chart

**Configuration:**
- Integrate Lighthouse CI results
- Track Performance, Accessibility, Best Practices, SEO scores
- Set minimum thresholds: >90 for all

## Maintenance

### Weekly Reviews
1. Check Core Web Vitals trends
2. Review top 10 long tasks
3. Verify API success rates >99%
4. Monitor TTI by page

### Monthly Analysis
1. Compare month-over-month performance
2. Identify regression patterns
3. Correlate performance with user engagement
4. Update performance budgets if needed

## Resources

- [PostHog Dashboard Documentation](https://posthog.com/docs/product-analytics/dashboards)
- [Web Vitals Documentation](https://web.dev/vitals/)
- [Google Analytics 4 Integration](https://posthog.com/docs/libraries/google-tag-manager)
- [PostHog Alerts](https://posthog.com/docs/product-analytics/alerts)

## Implementation Files Reference

- Core Web Vitals tracking: `src/lib/performanceTracking.ts`
- Analytics initialization: `src/components/Analytics.tsx`
- Route change tracking: `src/components/RouteChangeTracker.tsx`
- API performance wrapper: `src/lib/trackedFetch.ts`

## Quick Start Checklist

- [ ] Create "Core Web Vitals & Performance" dashboard
- [ ] Add all 11 recommended charts
- [ ] Set up 3 performance alerts
- [ ] Create "Poor LCP Sessions" recording filter
- [ ] Schedule weekly performance review
- [ ] Share dashboard with team

---

**Note:** All metrics respect user consent and are only tracked when analytics cookies are accepted. Performance tracking is automatically initialized when consent is granted.
