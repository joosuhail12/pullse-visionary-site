/**
 * TypeScript definitions for PostHog Dashboard API
 *
 * Used for programmatically creating and managing dashboards via PostHog REST API
 */

export interface PostHogDashboardConfig {
  name: string;
  description?: string;
  pinned?: boolean;
  tags?: string[];
  tiles?: DashboardTile[];
}

export interface DashboardTile {
  name: string;
  description?: string;
  query: InsightQuery;
  layouts?: Record<string, Layout>;
  color?: string;
}

export type InsightQuery = InsightVizNode;

export interface InsightVizNode {
  kind: 'InsightVizNode';
  source: TrendsQueryNode | EventsQueryNode | FunnelsQueryNode;
  version: number;
}

export interface TrendsQueryNode {
  kind: 'TrendsQuery';
  series: Series[];
  breakdownFilter?: BreakdownFilter;
  dateRange?: DateRange;
  interval?: 'hour' | 'day' | 'week' | 'month';
  trendsFilter?: TrendsFilter;
  compareFilter?: CompareFilter;
  filterTestAccounts?: boolean;
  properties?: PropertyFilter[];
  version?: number;
}

export interface EventsQueryNode {
  kind: 'EventsQuery';
  select: string[];
  where?: string[];
  orderBy?: string[];
  limit?: number;
  offset?: number;
  dateRange?: DateRange;
  version?: number;
}

export interface FunnelsQueryNode {
  kind: 'FunnelsQuery';
  series: Series[];
  dateRange?: DateRange;
  funnelsFilter?: FunnelsFilter;
  version?: number;
}

export interface Series {
  kind?: 'EventsNode';
  event: string;
  name?: string;
  math?: MathType;
  math_property?: string;
  math_group_type_index?: number;
  properties?: PropertyFilter[];
  version?: number;
}

export type MathType =
  | 'total'
  | 'dau'
  | 'wau'
  | 'mau'
  | 'unique_session'
  | 'avg'
  | 'sum'
  | 'min'
  | 'max'
  | 'median'
  | 'p90'
  | 'p95'
  | 'p99';

export interface PropertyFilter {
  key: string;
  value: string | string[] | number | boolean | null;
  operator: PropertyOperator;
  type: 'event' | 'person' | 'cohort' | 'element' | 'session' | 'group';
}

export type PropertyOperator =
  | 'exact'
  | 'is_not'
  | 'icontains'
  | 'not_icontains'
  | 'regex'
  | 'not_regex'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'is_set'
  | 'is_not_set';

export interface BreakdownFilter {
  breakdown: string;
  breakdown_type: 'event' | 'person' | 'cohort' | 'group' | 'session' | 'hogql';
  breakdown_limit?: number;
  breakdown_hide_other_aggregation?: boolean;
}

export interface DateRange {
  date_from: string;
  date_to?: string | null;
  explicitDate?: boolean;
}

export interface TrendsFilter {
  display: DisplayType;
  showLegend?: boolean;
  showValuesOnSeries?: boolean;
  showPercentStackView?: boolean;
  smoothingIntervals?: number;
  aggregationAxisFormat?: 'numeric' | 'duration' | 'duration_ms' | 'percentage';
}

export type DisplayType =
  | 'ActionsLineGraph'
  | 'ActionsBar'
  | 'ActionsBarValue'
  | 'ActionsAreaGraph'
  | 'ActionsPie'
  | 'ActionsTable'
  | 'BoldNumber'
  | 'WorldMap';

export interface CompareFilter {
  compare: boolean;
  compare_to?: string;
}

export interface FunnelsFilter {
  funnelVizType?: 'steps' | 'time_to_convert' | 'trends';
  funnelOrderType?: 'ordered' | 'unordered' | 'strict';
}

export interface Layout {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardResponse {
  id: number;
  name: string;
  description: string;
  pinned: boolean;
  created_at: string;
  created_by: UserBasic;
  is_shared: boolean;
  deleted: boolean;
  tiles: TileResponse[];
  filters: Record<string, any>;
  tags: string[];
}

export interface TileResponse {
  id: number;
  insight: InsightResponse;
  layouts: Record<string, Layout>;
  color: string | null;
  last_refresh: string;
  refreshing: boolean;
}

export interface InsightResponse {
  id: number;
  name: string;
  description: string;
  query: InsightQuery;
  created_at: string;
  created_by: UserBasic;
}

export interface UserBasic {
  id: number;
  uuid: string;
  distinct_id: string;
  first_name: string;
  email: string;
}
