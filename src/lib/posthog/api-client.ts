/**
 * PostHog API Client
 *
 * REST API wrapper for PostHog dashboard and insight management
 */

import type {
  PostHogDashboardConfig,
  DashboardTile,
  DashboardResponse,
  InsightResponse,
} from './types';

export interface PostHogClientConfig {
  apiKey: string;
  projectId: string;
  host?: string;
}

export class PostHogAPIClient {
  private apiKey: string;
  private projectId: string;
  private host: string;

  constructor(config: PostHogClientConfig) {
    this.apiKey = config.apiKey;
    this.projectId = config.projectId;
    this.host = config.host || 'https://us.i.posthog.com';
  }

  /**
   * Make authenticated API request to PostHog
   */
  private async fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.host}${endpoint}`;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[PostHog API] ${options.method || 'GET'} ${endpoint}`);
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorMessage: string;
      try {
        const errorData = await response.json();
        errorMessage = JSON.stringify(errorData, null, 2);
      } catch {
        errorMessage = response.statusText || `HTTP ${response.status}`;
      }

      throw new Error(
        `PostHog API Error (${response.status}): ${errorMessage}`
      );
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    // For DELETE requests or empty responses
    return {} as T;
  }

  /**
   * Create a new dashboard
   */
  async createDashboard(
    config: Omit<PostHogDashboardConfig, 'tiles'>
  ): Promise<DashboardResponse> {
    return this.fetchAPI<DashboardResponse>(
      `/api/projects/${this.projectId}/dashboards/`,
      {
        method: 'POST',
        body: JSON.stringify(config),
      }
    );
  }

  /**
   * Get all dashboards for the project
   */
  async getDashboards(): Promise<DashboardResponse[]> {
    const response = await this.fetchAPI<{ results: DashboardResponse[] }>(
      `/api/projects/${this.projectId}/dashboards/`
    );
    return response.results || [];
  }

  /**
   * Get a specific dashboard by ID
   */
  async getDashboard(dashboardId: number): Promise<DashboardResponse> {
    return this.fetchAPI<DashboardResponse>(
      `/api/projects/${this.projectId}/dashboards/${dashboardId}/`
    );
  }

  /**
   * Update an existing dashboard
   */
  async updateDashboard(
    dashboardId: number,
    config: Partial<PostHogDashboardConfig>
  ): Promise<DashboardResponse> {
    return this.fetchAPI<DashboardResponse>(
      `/api/projects/${this.projectId}/dashboards/${dashboardId}/`,
      {
        method: 'PATCH',
        body: JSON.stringify(config),
      }
    );
  }

  /**
   * Delete a dashboard
   */
  async deleteDashboard(dashboardId: number): Promise<void> {
    await this.fetchAPI(
      `/api/projects/${this.projectId}/dashboards/${dashboardId}/`,
      {
        method: 'DELETE',
      }
    );
  }

  /**
   * Create an insight and add it to a dashboard
   */
  async createInsight(
    tile: DashboardTile,
    dashboardId: number
  ): Promise<InsightResponse> {
    return this.fetchAPI<InsightResponse>(
      `/api/projects/${this.projectId}/insights/`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: tile.name,
          description: tile.description,
          query: tile.query,
          dashboards: [dashboardId],
        }),
      }
    );
  }

  /**
   * Get all insights for the project
   */
  async getInsights(): Promise<InsightResponse[]> {
    const response = await this.fetchAPI<{ results: InsightResponse[] }>(
      `/api/projects/${this.projectId}/insights/`
    );
    return response.results || [];
  }

  /**
   * Update an existing insight
   */
  async updateInsight(
    insightId: number,
    config: Partial<DashboardTile>
  ): Promise<InsightResponse> {
    return this.fetchAPI<InsightResponse>(
      `/api/projects/${this.projectId}/insights/${insightId}/`,
      {
        method: 'PATCH',
        body: JSON.stringify(config),
      }
    );
  }

  /**
   * Delete an insight
   */
  async deleteInsight(insightId: number): Promise<void> {
    await this.fetchAPI(
      `/api/projects/${this.projectId}/insights/${insightId}/`,
      {
        method: 'DELETE',
      }
    );
  }
}
