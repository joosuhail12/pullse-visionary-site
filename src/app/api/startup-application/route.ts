import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, type StartupApplication } from '@/lib/supabase-server';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex
const URL_REGEX = /^https?:\/\/.+\..+/;

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'companyName',
      'website',
      'email',
      'foundingDate',
      'annualRevenue',
      'totalFunding',
      'seatsNeeded',
      'customerStatus',
      'currentTools',
      'useCase',
    ];

    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate website URL
    if (!URL_REGEX.test(body.website)) {
      return NextResponse.json(
        { error: 'Invalid website URL. Please include http:// or https://' },
        { status: 400 }
      );
    }

    // Prepare data for insertion (convert camelCase to snake_case for database)
    const applicationData: Omit<StartupApplication, 'id' | 'submitted_at' | 'created_at' | 'status'> = {
      company_name: body.companyName.trim(),
      website: body.website.trim(),
      email: body.email.trim().toLowerCase(),
      founding_date: body.foundingDate.trim(),
      annual_revenue: body.annualRevenue.trim(),
      total_funding: body.totalFunding.trim(),
      seats_needed: body.seatsNeeded.trim(),
      customer_status: body.customerStatus.trim(),
      current_tools: body.currentTools.trim(),
      use_case: body.useCase.trim(),
    };

    // Insert into Supabase
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('startup_applications')
      .insert([applicationData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully!',
        id: data.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to retrieve applications (for admin use)
export async function GET(request: NextRequest) {
  try {
    // You can add authentication/authorization here later
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('startup_applications')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }

    return NextResponse.json({ applications: data }, { status: 200 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
