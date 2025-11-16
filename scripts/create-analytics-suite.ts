#!/usr/bin/env tsx
/**
 * Create Complete PostHog Analytics Suite
 *
 * Creates 5 comprehensive dashboards for complete analytics coverage:
 * - Dashboard 8: User Journey & Path Analysis (10 charts including 3 funnels)
 * - Dashboard 9: Advanced Conversion Funnels (9 charts including 6 funnels)
 * - Dashboard 10: Retention & Returning Visitors (11 charts including funnel)
 * - Dashboard 11: Geographic & Device Intelligence (11 charts including 2 funnels)
 * - Dashboard 12: Traffic Source & Campaign Performance (11 charts including funnel)
 *
 * Usage: npx tsx scripts/create-analytics-suite.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { PostHogAPIClient } from '../src/lib/posthog/api-client';
import { JOURNEY_DASHBOARDS } from '../src/lib/posthog/journey-dashboards';
import { FUNNEL_DASHBOARDS } from '../src/lib/posthog/funnel-dashboards';
import { RETENTION_DASHBOARDS } from '../src/lib/posthog/retention-dashboards';
import { SEGMENTATION_DASHBOARDS } from '../src/lib/posthog/segmentation-dashboards';
import { ATTRIBUTION_DASHBOARDS } from '../src/lib/posthog/attribution-dashboards';
import type { PostHogDashboardConfig } from '../src/lib/posthog/types';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
// Use API host (not ingestion host - no .i.)
const POSTHOG_HOST = 'https://us.posthog.com';

if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_ID) {
  console.error('❌ Missing required environment variables:');
  console.error('   - POSTHOG_PERSONAL_API_KEY');
  console.error('   - POSTHOG_PROJECT_ID');
  console.error('\n   Please add them to .env.local');
  process.exit(1);
}

// Initialize API client
const client = new PostHogAPIClient({
  apiKey: POSTHOG_PERSONAL_API_KEY,
  projectId: POSTHOG_PROJECT_ID,
  host: POSTHOG_HOST,
});

/**
 * Create a single dashboard with all its charts
 */
