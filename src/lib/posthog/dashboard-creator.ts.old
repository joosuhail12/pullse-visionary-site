/**
 * PostHog Dashboard Creator
 *
 * Reusable utility for creating and managing PostHog dashboards programmatically
 */

import { PostHogAPIClient } from './api-client';
import { PERFORMANCE_DASHBOARD_CONFIG } from './dashboard-config';
import type { PostHogDashboardConfig, DashboardTile } from './types';

export interface CreateDashboardOptions {
  apiKey: string;
  projectId: string;
  host?: string;
  dryRun?: boolean;
  skipExisting?: boolean;
  onProgress?: (message: string) => void;
}

export interface DashboardResult {
  success: boolean;
  dashboardId?: number;
  dashboardUrl?: string;
  error?: string;
  existingDashboard?: boolean;
}

/**
 * Create the Performance Dashboard with all 11 charts
 *
 * @param options - Configuration options
 * @returns Result object with dashboard ID or error
 */
export async function createPerformanceDashboard(
  options: CreateDashboardOptions
): Promise<DashboardResult> {
  const {
    apiKey,
    projectId,
    host = 'https://us.i.posthog.com',
    dryRun = false,
    skipExisting = true,
    onProgress = console.log,
  } = options;

  try {
    const client = new PostHogAPIClient({ apiKey, projectId, host });

    // Check if dashboard already exists
    if (skipExisting) {
      onProgress('Checking for existing dashboards...');
      const existingDashboards = await client.getDashboards();
      const existingDashboard = existingDashboards.find(
        (d) => d.name === PERFORMANCE_DASHBOARD_CONFIG.name
      );

      if (existingDashboard) {
        const url = `${host}/project/${projectId}/dashboard/${existingDashboard.id}`;
        onProgress(
          `✓ Dashboard "${PERFORMANCE_DASHBOARD_CONFIG.name}" already exists (ID: ${existingDashboard.id})`
        );
        onProgress(`  URL: ${url}`);
        return {
          success: true,
          dashboardId: existingDashboard.id,
          dashboardUrl: url,
          existingDashboard: true,
        };
      }
    }

    // Dry run mode
    if (dryRun) {
      onProgress('\n=== DRY RUN MODE ===');
      onProgress(
        `Would create dashboard: "${PERFORMANCE_DASHBOARD_CONFIG.name}"`
      );
      onProgress(
        `Description: ${PERFORMANCE_DASHBOARD_CONFIG.description || 'N/A'}`
      );
      onProgress(
        `Number of charts: ${PERFORMANCE_DASHBOARD_CONFIG.tiles?.length || 0}`
      );

      if (PERFORMANCE_DASHBOARD_CONFIG.tiles) {
        onProgress('\nCharts to be created:');
        PERFORMANCE_DASHBOARD_CONFIG.tiles.forEach((tile, index) => {
          onProgress(`  ${index + 1}. ${tile.name}`);
          if (tile.description) {
            onProgress(`     ${tile.description}`);
          }
        });
      }

      onProgress('\n=== END DRY RUN ===');
      return { success: true };
    }

    // Create dashboard
    onProgress(
      `Creating dashboard: "${PERFORMANCE_DASHBOARD_CONFIG.name}"...`
    );
    const dashboard = await client.createDashboard({
      name: PERFORMANCE_DASHBOARD_CONFIG.name,
      description: PERFORMANCE_DASHBOARD_CONFIG.description,
      pinned: PERFORMANCE_DASHBOARD_CONFIG.pinned,
      tags: PERFORMANCE_DASHBOARD_CONFIG.tags,
    });

    onProgress(`✓ Dashboard created (ID: ${dashboard.id})\n`);

    // Create all charts
    const tiles = PERFORMANCE_DASHBOARD_CONFIG.tiles || [];
    const totalTiles = tiles.length;

    for (const [index, tile] of tiles.entries()) {
      const chartNumber = index + 1;
      onProgress(
        `Creating chart ${chartNumber}/${totalTiles}: ${tile.name}...`
      );

      try {
        await client.createInsight(tile, dashboard.id);
        onProgress(`  ✓ Created`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        onProgress(`  ✗ Failed: ${errorMessage}`);
        // Continue with other charts even if one fails
      }
    }

    const dashboardUrl = `${host}/project/${projectId}/dashboard/${dashboard.id}`;
    onProgress(`\n✅ Dashboard creation complete!`);
    onProgress(`Dashboard URL: ${dashboardUrl}`);

    return {
      success: true,
      dashboardId: dashboard.id,
      dashboardUrl,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    onProgress(`\n❌ Error: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Update an existing dashboard with new configuration
 *
 * @param dashboardId - ID of the dashboard to update
 * @param options - Configuration options
 * @returns Result object with success status
 */
export async function updateDashboard(
  dashboardId: number,
  options: CreateDashboardOptions
): Promise<DashboardResult> {
  const {
    apiKey,
    projectId,
    host = 'https://us.i.posthog.com',
    onProgress = console.log,
  } = options;

  try {
    const client = new PostHogAPIClient({ apiKey, projectId, host });

    onProgress(`Updating dashboard ${dashboardId}...`);
    await client.updateDashboard(dashboardId, {
      name: PERFORMANCE_DASHBOARD_CONFIG.name,
      description: PERFORMANCE_DASHBOARD_CONFIG.description,
      pinned: PERFORMANCE_DASHBOARD_CONFIG.pinned,
      tags: PERFORMANCE_DASHBOARD_CONFIG.tags,
    });

    onProgress(`✓ Dashboard updated`);

    const dashboardUrl = `${host}/project/${projectId}/dashboard/${dashboardId}`;
    return {
      success: true,
      dashboardId,
      dashboardUrl,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Delete a dashboard
 *
 * @param dashboardId - ID of the dashboard to delete
 * @param options - Configuration options
 * @returns Result object with success status
 */
export async function deleteDashboard(
  dashboardId: number,
  options: CreateDashboardOptions
): Promise<DashboardResult> {
  const {
    apiKey,
    projectId,
    host = 'https://us.i.posthog.com',
    onProgress = console.log,
  } = options;

  try {
    const client = new PostHogAPIClient({ apiKey, projectId, host });

    onProgress(`Deleting dashboard ${dashboardId}...`);
    await client.deleteDashboard(dashboardId);

    onProgress(`✓ Dashboard deleted`);

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Create a custom dashboard with provided configuration
 *
 * @param config - Dashboard configuration
 * @param options - Creation options
 * @returns Result object with dashboard ID or error
 */
export async function createCustomDashboard(
  config: PostHogDashboardConfig,
  options: CreateDashboardOptions
): Promise<DashboardResult> {
  const {
    apiKey,
    projectId,
    host = 'https://us.i.posthog.com',
    dryRun = false,
    onProgress = console.log,
  } = options;

  try {
    const client = new PostHogAPIClient({ apiKey, projectId, host });

    if (dryRun) {
      onProgress('\n=== DRY RUN MODE ===');
      onProgress(`Would create dashboard: "${config.name}"`);
      onProgress(`Number of charts: ${config.tiles?.length || 0}`);
      onProgress('=== END DRY RUN ===\n');
      return { success: true };
    }

    onProgress(`Creating dashboard: "${config.name}"...`);
    const dashboard = await client.createDashboard({
      name: config.name,
      description: config.description,
      pinned: config.pinned,
      tags: config.tags,
    });

    onProgress(`✓ Dashboard created (ID: ${dashboard.id})`);

    if (config.tiles) {
      for (const [index, tile] of config.tiles.entries()) {
        onProgress(`Creating chart ${index + 1}/${config.tiles.length}: ${tile.name}...`);
        await client.createInsight(tile, dashboard.id);
        onProgress(`  ✓ Created`);
      }
    }

    const dashboardUrl = `${host}/project/${projectId}/dashboard/${dashboard.id}`;
    onProgress(`\n✅ Dashboard creation complete!`);
    onProgress(`Dashboard URL: ${dashboardUrl}`);

    return {
      success: true,
      dashboardId: dashboard.id,
      dashboardUrl,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
