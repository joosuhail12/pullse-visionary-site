# API Documentation

## Overview

This document describes the API design principles and best practices implemented in the Pullse marketing website APIs.

## API Design Principles Implemented

### 1. **Schema Validation with Zod** ✅
- All request data is validated using Zod schemas
- Type-safe validation with automatic TypeScript types
- Detailed error messages for validation failures
- Prevents invalid data from reaching the database

### 2. **Consistent Response Format** ✅

**Success Response:**
```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "message": "Success message",
    "submittedAt": "ISO timestamp"
  },
  "requestId": "req_1234567890_abc"
}
```

**Error Response:**
```typescript
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { /* Optional additional details */ }
  },
  "requestId": "req_1234567890_abc"
}
```

### 3. **HTTP Status Codes** ✅
- `200 OK` - Successful GET request
- `201 Created` - Successful POST request (resource created)
- `400 Bad Request` - Validation errors or invalid input
- `401 Unauthorized` - Authentication required
- `409 Conflict` - Duplicate submission detected
- `415 Unsupported Media Type` - Invalid Content-Type
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Unexpected server errors

### 4. **Error Codes** ✅

Standardized error codes for programmatic handling:

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_CONTENT_TYPE` | Content-Type must be application/json | 415 |
| `INVALID_JSON` | Request body is not valid JSON | 400 |
| `VALIDATION_ERROR` | Request data failed schema validation | 400 |
| `RATE_LIMIT_EXCEEDED` | Too many requests from this identifier | 429 |
| `DUPLICATE_SUBMISSION` | Duplicate submission within 24 hours | 409 |
| `DATABASE_ERROR` | Database operation failed | 500 |
| `UNAUTHORIZED` | Authentication required | 401 |
| `INVALID_PARAMETERS` | Invalid query parameters | 400 |
| `INTERNAL_ERROR` | Unexpected server error | 500 |

### 5. **Rate Limiting** ✅
- **Window**: 1 minute
- **Limit**: 3 requests per email address
- **Implementation**: In-memory Map (simple, works for single-server deployments)
- **Cleanup**: Automatic cleanup every 5 minutes
- **Production Note**: For multi-server deployments, consider Redis-based rate limiting

### 6. **Duplicate Detection** ✅
- Checks for submissions from the same email within 24 hours
- Prevents spam and accidental duplicate submissions
- Returns `409 Conflict` with existing application ID
- Database-level check using indexed email column for performance

### 7. **Request Tracing** ✅
- Every request gets a unique `requestId`
- Format: `req_{timestamp}_{random}`
- Included in all responses (success and error)
- Logged with errors for debugging
- Useful for tracking issues in production

### 8. **Security Best Practices** ✅

#### Input Validation
- All inputs validated with Zod before processing
- Email normalized to lowercase
- Strings trimmed of whitespace
- Enum validation for select fields
- Length limits on text fields (1000 chars for currentTools, 2000 for useCase)

#### Content-Type Validation
- Requires `Content-Type: application/json` header
- Returns `415 Unsupported Media Type` if invalid

#### Response Headers
- `Content-Type: application/json` (explicit)
- `X-Content-Type-Options: nosniff` (prevents MIME sniffing attacks)

#### Authentication for Admin Endpoints
- GET endpoint requires `Authorization: Bearer {ADMIN_API_KEY}` header
- API key stored in environment variables
- Returns `401 Unauthorized` if missing or invalid

### 9. **Pagination** ✅
- GET endpoint supports pagination
- Query parameters:
  - `page` (default: 1, minimum: 1)
  - `limit` (default: 20, maximum: 100)
  - `status` (optional filter)
- Response includes pagination metadata:
  ```json
  {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
  ```

### 10. **Optional Fields** ✅
- `currentTools` and `useCase` are truly optional
- Default to empty string if not provided
- Validation only checks max length if provided
- Properly marked as optional in Zod schema

## API Endpoints

### POST /api/startup-application

Submit a startup program application.

**Request:**
```json
{
  "companyName": "Acme Inc",
  "website": "https://acme.com",
  "email": "founder@acme.com",
  "foundingDate": "2023-01-15",
  "annualRevenue": "<500k",
  "totalFunding": "<1m",
  "seatsNeeded": "5",
  "customerStatus": "new",
  "currentTools": "Zendesk, Intercom",  // Optional
  "useCase": "Customer support automation"  // Optional
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "message": "Application submitted successfully!",
    "submittedAt": "2025-01-05T10:30:00.000Z"
  },
  "requestId": "req_1704450600_abc123"
}
```

**Error Response Examples:**

**Validation Error (400):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "companyName": {
        "_errors": ["Company name is required"]
      }
    }
  },
  "requestId": "req_1704450600_xyz789"
}
```

