# PostHog Analytics - Complete Setup Guide

This guide covers the comprehensive PostHog implementation including session recordings, funnels, cohorts, and A/B testing setup.

## 🎯 Features Implemented

### ✅ Client-Side Tracking
- **Session Recordings** - Watch actual user sessions with privacy controls
- **User Identification** - Anonymous IDs for cross-session tracking
- **Journey Tracking** - UTM parameters, referrer, visit count, landing page
- **Scroll Depth Tracking** - Milestones at 25%, 50%, 75%, 100%
- **Engagement Time Tracking** - Active time on page measurements
- **Video Progress Tracking** - Enhanced component for 25%, 50%, 75%, 100% milestones
- **Autocapture** - All clicks, form interactions automatically tracked

### ✅ Server-Side Tracking
- **Form Submissions** - Backend confirmation of contact-sales, newsletter, startup applications
- **Conversion Events** - generate_lead, newsletter_signup, submit_application
- **Error Tracking** - Failed submissions with error codes
- **Event Correlation** - Frontend/backend event correlation

### ✅ Feature Flags Infrastructure
- React hook: `usePostHogFeatureFlag(flagKey)`
- Variant support: `usePostHogFeatureFlagVariant(flagKey)`
- Multi-flag hook: `usePostHogFeatureFlags([...flagKeys])`

---

## 📊 PostHog Dashboard Configuration

### 1. Create Key Funnels

#### Demo Request Funnel
1. Go to **Insights** → **New Insight** → **Funnel**
2. Add steps:
   - Step 1: `form_view` (form_id = "contact-sales")
   - Step 2: `form_start` (form_id = "contact-sales")
   - Step 3: `form_step` (form_id = "contact-sales", step_number = 1)
   - Step 4: `form_step` (form_id = "contact-sales", step_number = 2)
   - Step 5: `form_step` (form_id = "contact-sales", step_number = 3)
   - Step 6: `form_complete` (form_id = "contact-sales")
3. Set conversion window: **1 hour**
4. Save as: "Demo Request Funnel"

#### Pricing → Demo Conversion Funnel
1. Create new funnel
2. Add steps:
   - Step 1: `pageview` (path = "/pricing")
   - Step 2: `pageview` (path = "/contact-sales")
   - Step 3: `form_complete` (form_id = "contact-sales")
3. Set conversion window: **3 days**
4. Save as: "Pricing to Demo Funnel"

#### Newsletter Signup Funnel
1. Create new funnel
2. Add steps:
   - Step 1: `newsletter_view`
   - Step 2: `newsletter_start`
   - Step 3: `newsletter_complete`
3. Set conversion window: **10 minutes**
4. Save as: "Newsletter Signup Funnel"

#### Video → Action Funnel
1. Create new funnel
2. Add steps:
   - Step 1: `video_view`
   - Step 2: `video_start`
   - Step 3: `video_progress` (video_percent >= 75)
   - Step 4: `cta_click` or `form_start`
3. Set conversion window: **1 hour**
4. Save as: "Video Engagement Funnel"

---

### 2. Create User Cohorts

#### High-Intent Users
1. Go to **People** → **Cohorts** → **New Cohort**
2. Name: "High-Intent Users"
3. Conditions:
   - Has performed `view_pricing` in last 7 days
   - AND has performed `form_start` (form_id = "contact-sales") in last 7 days
4. Save cohort

#### Form Abandoners
1. Create new cohort
2. Name: "Form Abandoners"
3. Conditions:
   - Has performed `form_start` in last 30 days
   - AND has NOT performed `form_complete` in last 30 days
4. Save cohort

#### Video Engagers
1. Create new cohort
2. Name: "Video Engagers"
3. Conditions:
   - Has performed `video_progress` (video_percent >= 50) in last 30 days
4. Save cohort

#### Multi-Visit Users
1. Create new cohort
2. Name: "Multi-Visit Users"
3. Conditions:
   - User property `visit_count` >= 3
