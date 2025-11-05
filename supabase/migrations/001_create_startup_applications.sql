-- Create startup_applications table
CREATE TABLE IF NOT EXISTS startup_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  website TEXT NOT NULL,
  email TEXT NOT NULL,
  founding_date TEXT NOT NULL,
  annual_revenue TEXT NOT NULL,
  total_funding TEXT NOT NULL,
  seats_needed TEXT NOT NULL,
  customer_status TEXT NOT NULL,
  current_tools TEXT NOT NULL,
  use_case TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_startup_applications_email ON startup_applications(email);
CREATE INDEX IF NOT EXISTS idx_startup_applications_submitted_at ON startup_applications(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_startup_applications_status ON startup_applications(status);

-- Enable Row Level Security (RLS)
ALTER TABLE startup_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role has full access" ON startup_applications
  FOR ALL
  USING (auth.role() = 'service_role');

-- Optional: Create policy for authenticated users to view (if you build an admin panel later)
CREATE POLICY "Authenticated users can view" ON startup_applications
  FOR SELECT
  USING (auth.role() = 'authenticated');
