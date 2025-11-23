-- Add marketing attribution fields to startup applications
ALTER TABLE startup_applications
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS landing_page TEXT,
  ADD COLUMN IF NOT EXISTS form_path TEXT;

CREATE INDEX IF NOT EXISTS idx_startup_applications_utm_source ON startup_applications(utm_source);
CREATE INDEX IF NOT EXISTS idx_startup_applications_utm_campaign ON startup_applications(utm_campaign);

-- Add marketing attribution fields to newsletter subscribers
ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS landing_page TEXT,
  ADD COLUMN IF NOT EXISTS form_path TEXT;

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_utm_source ON newsletter_subscribers(utm_source);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_utm_campaign ON newsletter_subscribers(utm_campaign);
