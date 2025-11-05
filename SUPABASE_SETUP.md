# Supabase Setup Guide

This guide will help you set up Supabase for storing startup application leads.

## Prerequisites

- A Supabase account (sign up at https://supabase.com if you don't have one)
- Access to your Supabase project

## Setup Steps

### 1. Get Your Supabase Credentials

1. Go to https://app.supabase.com
2. Select your project (or create a new one)
3. Navigate to **Settings** > **API**
4. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Service Role Key** (under "Project API keys" - this is the secret key, NOT the anon key)

### 2. Create Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important**:
- Replace `your_supabase_project_url` with your actual Project URL
- Replace `your_supabase_service_role_key` with your actual Service Role Key
- The `.env.local` file is gitignored and will NOT be committed

### 3. Run the Database Migration

1. Open the Supabase Dashboard: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `supabase/migrations/001_create_startup_applications.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the migration

This will create:
- The `startup_applications` table with all necessary columns
- Indexes for efficient querying
- Row Level Security (RLS) policies

### 4. Verify the Table

1. In Supabase Dashboard, go to **Table Editor**
2. You should see the `startup_applications` table
3. Click on it to see the schema

### 5. Test the Implementation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the startup application page (e.g., `/startup-program`)

3. Fill out and submit the form

4. Check Supabase Table Editor to see if the data was inserted

### 6. View Submissions (Admin)

You have two options to view form submissions:

**Option A: Supabase Dashboard**
- Go to **Table Editor** in Supabase
- Select `startup_applications` table
- View all submissions with filters and sorting

**Option B: API Endpoint**
- Make a GET request to `/api/startup-application`
- Returns the last 100 applications in JSON format
- You can build a simple admin page later if needed

## Table Schema

The `startup_applications` table includes:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `company_name` | TEXT | Company name |
| `website` | TEXT | Company website URL |
| `email` | TEXT | Contact email |
| `founding_date` | TEXT | Company founding date |
| `annual_revenue` | TEXT | ARR range |
| `total_funding` | TEXT | Total funding range |
| `seats_needed` | TEXT | Number of seats requested |
| `customer_status` | TEXT | new or trial |
| `current_tools` | TEXT | Current support tools (optional) |
| `use_case` | TEXT | Primary use case (optional) |
| `status` | TEXT | Application status (default: pending) |
| `submitted_at` | TIMESTAMP | Submission timestamp |
| `created_at` | TIMESTAMP | Record creation timestamp |

## Security Notes

- The **Service Role Key** bypasses Row Level Security and has full access
- It's stored in `.env.local` and only used server-side in API routes
- The frontend NEVER directly accesses the database
- All requests go through `/api/startup-application` which validates and sanitizes input

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` exists in the project root
- Verify the variable names match exactly (including `NEXT_PUBLIC_` prefix for URL)
- Restart your dev server after adding env variables

### Error: "Failed to submit application"
- Check the browser console for detailed error messages
- Verify the table was created successfully in Supabase
- Check Supabase logs in **Database** > **Logs** section

### No data appearing in Supabase
- Verify the Service Role Key is correct (not the anon key)
- Check RLS policies are set up correctly
- Look at Supabase logs for any database errors

## Next Steps

Once you've confirmed the form is working:

1. **Add Email Notifications**: Set up a webhook or email trigger when a new application is submitted
2. **Build Admin Dashboard**: Create a simple admin page to manage applications
3. **Add Status Updates**: Allow your team to change application status (pending → reviewed → approved)
4. **Duplicate for Other Forms**: Use the same pattern for contact forms, lead gen, etc.

## Free Tier Limits

Supabase free tier includes:
- 500MB database space (~100K+ submissions)
- Unlimited API requests
- 2GB bandwidth/month

This should be more than enough for your startup applications!
