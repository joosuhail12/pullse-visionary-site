-- Add first_name and last_name columns to newsletter_subscribers table
ALTER TABLE newsletter_subscribers
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT;

-- Add comment to explain the new columns
COMMENT ON COLUMN newsletter_subscribers.first_name IS 'Optional: Subscriber first name';
COMMENT ON COLUMN newsletter_subscribers.last_name IS 'Optional: Subscriber last name';