4. Save cohort

#### Enterprise Prospects
1. Create new cohort
2. Name: "Enterprise Prospects"
3. Conditions:
   - Has performed `form_submit_success_server` with company_size = "500+" OR company_size = "201-500"
   - OR has UTM parameters with utm_campaign containing "enterprise"
4. Save cohort

---

### 3. Set Up Session Recording Filters

#### Record High-Value Sessions
1. Go to **Session Replay** → **Settings**
2. Create filter: "High-Value Sessions"
3. Conditions:
   - User performed `form_complete` OR
   - User performed `generate_lead` OR
   - User is in cohort "High-Intent Users"
4. Sample rate: **100%** (you have $50k in credits!)

#### Record Form Abandonment Sessions
1. Create filter: "Form Abandonments"
2. Conditions:
   - User performed `form_start`
   - User performed `form_abandon` OR `form_error`
3. Sample rate: **100%**

#### Record Long Engagement Sessions
1. Create filter: "Engaged Users"
2. Conditions:
   - User performed `user_engagement` with engagement_time_seconds >= 60
   - OR scroll_depth >= 75
3. Sample rate: **75%**

---

### 4. Configure A/B Testing

#### Pricing Page Test
1. Go to **Feature Flags** → **New Feature Flag**
2. Name: `pricing-page-variant`
3. Key: `pricing_page_variant`
4. Release conditions:
   - Rollout percentage: **50%** (A/B test)
   - Variants:
     - `control` - 50%
     - `variant-a` - 50%
5. Usage in code:
   ```typescript
   const variant = usePostHogFeatureFlagVariant('pricing_page_variant');

   if (variant === 'variant-a') {
     return <PricingPageVariantA />;
   }
   return <PricingPageControl />;
   ```

#### CTA Copy Test
1. Create new feature flag
2. Name: `cta-copy-test`
3. Key: `cta_copy_test`
4. Variants:
   - `control` - "Request Demo" - 33%
   - `variant-a` - "See How It Works" - 33%
   - `variant-b` - "Get Started Free" - 34%
5. Track with: `button_click` event with button_text property

#### Form Length Test
1. Create new feature flag
2. Name: `contact-form-design`
3. Key: `contact_form_design`
4. Variants:
   - `multi-step` - Current 3-step form - 50%
   - `single-page` - All fields on one page - 50%

---

### 5. Create Custom Dashboards

#### Executive Dashboard
1. Go to **Dashboards** → **New Dashboard**
2. Name: "Executive Dashboard"
3. Add insights:
   - Total conversions (this month)
   - Demo request funnel
   - Pricing → Demo conversion rate
   - Newsletter signups (trend)
   - Session count (trend)
   - Top converting pages

#### Product Dashboard
1. Create new dashboard
2. Name: "Product Analytics"
3. Add insights:
   - User engagement time (average)
   - Scroll depth distribution
   - Video completion rates
   - Feature flag adoption rates
   - Session recording highlights

#### Marketing Dashboard
1. Create new dashboard
2. Name: "Marketing Performance"
3. Add insights:
   - UTM source performance
   - Campaign conversion rates
   - Landing page effectiveness
   - Newsletter growth
   - Referrer analysis

---

## 🔥 Key Events Reference

### Form Events
- `form_view` - Form impression
- `form_start` - First interaction
- `form_step` - Multi-step progression
- `form_field_interaction` - Field interaction
- `form_submit` - Submission attempt (frontend)
- `form_submit_success_server` - Confirmed submission (backend)
- `form_complete` - Successful completion
- `form_abandon` - Abandonment
- `form_error` - Validation/submission errors

### Video Events
- `video_view` - Video load
- `video_start` - Play clicked
- `video_progress` - Milestone (25%, 50%, 75%, 100%)
- `video_complete` - Full watch