async function createDashboard(
  dashboardConfig: PostHogDashboardConfig,
  dashboardNumber: number
): Promise<void> {
  console.log(`\n📊 Creating Dashboard ${dashboardNumber}: "${dashboardConfig.name}"`);
  console.log(`   Description: ${dashboardConfig.description}`);
  console.log(`   Charts: ${dashboardConfig.tiles?.length || 0}\n`);

  try {
    // Check if dashboard already exists
    const existingDashboards = await client.getDashboards();
    const existing = existingDashboards.find(
      (d) => d.name === dashboardConfig.name
    );

    if (existing && !existing.deleted) {
      console.log(`⚠️  Dashboard already exists (ID: ${existing.id})`);
      console.log(`   Skipping creation. Delete it first if you want to recreate.\n`);
      console.log(`🔗 View Dashboard:`);
      console.log(`   ${POSTHOG_HOST}/project/${POSTHOG_PROJECT_ID}/dashboard/${existing.id}\n`);
      return;
    }

    // Create the dashboard
    const dashboard = await client.createDashboard({
      name: dashboardConfig.name,
      description: dashboardConfig.description,
      pinned: dashboardConfig.pinned,
      tags: dashboardConfig.tags,
    });

    console.log(`✅ Dashboard created (ID: ${dashboard.id})`);

    // Create each chart/tile
    const tiles = dashboardConfig.tiles || [];
    let successCount = 0;

    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      const chartNum = i + 1;

      try {
        console.log(`   Creating chart ${chartNum}/${tiles.length}: ${tile.name}...`);

        await client.createInsight(
          {
            name: tile.name,
            description: tile.description,
            query: tile.query,
          },
          dashboard.id
        );

        successCount++;
        console.log(`   ✅ Created`);
      } catch (error) {
        console.error(`   ❌ Failed to create chart: ${tile.name}`);
        console.error(`      Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    console.log(`\n   Results: ${successCount}/${tiles.length} charts created successfully`);
    console.log(`\n🔗 View Dashboard:`);
    console.log(`   ${POSTHOG_HOST}/project/${POSTHOG_PROJECT_ID}/dashboard/${dashboard.id}\n`);
  } catch (error) {
    console.error(`\n❌ Failed to create dashboard: ${dashboardConfig.name}`);
    console.error(`   Error: ${error instanceof Error ? error.message : String(error)}\n`);
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   PostHog Complete Analytics Suite Creator                ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📋 Project Configuration:');
  console.log(`   Project ID: ${POSTHOG_PROJECT_ID}`);
  console.log(`   Host: ${POSTHOG_HOST}`);
  console.log(`   Dashboards to create: 5 (Complete Suite)\n`);

  try {
    // Create Dashboard 8: User Journey & Path Analysis
    await createDashboard(JOURNEY_DASHBOARDS.journey, 8);

    // Create Dashboard 9: Advanced Conversion Funnels
    await createDashboard(FUNNEL_DASHBOARDS.funnels, 9);

    // Create Dashboard 10: Retention & Returning Visitors
    await createDashboard(RETENTION_DASHBOARDS.retention, 10);

    // Create Dashboard 11: Geographic & Device Intelligence
    await createDashboard(SEGMENTATION_DASHBOARDS.segmentation, 11);

    // Create Dashboard 12: Traffic Source & Campaign Performance
    await createDashboard(ATTRIBUTION_DASHBOARDS.attribution, 12);

    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║   ✅ Complete Analytics Suite Created Successfully!       ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 Complete Dashboard Suite:');
    console.log('   You now have 12 comprehensive dashboards:\n');

    console.log('   Phase 1 - Autocapture Basics:');
    console.log('   1. Performance & Web Vitals (10 charts) ✅');
    console.log('   2. User Engagement & Sessions (7 charts) ✅\n');

    console.log('   Phase 1 - Custom + Autocapture:');
    console.log('   3. User Frustration & UX Issues (8 charts) ✅');
    console.log('   4. Form Performance & Conversions (10 charts) ✅');
    console.log('   5. Conversion & Revenue Tracking (8 charts) ✅\n');

    console.log('   Phase 2 - Advanced Analytics:');
    console.log('   6. Content Engagement & Behavior (9 charts) ✅');
    console.log('   7. Advanced Performance & Technical (9 charts) ✅\n');

    console.log('   Phase 3 - User Paths & Funnels (NEW):');
    console.log('   8. User Journey & Path Analysis (10 charts, 3 funnels) 🆕');
    console.log('   9. Advanced Conversion Funnels (9 charts, 6 funnels) 🆕');
    console.log('   10. Retention & Returning Visitors (11 charts, 1 funnel) 🆕');
    console.log('   11. Geographic & Device Intelligence (11 charts, 2 funnels) 🆕');
    console.log('   12. Traffic Source & Campaign Performance (11 charts, 1 funnel) 🆕\n');

    console.log('   📈 Total Coverage:');
    console.log('   • 12 dashboards');
    console.log('   • 103+ total charts');
    console.log('   • 20+ conversion funnels');
    console.log('   • Complete user journey mapping');
    console.log('   • Full retention analysis');
    console.log('   • Geographic & device segmentation');
    console.log('   • Marketing attribution tracking\n');

    console.log('📈 What\'s New:');
    console.log('   ✨ User path analysis (entry/exit points, page sequences)');
    console.log('   ✨ 13 new funnels with time-to-convert analysis');
    console.log('   ✨ Multi-session conversion tracking');
    console.log('   ✨ New vs returning visitor insights');
    console.log('   ✨ Mobile vs desktop comparison');
    console.log('   ✨ Geographic distribution (countries/cities)');
    console.log('   ✨ UTM campaign performance tracking');
    console.log('   ✨ Traffic source ROI analysis\n');

    console.log('💡 Next Steps:');
    console.log('   1. Open PostHog and review all 12 dashboards');
    console.log('   2. Set up UTM parameters in your marketing campaigns');
    console.log('   3. Allow 3-7 days for funnel data to accumulate');
    console.log('   4. Review time-to-convert insights to optimize conversion paths');
    console.log('   5. Use retention data to improve user engagement');
    console.log('   6. Analyze geographic data for expansion opportunities\n');

  } catch (error) {
    console.error('\n❌ Dashboard creation failed');
    console.error(error);
    process.exit(1);
  }
}

main();