**Rate Limit Exceeded (429):**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in a minute."
  },
  "requestId": "req_1704450600_def456"
}
```

**Duplicate Submission (409):**
```json
{
  "error": {
    "code": "DUPLICATE_SUBMISSION",
    "message": "You have already submitted an application recently. Please wait 24 hours before submitting again.",
    "details": {
      "existingApplicationId": "123e4567-e89b-12d3-a456-426614174000"
    }
  },
  "requestId": "req_1704450600_ghi789"
}
```

### GET /api/startup-application

Retrieve submitted applications (Admin only).

**Authentication:**
```
Authorization: Bearer {ADMIN_API_KEY}
```

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20, max: 100) - Items per page
- `status` (optional) - Filter by status (e.g., "pending", "approved")

**Example Request:**
```
GET /api/startup-application?page=2&limit=50&status=pending
Authorization: Bearer your_admin_api_key_here
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "company_name": "Acme Inc",
        "website": "https://acme.com",
        "email": "founder@acme.com",
        "founding_date": "2023-01-15",
        "annual_revenue": "<500k",
        "total_funding": "<1m",
        "seats_needed": "5",
        "customer_status": "new",
        "current_tools": "Zendesk, Intercom",
        "use_case": "Customer support automation",
        "status": "pending",
        "submitted_at": "2025-01-05T10:30:00.000Z",
        "created_at": "2025-01-05T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 2,
      "limit": 50,
      "total": 150,
      "totalPages": 3
    }
  },
  "requestId": "req_1704450600_jkl012"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  },
  "requestId": "req_1704450600_mno345"
}
```

## Frontend Integration

### Error Handling

The frontend form intelligently handles different error codes:

```typescript
if (errorCode === 'DUPLICATE_SUBMISSION') {
  // Show user-friendly message about already submitting
} else if (errorCode === 'RATE_LIMIT_EXCEEDED') {
  // Ask user to wait before trying again
} else if (errorCode === 'VALIDATION_ERROR') {
  // Generic validation error message
} else {
  // Generic error message
}
```

### Best Practices

1. **Always include Content-Type header**
   ```typescript
   headers: {
     'Content-Type': 'application/json',
   }
   ```

2. **Check response.ok before parsing**
   ```typescript
   const result = await response.json();
   if (!response.ok) {
     // Handle error
   }
   ```

3. **Handle specific error codes**
   - Provides better UX with contextual error messages

4. **Log requestId for debugging**
   ```typescript
   console.error('Error with requestId:', result.requestId);
   ```

## Database Schema

### startup_applications Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Auto-generated |
| `company_name` | TEXT | NOT NULL | Company name |
| `website` | TEXT | NOT NULL | Company website URL |
| `email` | TEXT | NOT NULL | Contact email (indexed) |
| `founding_date` | TEXT | NOT NULL | Company founding date |
| `annual_revenue` | TEXT | NOT NULL | ARR range |
| `total_funding` | TEXT | NOT NULL | Total funding range |
| `seats_needed` | TEXT | NOT NULL | Number of seats requested |
| `customer_status` | TEXT | NOT NULL | new or trial |
| `current_tools` | TEXT | NOT NULL | Current support tools |
| `use_case` | TEXT | NOT NULL | Primary use case |
| `status` | TEXT | DEFAULT 'pending' | Application status |
| `submitted_at` | TIMESTAMPTZ | DEFAULT NOW() | Submission timestamp (indexed) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Record creation timestamp |

**Indexes:**
- `idx_startup_applications_email` - For duplicate detection
- `idx_startup_applications_submitted_at` - For time-based queries
- `idx_startup_applications_status` - For filtering by status

**Row Level Security:**
- Enabled on table
- Service role has full access
- Authenticated users can view (for future admin panel)

## Testing

### Manual Testing

**Test Successful Submission:**
```bash
curl -X POST http://localhost:3000/api/startup-application \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "website": "https://test.com",
    "email": "test@test.com",
    "foundingDate": "2023-01-01",
    "annualRevenue": "<500k",
    "totalFunding": "<1m",
    "seatsNeeded": "5",
    "customerStatus": "new"
  }'
