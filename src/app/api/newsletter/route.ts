import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';
import { trackServerEvent, flushServerEvents } from '@/lib/posthog-server';

// =======================
// Schema Validation (Zod)
// =======================

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  source: z.string().max(50, 'Source too long').optional().default('blog'),
  firstName: z.string().max(100, 'First name too long').trim().optional(),
  lastName: z.string().max(100, 'Last name too long').trim().optional(),
});

type NewsletterInput = z.infer<typeof NewsletterSchema>;

// =======================
// Database Type
// =======================

interface NewsletterSubscriber {
  id?: string;
  email: string;
  source: string;
  first_name?: string;
  last_name?: string;
  subscribed_at?: string;
  is_active?: boolean;
}

// =======================
// Rate Limiting
// =======================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 3) { // Max 3 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

// =======================
// POST Handler
// =======================

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData: NewsletterInput = NewsletterSchema.parse(body);

    // Get Supabase client
    const supabase = getSupabaseServer();

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, is_active, first_name, last_name')
      .eq('email', validatedData.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing subscriber:', checkError);
      return NextResponse.json(
        { error: 'Failed to check subscription status' },
        { status: 500 }
      );
    }

    // If email exists and is active
    if (existing && existing.is_active) {
      // Check if user is providing new name data
      const hasNewData = validatedData.firstName || validatedData.lastName;

      if (hasNewData) {
        // Build update object with only provided fields
        const updateData: Partial<NewsletterSubscriber> = {};

        if (validatedData.firstName) updateData.first_name = validatedData.firstName;
        if (validatedData.lastName) updateData.last_name = validatedData.lastName;

        // Update the existing record with new name fields
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update(updateData)
          .eq('email', validatedData.email);

        if (updateError) {
          console.error('Error updating subscriber:', updateError);
          return NextResponse.json(
            { error: 'Failed to update subscription details' },
            { status: 500 }
          );
        }

        // Track update
        await trackServerEvent(
          validatedData.email,
          'newsletter_updated_server',
          {
            source: validatedData.source,
            has_first_name: !!validatedData.firstName,
            has_last_name: !!validatedData.lastName,
          }
        );
        await flushServerEvents();

        return NextResponse.json(
          {
            message: 'Your subscription details have been updated!',
            updated: true,
            success: true
          },
          { status: 200 }
        );
      }

      // No new data provided, just return already subscribed
      return NextResponse.json(
        {
          message: 'You are already subscribed to our newsletter!',
          alreadySubscribed: true
        },
        { status: 200 }
      );
    }

    // If email exists but was unsubscribed, reactivate it
    if (existing && !existing.is_active) {
      const updateData: Partial<NewsletterSubscriber> = {
        is_active: true,
        subscribed_at: new Date().toISOString(),
        source: validatedData.source,
      };

      if (validatedData.firstName) updateData.first_name = validatedData.firstName;
      if (validatedData.lastName) updateData.last_name = validatedData.lastName;

      const { error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({
          ...updateData,
          unsubscribed_at: null,
        })
        .eq('email', validatedData.email);

      if (updateError) {
        console.error('Error reactivating subscriber:', updateError);
        return NextResponse.json(
          { error: 'Failed to reactivate subscription' },
          { status: 500 }
        );
      }

      // Track reactivation
      await trackServerEvent(
        validatedData.email,
        'newsletter_reactivated_server',
        {
          source: validatedData.source,
          has_first_name: !!validatedData.firstName,
          has_last_name: !!validatedData.lastName,
        }
      );
      await trackServerEvent(
        validatedData.email,
        'newsletter_signup',
        {
          source: validatedData.source,
          reactivation: true,
          value: 10,
        }
      );
      await flushServerEvents();

      return NextResponse.json(
        {
          message: 'Welcome back! Your subscription has been reactivated.',
          success: true
        },
        { status: 200 }
      );
    }

    // Insert new subscriber
    const subscriberData: NewsletterSubscriber = {
      email: validatedData.email,
      source: validatedData.source,
    };

    if (validatedData.firstName) subscriberData.first_name = validatedData.firstName;
    if (validatedData.lastName) subscriberData.last_name = validatedData.lastName;

    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert(subscriberData);

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);

      // Track failed subscription
      await trackServerEvent(
        validatedData.email,
        'newsletter_subscribe_failed',
        {
          source: validatedData.source,
          error_code: 'DATABASE_ERROR',
        }
      );
      await flushServerEvents();

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Track successful new subscription
    await trackServerEvent(
      validatedData.email,
      'newsletter_subscribed_server',
      {
        source: validatedData.source,
        has_first_name: !!validatedData.firstName,
        has_last_name: !!validatedData.lastName,
        new_subscriber: true,
      }
    );

    // Track as conversion event
    await trackServerEvent(
      validatedData.email,
      'newsletter_signup',
      {
        source: validatedData.source,
        new_subscriber: true,
        value: 10,
      }
    );

    await flushServerEvents();

    // Success response
    return NextResponse.json(
      {
        message: 'Successfully subscribed! Check your email for confirmation.',
        success: true
      },
      { status: 201 }
    );

  } catch (error) {
    // Validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    // Generic error
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// =======================
// OPTIONS Handler (CORS)
// =======================

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