### Conversion Events
- `generate_lead` - Demo request (value: $100)
- `newsletter_signup` - Email capture (value: $10)
- `submit_application` - Startup application (value: $150)

### Engagement Events
- `scroll_depth` - Scroll milestones (25%, 50%, 75%, 100%)
- `user_engagement` - Active time tracking
- `button_click` - Generic button clicks
- `cta_click` - High-value CTA clicks
- `navigation_click` - Menu/nav clicks

### Server-Side Events
- `form_submit_success_server` - Backend confirmation
- `form_submit_failed` - Backend errors
- `newsletter_subscribed_server` - Email confirmed
- `application_submitted_server` - Application confirmed

---

## 🎨 User Properties

### Automatically Tracked
- `device_type` - mobile/desktop
- `browser` - User agent string
- `visit_count` - Number of visits
- `referrer` - Traffic source
- `landing_page` - First page visited
- `first_visit` - Boolean flag

### UTM Parameters (when present)
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

---

## 🚀 Advanced Use Cases

### Identify Stuck Users
1. Create insight: Users who viewed form multiple times without submitting
2. Filter: `form_view` count >= 3 AND `form_complete` count = 0
3. Watch session recordings to identify UX issues

### Optimize Video Content
1. Create insight: Video completion rate by video_title
2. Correlation: Videos that drive the most `cta_click` events
3. Double down on high-performing content

### A/B Test Analysis
1. For each feature flag variant
2. Track conversion funnel completion rate
3. Measure statistical significance
4. Roll out winning variant to 100%

### Cohort-Based Campaigns
1. Export "High-Intent Users" cohort
2. Create targeted marketing campaigns
3. Track conversion lift vs. control group

---

## 📈 Recommended Alerts

### Drop in Conversions
1. **Insights** → **Alerts**
2. Create alert:
   - Metric: `form_complete` count
   - Threshold: Drops below 80% of 7-day average
   - Notification: Email + Slack

### Form Error Spike
1. Create alert:
   - Metric: `form_error` count
   - Threshold: Exceeds 10 events per hour
   - Check session recordings immediately

### Engagement Drop
1. Create alert:
   - Metric: `user_engagement` average time
   - Threshold: Drops below 30 seconds
   - May indicate performance issues

---

## 🔐 Privacy & Compliance

### Session Recording Privacy
- ✅ All input fields are masked by default
- ✅ Elements with `data-private` attribute are masked
- ✅ Cross-origin iframes not recorded
- ✅ User consent required (pullse_cookie_consent)

### GDPR Compliance
- User can opt-out via cookie consent banner
- PostHog respects opt-out immediately
- No tracking before consent granted
- Data retention configurable in PostHog settings

---

## 📚 Next Steps

1. **Watch First Sessions** - Review session recordings to validate setup
2. **Verify Events** - Check Live Events tab for incoming data
3. **Create Alerts** - Set up critical monitoring
4. **Share Dashboards** - Give team access to insights
5. **Run First A/B Test** - Start with simple CTA test
6. **Analyze Funnels** - Identify drop-off points
7. **Iterate** - Use insights to improve conversions

---

## 🆘 Troubleshooting

### Events Not Showing
- Check browser console for PostHog errors
- Verify cookie consent is granted
- Check PostHog dashboard Live Events tab
- Verify environment variables are set

### Session Recordings Not Working
- Confirm `session_recording` config is set correctly
- Check consent is granted
- Verify PostHog API key is valid
- Review PostHog project settings

### Server-Side Events Missing
- Check API route logs for PostHog errors
- Verify `NEXT_PUBLIC_POSTHOG_KEY` env var exists
- Confirm `flushServerEvents()` is called
- Check PostHog dashboard for server events

---

## 📞 Support

- PostHog Docs: https://posthog.com/docs
- PostHog Community: https://posthog.com/community
- Project Repository: See README.md

---

**Last Updated:** 2025-11-15
**PostHog Version:** posthog-js 1.293.0, posthog-node latest
