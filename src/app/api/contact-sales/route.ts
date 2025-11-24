import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { getSupabaseServer } from '@/lib/supabase-server';
import { trackServerEvent, flushServerEvents } from '@/lib/posthog-server';
import { sendWebhook, WEBHOOK_INGEST_URL } from '@/lib/webhook';

// =======================
// Schema Validation (Zod)
// =======================

const AttributionSchema = z.object({
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  landing_page: z.string().max(500).optional(),
  form_path: z.string().max(300).optional(),
});

const ContactSalesSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name too long'),
  email: z.string().email('Invalid email address').toLowerCase(),
  company: z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+'], {
    errorMap: () => ({ message: 'Invalid company size' }),
  }),
  industry: z.enum(['B2B SaaS', 'Ecommerce', 'Fintech', 'Healthcare', 'Other'], {
    errorMap: () => ({ message: 'Invalid industry' }),
  }),
  timeline: z.enum(['Immediate', 'Near-term', 'Exploring', 'Planning'], {
    errorMap: () => ({ message: 'Invalid timeline' }),
  }),
  // Optional fields
  phone: z.string().max(50, 'Phone number too long').optional().default(''),
  currentSolution: z.string().max(200, 'Current solution description too long').optional().default(''),
  message: z.string().max(2000, 'Message too long').optional().default(''),
  attribution: AttributionSchema.optional(),
  analyticsConsent: z.boolean().optional().default(false),
  botField: z.string().max(200).optional().default(''),
});

type ContactSalesInput = z.infer<typeof ContactSalesSchema>;

// =======================
// Database Type
// =======================

interface ContactSalesRequest {
  id?: string;
  name: string;
  email: string;
  company: string;
  company_size: string;
  industry: string;
  timeline: string;
  phone?: string;
  current_solution?: string;
  message?: string;
  status?: string;
  submitted_at?: string;
  created_at?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  landing_page?: string | null;
  form_path?: string | null;
}

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

type RateLimitRecord = { count: number; resetAt: number };
const rateLimitByEmail = new Map<string, RateLimitRecord>();
const rateLimitByIp = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_EMAIL = 5; // 5 requests per minute per email
const RATE_LIMIT_MAX_IP = 20; // 20 requests per minute per IP

function checkRateLimit(map: Map<string, RateLimitRecord>, identifier: string, max: number): boolean {
  const now = Date.now();
  const record = map.get(identifier);

  if (!record || now > record.resetAt) {
    map.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= max) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }
  const realIp = request.headers.get('x-real-ip');
  return realIp || 'unknown';
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  [rateLimitByEmail, rateLimitByIp].forEach((map) => {
    for (const [key, value] of map.entries()) {
      if (now > value.resetAt) {
        map.delete(key);
      }
    }
  });
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

function hashIdentifier(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase()).digest('hex');
}

