-- Create contact_sales_requests table
CREATE TABLE IF NOT EXISTS contact_sales_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  company_size TEXT NOT NULL,
  industry TEXT NOT NULL,
  timeline TEXT NOT NULL,
  phone TEXT,
  current_solution TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_contact_sales_email ON contact_sales_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_sales_submitted_at ON contact_sales_requests(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_sales_status ON contact_sales_requests(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_sales_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role has full access" ON contact_sales_requests
  FOR ALL
  USING (auth.role() = 'service_role');

-- Optional: Create policy for authenticated users to view (if you build an admin panel later)
CREATE POLICY "Authenticated users can view" ON contact_sales_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');
