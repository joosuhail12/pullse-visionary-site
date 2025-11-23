import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer, type StartupApplication } from '@/lib/supabase-server';
import { trackServerEvent, flushServerEvents } from '@/lib/posthog-server';
import { sendWebhook } from '@/lib/webhook';

// =======================
// Schema Validation (Zod)
// =======================

const StartupApplicationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
  website: z.string().url('Invalid website URL'),
  email: z.string().email('Invalid email address').toLowerCase(),
  foundingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  annualRevenue: z.enum(['<500k', '500k-1m', '1m-2m', '>2m'], {
    errorMap: () => ({ message: 'Invalid revenue range' }),
  }),
  totalFunding: z.enum(['<1m', '1m-3m', '3m-5m', '>5m'], {
    errorMap: () => ({ message: 'Invalid funding range' }),
  }),
  seatsNeeded: z.string().regex(/^\d+$/, 'Seats must be a number').transform(Number).pipe(
    z.number().min(1, 'At least 1 seat required').max(15, 'Maximum 15 seats allowed')
  ),
  customerStatus: z.enum(['new', 'trial'], {
    errorMap: () => ({ message: 'Invalid customer status' }),
  }),
  // Optional fields
  currentTools: z.string().max(1000, 'Current tools description too long').optional().default(''),
  useCase: z.string().max(2000, 'Use case description too long').optional().default(''),
  attribution: z.object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
    referrer: z.string().optional(),
    landing_page: z.string().url().optional(),
    form_path: z.string().optional(),
  }).optional(),
});

type StartupApplicationInput = z.infer<typeof StartupApplicationSchema>;

// =======================
// Error Response Types
// =======================

type ApiError = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId?: string;
};

type ApiSuccess<T> = {
  success: true;
  data: T;
  requestId?: string;
};

// =======================
// Rate Limiting (Simple In-Memory)
// =======================

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

// =======================
// Helper Functions
// =======================

function createErrorResponse(
  code: string,
  message: string,
  status: number,
  details?: unknown,
  requestId?: string
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      error: { code, message, ...(details && { details }) },
      ...(requestId && { requestId }),
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}