// =======================
// POST Handler
// =======================

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // 0. Ensure Supabase configuration is present
    const supabaseConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
    if (!supabaseConfigured) {
      return createErrorResponse(
        'CONFIG_ERROR',
        'Service temporarily unavailable. Please try again in a few minutes.',
        503,
        undefined,
        requestId
      );
    }

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
    const validation = ContactSalesSchema.safeParse(body);
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
    const { botField = '', analyticsConsent = false } = validatedData;
    const shouldTrackAnalytics = analyticsConsent === true;

    // 3b. Basic honeypot check
    if (botField.trim()) {
      return createErrorResponse(
        'SPAM_DETECTED',
        'Request flagged as spam.',
        400,
        undefined,
        requestId
      );
    }

    // 4. Rate limiting (by email + IP)
    const clientIp = getClientIp(request);
    if (!checkRateLimit(rateLimitByEmail, validatedData.email, RATE_LIMIT_MAX_EMAIL)) {
      return createErrorResponse(
        'RATE_LIMIT_EXCEEDED',
        'Too many requests. Please try again in a minute.',
        429,
        undefined,
        requestId
      );
    }

    if (clientIp !== 'unknown' && !checkRateLimit(rateLimitByIp, clientIp, RATE_LIMIT_MAX_IP)) {
      return createErrorResponse(
        'RATE_LIMIT_EXCEEDED',
        'Too many requests from your network. Please wait a minute and try again.',
        429,
        undefined,
        requestId
      );
    }

    // 5. Optional: Check for duplicate recent submissions (within last 1 hour)
    const supabase = getSupabaseServer();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: existingRequests, error: checkError } = await supabase
      .from('contact_sales_requests')
      .select('id, submitted_at')
      .eq('email', validatedData.email)
      .gte('submitted_at', oneHourAgo)
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

    if (existingRequests && existingRequests.length > 0) {
      return createErrorResponse(
        'DUPLICATE_SUBMISSION',
        'You have already submitted a request recently. Please wait an hour before submitting again.',
        409,
        { existingRequestId: existingRequests[0].id },
        requestId
      );
    }

    // 6. Prepare data for insertion
    const attribution = validatedData.attribution || {};
    const landingPage = attribution.landing_page?.trim() || '';
    const formPath = attribution.form_path?.trim() || new URL(request.url).pathname;

    const requestData: Omit<ContactSalesRequest, 'id' | 'submitted_at' | 'created_at' | 'status'> = {
      name: validatedData.name.trim(),
      email: validatedData.email,
      company: validatedData.company.trim(),
      company_size: validatedData.companySize,
      industry: validatedData.industry,
      timeline: validatedData.timeline,
      phone: validatedData.phone.trim(),
      current_solution: validatedData.currentSolution.trim(),
      message: validatedData.message.trim(),
      utm_source: attribution.utm_source?.trim() || null,
      utm_medium: attribution.utm_medium?.trim() || null,
      utm_campaign: attribution.utm_campaign?.trim() || null,
      utm_term: attribution.utm_term?.trim() || null,
      utm_content: attribution.utm_content?.trim() || null,
      referrer: attribution.referrer?.trim() || null,
      landing_page: landingPage || null,
      form_path: formPath || null,
    };
    const baseRequestData = {
      name: requestData.name,
      email: requestData.email,
      company: requestData.company,
      company_size: requestData.company_size,
      industry: requestData.industry,
      timeline: requestData.timeline,
      phone: requestData.phone,
      current_solution: requestData.current_solution,
      message: requestData.message,
    };

    // 7. Insert into Supabase
    const attemptInsert = async (payload: any) => {
      const { data, error } = await supabase
        .from('contact_sales_requests')
        .insert([payload])
        .select()
        .single();
      return { data, error };
    };

    let { data, error } = await attemptInsert(requestData);
    if (error && (error.code === '42703' || `${error.message}`.includes('column') || `${error.message}`.includes('does not exist'))) {
      // Fallback: retry without attribution fields if DB schema hasn't been migrated yet
      ({ data, error } = await attemptInsert(baseRequestData));
    }

    if (error) {
      console.error('Supabase insert error:', error);

      // Track failed submission (if consented)
      if (shouldTrackAnalytics) {
        const distinctId = hashIdentifier(validatedData.email);
        await trackServerEvent(
          distinctId,
          'form_submit_failed',
          {
            form_id: 'contact-sales',
            error_code: 'DATABASE_ERROR',
            error_message: 'Failed to submit request',
            company: validatedData.company,
            company_size: validatedData.companySize,
            industry: validatedData.industry,
            timeline: validatedData.timeline,
            request_id: requestId,
            utm_source: requestData.utm_source,
            utm_medium: requestData.utm_medium,
            utm_campaign: requestData.utm_campaign,
            referrer: requestData.referrer,
            landing_page: requestData.landing_page,
            form_path: requestData.form_path,
          }
        );
        await flushServerEvents();
      }

      return createErrorResponse(
        'DATABASE_ERROR',
        'Failed to submit request. Please try again.',
        500,
        undefined,
        requestId
      );
    }

    // 8. Track successful form submission (server-side)
    if (shouldTrackAnalytics) {
      const distinctId = hashIdentifier(validatedData.email);
      const sharedProps = {
        company: validatedData.company,
        company_size: validatedData.companySize,
        industry: validatedData.industry,
        timeline: validatedData.timeline,
        utm_source: requestData.utm_source,
        utm_medium: requestData.utm_medium,
        utm_campaign: requestData.utm_campaign,
        utm_term: requestData.utm_term,
        utm_content: requestData.utm_content,
        referrer: requestData.referrer,
        landing_page: requestData.landing_page,
        form_path: requestData.form_path,
        has_phone: !!validatedData.phone,
        has_current_solution: !!validatedData.currentSolution,
        has_message: !!validatedData.message,
      };

      await trackServerEvent(
        distinctId,
        'form_submit_success_server',
        {
          form_id: 'contact-sales',
          submission_id: data.id,
          request_id: requestId,
          value: 100, // Demo request value for conversion tracking
          ...sharedProps,
        }
      );

      // Track as a conversion event
      await trackServerEvent(
        distinctId,
        'generate_lead',
        {
          lead_type: 'demo_request',
          source: 'contact_sales_form',
          submission_id: data.id,
          value: 100,
          ...sharedProps,
        }
      );

      // Flush events before returning
      await flushServerEvents();
    }

    // 9. Fire webhook (non-blocking)
    const submissionId = data?.id || requestId;
    const legacyPayload = {
      submission_id: submissionId,
      request_id: requestId,
      id: submissionId,
      name: requestData.name,
      email: requestData.email,
      company: requestData.company,
      company_size: requestData.company_size,
      industry: requestData.industry,
      timeline: requestData.timeline,
      phone: requestData.phone,
      current_solution: requestData.current_solution,
      message: requestData.message,
      utm_source: requestData.utm_source,
      utm_medium: requestData.utm_medium,
      utm_campaign: requestData.utm_campaign,
      utm_term: requestData.utm_term,
      utm_content: requestData.utm_content,
      referrer: requestData.referrer,
      landing_page: requestData.landing_page,
      form_path: requestData.form_path,
    };

    await sendWebhook(
      WEBHOOK_INGEST_URL,
      'contact_sales_submitted',
      legacyPayload,
      { type: 'contact_sales' }
    );

    // 10. Success response
    return createSuccessResponse(
      {
        id: data.id,
        message: 'Demo request submitted successfully!',
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
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
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
      .from('contact_sales_requests')
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
        'Failed to fetch requests',
        500,
        undefined,
        requestId
      );
    }

    // 6. Success response with pagination metadata
    return createSuccessResponse(
      {
        requests: data,
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
