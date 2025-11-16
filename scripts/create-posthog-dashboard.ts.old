#!/usr/bin/env tsx
/**
 * PostHog Performance Dashboard Creator - CLI Tool
 *
 * Interactive command-line tool to create the Core Web Vitals dashboard in PostHog
 *
 * Usage:
 *   npm run posthog:create-dashboard
 *   # or
 *   npx tsx scripts/create-posthog-dashboard.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import * as readline from 'readline';
import { createPerformanceDashboard } from '../src/lib/posthog/dashboard-creator';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   PostHog Performance Dashboard Creator                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Check environment variables
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey || !projectId) {
    console.error('❌ Missing required environment variables:\n');
    if (!apiKey) {
      console.error('  POSTHOG_PERSONAL_API_KEY - Personal API key from PostHog');
      console.error('  Get it at: https://app.posthog.com/settings/user-api-keys\n');
    }
    if (!projectId) {
      console.error('  POSTHOG_PROJECT_ID - Your PostHog project ID');
      console.error('  Find it in your PostHog URL: https://app.posthog.com/project/YOUR_PROJECT_ID\n');
    }
    console.error('Add these variables to your .env.local file and try again.');
    process.exit(1);
  }

  console.log('✓ Environment variables loaded');
  console.log(`  Project ID: ${projectId}`);
  console.log(`  Host: ${host}\n`);

  // Ask about dry run
  const dryRunAnswer = await question('Perform dry run first to preview configuration? (Y/n): ');
  const dryRun = dryRunAnswer.toLowerCase() !== 'n';

  if (dryRun) {
    console.log('\n─────────────────────────────────────────────────────────────');
    console.log('Running in DRY RUN mode - no changes will be made');
    console.log('─────────────────────────────────────────────────────────────\n');
  }

  rl.close();

  // Create dashboard
  const result = await createPerformanceDashboard({
    apiKey,
    projectId,
    host,
    dryRun,
    skipExisting: true,
    onProgress: (message: string) => {
      console.log(message);
    },
  });

  if (!result.success) {
    console.error(`\n❌ Failed to create dashboard: ${result.error}`);
    process.exit(1);
  }

  if (result.existingDashboard) {
    console.log('\nThe dashboard already exists. No changes were made.');
    console.log('To update the existing dashboard, you can:');
    console.log('  1. Delete it manually in PostHog UI and run this script again');
    console.log('  2. Use the updateDashboard() function programmatically\n');
  }

  if (dryRun) {
    console.log('\n─────────────────────────────────────────────────────────────');
    console.log('Dry run complete. To create the actual dashboard,');
    console.log('run this command again and answer "n" to the dry run prompt.');
    console.log('─────────────────────────────────────────────────────────────\n');
  } else if (result.dashboardUrl && !result.existingDashboard) {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║   Dashboard Successfully Created!                          ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log(`View your dashboard at:\n${result.dashboardUrl}\n`);
    console.log('The dashboard includes:');
    console.log('  • Core Web Vitals tracking (LCP, FCP, INP, CLS, TTFB, TTI)');
    console.log('  • Long Task monitoring');
    console.log('  • Route change performance');
    console.log('  • API performance metrics');
    console.log('  • Custom user journey tracking\n');
  }
}

main().catch((error) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
