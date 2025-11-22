/**
 * Script to apply newsletter migration
 * Adds first_name and last_name columns to newsletter_subscribers table
 *
 * Usage: npx tsx scripts/apply-newsletter-migration.ts
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  console.log('🔄 Applying newsletter migration...\n');

  // Check if columns already exist
  const { error: checkError } = await supabase
    .from('newsletter_subscribers')
    .select('first_name, last_name')
    .limit(1);

  if (!checkError) {
    console.log('✅ Columns first_name and last_name already exist!');
    console.log('   Migration has been applied previously.\n');
    return;
  }

  if (checkError && !checkError.message.includes('does not exist')) {
    console.error('❌ Error checking existing columns:', checkError);
    process.exit(1);
  }

  console.log('📋 Migration needs to be applied manually.');
  console.log('   Please run this SQL in your Supabase Dashboard SQL Editor:\n');
  console.log('   https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new\n');
  console.log('─'.repeat(70));
  console.log(`
-- Add first_name and last_name columns to newsletter_subscribers table
ALTER TABLE newsletter_subscribers
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add comments
COMMENT ON COLUMN newsletter_subscribers.first_name IS 'Optional: Subscriber first name';
COMMENT ON COLUMN newsletter_subscribers.last_name IS 'Optional: Subscriber last name';
  `.trim());
  console.log('─'.repeat(70));
  console.log('\n💡 After running the SQL, test the newsletter form again.\n');
}

applyMigration().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
