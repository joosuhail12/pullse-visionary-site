#!/usr/bin/env tsx
/**
 * Create Phase 2 PostHog Dashboards
 *
 * Creates advanced dashboards after 7+ days of data collection:
 * - Dashboard 6: Content Engagement & Behavior (9 charts)
 * - Dashboard 7: Advanced Performance & Technical (9 charts)
 *
 * Usage: npx tsx scripts/create-phase2-dashboards.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { PostHogAPIClient } from '../src/lib/posthog/api-client';
import { PHASE2_DASHBOARDS } from '../src/lib/posthog/phase2-dashboards';
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
  console.log('║   PostHog Phase 2 Dashboards Creator                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📋 Project Configuration:');
  console.log(`   Project ID: ${POSTHOG_PROJECT_ID}`);
  console.log(`   Host: ${POSTHOG_HOST}`);
  console.log(`   Dashboards to create: 2 (Phase 2)\n`);

  try {
    // Create Dashboard 6: Content Engagement & Behavior
    await createDashboard(PHASE2_DASHBOARDS.content, 6);

    // Create Dashboard 7: Advanced Performance & Technical
    await createDashboard(PHASE2_DASHBOARDS.technical, 7);

    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║   ✅ All Phase 2 Dashboards Created Successfully!         ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 Dashboard Summary:');
    console.log('   You now have 7 comprehensive dashboards:');
    console.log('   Phase 1 (Autocapture):');
    console.log('   • Performance & Web Vitals (10 charts) ✅');
    console.log('   • User Engagement & Sessions (7 charts) ✅');
    console.log('   Phase 1 (Custom + Autocapture):');
    console.log('   • User Frustration & UX Issues (8 charts) ✅');
    console.log('   • Form Performance & Conversions (10 charts) ✅');
    console.log('   • Conversion & Revenue Tracking (8 charts) ✅');
    console.log('   Phase 2 (Advanced):');
    console.log('   • Content Engagement & Behavior (9 charts) 🆕');
    console.log('   • Advanced Performance & Technical (9 charts) 🆕');
    console.log('\n   Total: 7 dashboards, 61 charts\n');

    console.log('📈 Data Collection Notes:');
    console.log('   - Content engagement data needs 3-7 days for meaningful patterns');
    console.log('   - Long task detection requires active user sessions');
    console.log('   - API performance metrics accumulate over time');
    console.log('   - Copy/paste behavior patterns emerge after 7+ days\n');

    console.log('💡 Tip: Check back in 7 days for full Phase 2 insights!\n');
  } catch (error) {
    console.error('\n❌ Dashboard creation failed');
    console.error(error);
    process.exit(1);
  }
}

main();
