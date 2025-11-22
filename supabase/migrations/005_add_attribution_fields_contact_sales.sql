-- Add marketing attribution fields to contact_sales_requests
ALTER TABLE contact_sales_requests
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS landing_page TEXT,
  ADD COLUMN IF NOT EXISTS form_path TEXT;

-- Helpful indexes for attribution queries
CREATE INDEX IF NOT EXISTS idx_contact_sales_utm_source ON contact_sales_requests(utm_source);
CREATE INDEX IF NOT EXISTS idx_contact_sales_utm_campaign ON contact_sales_requests(utm_campaign);