function createSuccessResponse<T>(
  data: T,
  status: number = 200,
  requestId?: string
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(requestId && { requestId }),
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// =======================
// POST Handler
// =======================

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // 1. Check Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return createErrorResponse(
        'INVALID_CONTENT_TYPE',
        'Content-Type must be application/json',
        415,
        undefined,
        requestId
      );
    }

    // 2. Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return createErrorResponse(
        'INVALID_JSON',
        'Request body must be valid JSON',
        400,
        undefined,
        requestId
      );
    }

    // 3. Validate with Zod
    const validation = StartupApplicationSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        'Invalid request data',
        400,
        validation.error.format(),
        requestId
      );
    }

    const validatedData = validation.data;

    // 4. Rate limiting (by email)
    if (!checkRateLimit(validatedData.email)) {
      return createErrorResponse(
        'RATE_LIMIT_EXCEEDED',
        'Too many requests. Please try again in a minute.',
        429,
        undefined,
        requestId
      );
    }

    // 5. Check for duplicate recent submissions (within last 24 hours)
    const supabase = getSupabaseServer();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: existingApplications, error: checkError } = await supabase
      .from('startup_applications')
      .select('id, submitted_at')
      .eq('email', validatedData.email)
      .gte('submitted_at', oneDayAgo)
      .limit(1);

    if (checkError) {
      console.error('Database check error:', checkError);
      return createErrorResponse(
        'DATABASE_ERROR',
        'Failed to process request',
        500,
        undefined,
        requestId
      );
    }

    if (existingApplications && existingApplications.length > 0) {
      return createErrorResponse(
        'DUPLICATE_SUBMISSION',
        'You have already submitted an application recently. Please wait 24 hours before submitting again.',
        409,
        { existingApplicationId: existingApplications[0].id },
        requestId
      );
    }

    // 6. Prepare data for insertion
    const attribution = validatedData.attribution || {};
    const landingPage = attribution.landing_page?.trim() || '';
    const formPath = attribution.form_path?.trim() || new URL(request.url).pathname;

    const applicationData: Omit<StartupApplication, 'id' | 'submitted_at' | 'created_at' | 'status'> = {
      company_name: validatedData.companyName.trim(),
      website: validatedData.website.trim(),
      email: validatedData.email,
      founding_date: validatedData.foundingDate,
      annual_revenue: validatedData.annualRevenue,
      total_funding: validatedData.totalFunding,
      seats_needed: validatedData.seatsNeeded.toString(),
      customer_status: validatedData.customerStatus,
      current_tools: validatedData.currentTools.trim(),
      use_case: validatedData.useCase.trim(),
      utm_source: attribution.utm_source?.trim() || null,
      utm_medium: attribution.utm_medium?.trim() || null,
      utm_campaign: attribution.utm_campaign?.trim() || null,
      utm_term: attribution.utm_term?.trim() || null,
      utm_content: attribution.utm_content?.trim() || null,
      referrer: attribution.referrer?.trim() || null,
      landing_page: landingPage || null,
      form_path: formPath || null,
    };

    // 7. Insert into Supabase
    const { data, error } = await supabase
      .from('startup_applications')
      .insert([applicationData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);

      // Track failed submission
      await trackServerEvent(
        validatedData.email,
        'application_submit_failed',
        {
          application_type: 'startup',
          error_code: 'DATABASE_ERROR',
          company_name: validatedData.companyName,
          annual_revenue: validatedData.annualRevenue,
          total_funding: validatedData.totalFunding,
          seats_needed: validatedData.seatsNeeded,
          request_id: requestId,
        }
      );
      await flushServerEvents();

      return createErrorResponse(
        'DATABASE_ERROR',
        'Failed to submit application. Please try again.',
        500,
        undefined,
        requestId
      );
    }

    // 8. Track successful application submission
    await trackServerEvent(
      validatedData.email,
      'application_submitted_server',
      {
        application_type: 'startup',
        application_id: data.id,
        company_name: validatedData.companyName,
        annual_revenue: validatedData.annualRevenue,
        total_funding: validatedData.totalFunding,
        seats_needed: validatedData.seatsNeeded,
        customer_status: validatedData.customerStatus,
        has_current_tools: !!validatedData.currentTools,
        has_use_case: !!validatedData.useCase,
        request_id: requestId,
        value: 150, // Startup application value
      }
    );

    // Track as conversion event
    await trackServerEvent(
      validatedData.email,
      'submit_application',
      {
        application_type: 'startup',
        company_name: validatedData.companyName,
        annual_revenue: validatedData.annualRevenue,
        total_funding: validatedData.totalFunding,
        seats_needed: validatedData.seatsNeeded,
        application_id: data.id,
        value: 150,
      }
    );

    // Flush events before returning
    await flushServerEvents();

    // 9. Fire webhook (non-blocking)
    await sendWebhook(
      process.env.STARTUP_APPLICATION_WEBHOOK_URL,
      'startup_application_submitted',
      {
        application_id: data.id,
        request_id: requestId,
        payload: applicationData,
      }
    );

    // 10. Success response
    return createSuccessResponse(
      {
        id: data.id,
        message: 'Application submitted successfully!',
        submittedAt: data.submitted_at,
      },
      201,
      requestId
    );

  } catch (error) {
    console.error('Unexpected API error:', error, 'RequestID:', requestId);
    return createErrorResponse(
      'INTERNAL_ERROR',
      'An unexpected error occurred. Please try again.',
      500,
      undefined,
      requestId
    );
  }
}

// =======================
// GET Handler (Admin Only)
// =======================

export async function GET(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // 1. Check for admin authentication
    // TODO: Replace with proper authentication (e.g., NextAuth, API key, etc.)
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return createErrorResponse(
        'UNAUTHORIZED',
        'Authentication required',
        401,
        undefined,
        requestId
      );
    }

    // 2. Parse query parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100); // Max 100
    const status = url.searchParams.get('status');

    if (page < 1 || limit < 1) {
      return createErrorResponse(
        'INVALID_PARAMETERS',
        'Page and limit must be positive numbers',
        400,
        undefined,
        requestId
      );
    }

    // 3. Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // 4. Build query
    const supabase = getSupabaseServer();
    let query = supabase
      .from('startup_applications')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(from, to);

    if (status) {
      query = query.eq('status', status);
    }

    // 5. Execute query
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return createErrorResponse(
        'DATABASE_ERROR',
        'Failed to fetch applications',
        500,
        undefined,
        requestId
      );
    }

    // 6. Success response with pagination metadata
    return createSuccessResponse(
      {
        applications: data,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: count ? Math.ceil(count / limit) : 0,
        },
      },
      200,
      requestId
    );

  } catch (error) {
    console.error('Unexpected API error:', error, 'RequestID:', requestId);
    return createErrorResponse(
      'INTERNAL_ERROR',
      'An unexpected error occurred',
      500,
      undefined,
      requestId
    );
  }
}