```

**Test Duplicate Detection:**
```bash
# Submit same email twice within 24 hours
curl -X POST http://localhost:3000/api/startup-application \
  -H "Content-Type: application/json" \
  -d '{ ... same email ... }'
```

**Test Rate Limiting:**
```bash
# Submit 4 times quickly
for i in {1..4}; do
  curl -X POST http://localhost:3000/api/startup-application \
    -H "Content-Type: application/json" \
    -d '{
      "email": "ratelimit@test.com",
      ...
    }'
done
```

**Test Admin Endpoint:**
```bash
curl -X GET "http://localhost:3000/api/startup-application?page=1&limit=20" \
  -H "Authorization: Bearer your_admin_api_key_here"
```

## Production Considerations

### 1. Rate Limiting
Current implementation uses in-memory Map, which works for single-server deployments. For production with multiple servers:
- Consider using Redis for distributed rate limiting
- Use packages like `@upstash/ratelimit` or `rate-limiter-flexible`

### 2. Admin Authentication
Current implementation uses simple API key in Authorization header. For production:
- Consider implementing proper authentication (NextAuth, Auth0, etc.)
- Add role-based access control (RBAC)
- Implement API key rotation

### 3. Monitoring
- Add structured logging (Winston, Pino)
- Track requestIds in logs
- Monitor error rates by error code
- Set up alerts for high error rates

### 4. Database
- Current schema uses TEXT for numeric fields (seats_needed)
- Consider using proper numeric types if you need to do mathematical operations
- Add database-level constraints for data integrity

### 5. Email Notifications
Consider adding email notifications on successful submissions:
- Send confirmation to applicant
- Notify internal team
- Use services like SendGrid, Resend, or Postmark

## Security Checklist

- [x] Input validation with Zod
- [x] Rate limiting implemented
- [x] Duplicate detection
- [x] SQL injection prevention (using Supabase client, not raw SQL)
- [x] XSS prevention (data is sanitized, trimmed)
- [x] Content-Type validation
- [x] MIME sniffing prevention (X-Content-Type-Options: nosniff)
- [x] Authentication for admin endpoints
- [x] Row Level Security enabled
- [x] Environment variables for secrets
- [x] No sensitive data in error responses
- [x] Request size limits (handled by Next.js default 4MB limit)

## Future Enhancements

1. **Webhook Support**
   - Send webhook notifications on new submissions
   - Support Slack, Discord, or custom webhooks

2. **Email Verification**
   - Send verification email before accepting submission
   - Prevents fake emails

3. **File Uploads**
   - Allow applicants to upload pitch decks
   - Store in Supabase Storage

4. **Status Updates**
   - API endpoint to update application status
   - Email notifications on status changes

5. **Analytics**
   - Track submission rates
   - Conversion funnel analytics
   - A/B testing for form fields

6. **Idempotency Keys**
   - Support idempotency keys in headers
   - Prevent accidental duplicate submissions even with retry logic

## Summary

This API implementation follows industry best practices:

✅ **Type Safety** - Zod schemas + TypeScript
✅ **Consistent** - Standardized response format
✅ **Secure** - Input validation, rate limiting, authentication
✅ **Documented** - Clear error codes and messages
✅ **Traceable** - Request IDs for debugging
✅ **Scalable** - Pagination, efficient queries, indexes
✅ **User-Friendly** - Contextual error messages
✅ **Production-Ready** - Error handling, security headers

The implementation provides a solid foundation that can scale as your lead volume grows.
