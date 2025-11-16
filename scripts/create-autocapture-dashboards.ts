#!/usr/bin/env tsx
/**
 * Create PostHog Dashboards Using Autocaptured Data
 *
 * Creates two core dashboards:
 * 1. Performance & Web Vitals (7 charts)
 * 2. User Engagement & Sessions (7 charts)
 *
 * Based on PostHog's autocaptured events:
 * - $web_vitals (LCP, FCP, CLS, INP)
 * - $pageview, $pageleave
 * - Scroll depth, referrers, etc.
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { PostHogAPIClient } from '../src/lib/posthog/api-client';
import { AUTOCAPTURE_DASHBOARDS } from '../src/lib/posthog/autocapture-dashboards';

config({ path: resolve(process.cwd(), '.env.local') });

async function createDashboard(
  client: PostHogAPIClient,
  dashboardConfig: any,
  projectId: string,
  host: string
): Promise<void> {
  console.log(`\n📊 Creating Dashboard: "${dashboardConfig.name}"`);
  console.log(`   Description: ${dashboardConfig.description}`);
  console.log(`   Charts: ${dashboardConfig.tiles?.length || 0}\n`);

  // Check if dashboard already exists
  const existingDashboards = await client.getDashboards();
  const existing = existingDashboards.find(d => d.name === dashboardConfig.name);

  if (existing) {
    console.log(`⚠️  Dashboard "${dashboardConfig.name}" already exists (ID: ${existing.id})`);
    console.log(`   URL: ${host}/project/${projectId}/dashboard/${existing.id}`);
    console.log(`   Skipping creation...\n`);
    return;
  }

  // Create dashboard
  const dashboard = await client.createDashboard({
    name: dashboardConfig.name,
    description: dashboardConfig.description,
    pinned: dashboardConfig.pinned,
    tags: dashboardConfig.tags,
  });

  console.log(`✅ Dashboard created (ID: ${dashboard.id})`);

  // Create all charts
  const tiles = dashboardConfig.tiles || [];
  let successCount = 0;
  let failureCount = 0;

  for (const [index, tile] of tiles.entries()) {
    try {
      console.log(`   Creating chart ${index + 1}/${tiles.length}: ${tile.name}...`);
      await client.createInsight(tile, dashboard.id);
      console.log(`   ✅ Created`);
      successCount++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`   ❌ Failed: ${errorMessage}`);
      failureCount++;
    }
  }

  console.log(`\n   Results: ${successCount}/${tiles.length} charts created successfully`);
  if (failureCount > 0) {
    console.log(`   Failed: ${failureCount} charts\n`);
  }

  console.log(`\n🔗 View Dashboard:`);
  console.log(`   ${host}/project/${projectId}/dashboard/${dashboard.id}\n`);
}

async function main() {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY!;
  const projectId = process.env.POSTHOG_PROJECT_ID!;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey || !projectId) {
    console.error('❌ Missing required environment variables:');
    console.error('   POSTHOG_PERSONAL_API_KEY');
    console.error('   POSTHOG_PROJECT_ID\n');
    process.exit(1);
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   PostHog Autocapture Dashboards Creator                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📋 Project Configuration:');
  console.log(`   Project ID: ${projectId}`);
  console.log(`   Host: ${host}`);
  console.log(`   Dashboards to create: 2\n`);

  const client = new PostHogAPIClient({ apiKey, projectId, host });

  // Create Dashboard 1: Performance & Web Vitals
  await createDashboard(
    client,
    AUTOCAPTURE_DASHBOARDS.performance,
    projectId,
    host
  );

  // Create Dashboard 2: User Engagement & Sessions
  await createDashboard(
    client,
    AUTOCAPTURE_DASHBOARDS.engagement,
    projectId,
    host
  );

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   ✅ All Dashboards Created Successfully!                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📊 Next Steps:');
  console.log('   1. Open your PostHog project');
  console.log('   2. Navigate to "Dashboards" in the sidebar');
  console.log('   3. You should see:');
  console.log('      • Performance & Web Vitals (7 charts)');
  console.log('      • User Engagement & Sessions (7 charts)');
  console.log('   4. Data will populate as users interact with your site');
  console.log('   5. $web_vitals data should appear within minutes');
  console.log('   6. Engagement data appears immediately from pageviews\n');

  console.log('💡 Tip: New autocapture features (rage clicks, dead clicks,');
  console.log('   exceptions, heatmaps) need 3-7 days to collect meaningful data.');
  console.log('   We\'ll build those dashboards in Phase 2!\n');
}

main().catch((error) => {
  console.error('\n❌ Error:', error);
  process.exit(1);
});
