import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';

// =======================
// Schema Validation (Zod)
// =======================

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

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute (more generous than startup)

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
    };

    // 7. Insert into Supabase
    const { data, error } = await supabase
      .from('contact_sales_requests')
      .insert([requestData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return createErrorResponse(
        'DATABASE_ERROR',
        'Failed to submit request. Please try again.',
        500,
        undefined,
        requestId
      );
    }

    // 8. Success response
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
