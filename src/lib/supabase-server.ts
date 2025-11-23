import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client with service role key
// This bypasses Row Level Security and should ONLY be used in API routes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Helper function to get Supabase client
// This will throw at runtime if env vars are missing, not at build time
export const getSupabaseServer = () => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env.local file.'
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Legacy export for backwards compatibility (will throw at runtime if env vars missing)
export const supabaseServer = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null as any;

// Type definitions for startup applications
export interface StartupApplication {
  id?: string;
  company_name: string;
  website: string;
  email: string;
  founding_date: string;
  annual_revenue: string;
  total_funding: string;
  seats_needed: string;
  customer_status: string;
  current_tools: string;
  use_case: string;
   utm_source?: string | null;
   utm_medium?: string | null;
   utm_campaign?: string | null;
   utm_term?: string | null;
   utm_content?: string | null;
   referrer?: string | null;
   landing_page?: string | null;
   form_path?: string | null;
  status?: string;
  submitted_at?: string;
  created_at?: string;
}
