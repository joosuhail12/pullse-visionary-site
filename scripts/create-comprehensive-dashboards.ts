#!/usr/bin/env tsx
/**
 * Create Comprehensive PostHog Dashboards
 *
 * Creates Phase 1 dashboards using both autocaptured and custom events:
 * - Dashboard 3: User Frustration & UX Issues (8 charts)
 * - Dashboard 4: Form Performance & Conversions (10 charts)
 * - Dashboard 5: Conversion & Revenue Tracking (8 charts)
 *
 * Usage: npx tsx scripts/create-comprehensive-dashboards.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { PostHogAPIClient } from '../src/lib/posthog/api-client';
import { COMPREHENSIVE_DASHBOARDS } from '../src/lib/posthog/comprehensive-dashboards';
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
    const existing = existingDashboards.results?.find(
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
  console.log('║   PostHog Comprehensive Dashboards Creator                ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📋 Project Configuration:');
  console.log(`   Project ID: ${POSTHOG_PROJECT_ID}`);
  console.log(`   Host: ${POSTHOG_HOST}`);
  console.log(`   Dashboards to create: 3 (Phase 1)\n`);

  try {
    // Create Dashboard 3: User Frustration & UX Issues
    await createDashboard(COMPREHENSIVE_DASHBOARDS.frustration, 3);

    // Create Dashboard 4: Form Performance & Conversions
    await createDashboard(COMPREHENSIVE_DASHBOARDS.forms, 4);

    // Create Dashboard 5: Conversion & Revenue Tracking
    await createDashboard(COMPREHENSIVE_DASHBOARDS.conversion, 5);

    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║   ✅ All Dashboards Created Successfully!                  ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 Next Steps:');
    console.log('   1. Open your PostHog project');
    console.log('   2. Navigate to "Dashboards" in the sidebar');
    console.log('   3. You should now see 5 total dashboards:');
    console.log('      • Performance & Web Vitals (10 charts) ✅');
    console.log('      • User Engagement & Sessions (7 charts) ✅');
    console.log('      • User Frustration & UX Issues (8 charts) 🆕');
    console.log('      • Form Performance & Conversions (10 charts) 🆕');
    console.log('      • Conversion & Revenue Tracking (8 charts) 🆕');
    console.log('   4. Data status:');
    console.log('      - Frustration data: Needs 3-7 days for patterns');
    console.log('      - Form data: Already tracking (startup application)');
    console.log('      - Conversion data: Already tracking (Cal.com bookings)');
    console.log('\n💡 Tip: Some dashboards may show low data initially.');
    console.log('   Check back in 3-7 days for comprehensive insights!\n');
  } catch (error) {
    console.error('\n❌ Dashboard creation failed');
    console.error(error);
    process.exit(1);
  }
}

main();
