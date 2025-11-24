# Pullse Webhook Integration Guide

Pullse emits signed JSON webhooks whenever key GTM funnels complete. This document explains:

1. The delivery endpoint and headers you should expect
2. How to verify authenticity via the shared HMAC signature
3. The event catalog with payload schemas
4. How to replay/test events locally

> **TL;DR** – Every webhook is a `POST https://chimera.getpullse.com/api/webhooks/ingest` request (unless `WEBHOOK_INGEST_URL` overrides it). The body is `{ "event": string, "type": "contact_sales" | "demo_meeting" | "startup_application" | "newsletter_signup", "payload": object }` and the HMAC signature is in `X-Webhook-Signature`.

---

## 1. Transport & Headers

| Header | Description |
| --- | --- |
| `Content-Type: application/json` | All payloads are JSON encoded |
| `X-Event-Type` | Machine-friendly event id (`contact_sales_submitted`, `newsletter_subscribed`, etc.) |
| `X-Webhook-Type` | High-level channel bucket used by downstream routers (`contact_sales`, `demo_meeting`, `startup_application`, `newsletter_signup`) |
| `X-Webhook-Signature-Version` | Currently `v1` (allows future rotation without breaking clients) |
| `X-Webhook-Signature` | Hex HMAC-SHA256 digest of the raw request body using `WEBHOOK_INGEST_SECRET` |

All requests originate from Pullse’s Vercel deployment IPs. Delivery is fire-and-forget (non-blocking on the forms), so you should respond within 2 seconds with a `2xx` if processing succeeds.

---

## 2. Authenticating Requests

Use the shared secret configured in `WEBHOOK_INGEST_SECRET` to recompute the digest and compare it to `X-Webhook-Signature`.

```ts
import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

const SECRET = process.env.WEBHOOK_INGEST_SECRET!;

export async function handleWebhook(req: IncomingMessage, res: ServerResponse) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const rawBody = Buffer.concat(chunks);

  const expectedSig = crypto.createHmac('sha256', SECRET).update(rawBody).digest('hex');
  const receivedSig = req.headers['x-webhook-signature'];

  if (expectedSig !== receivedSig) {
    res.writeHead(401);
    res.end('Invalid signature');
    return;
  }

  const payload = JSON.parse(rawBody.toString('utf8'));
  // TODO: route based on payload.type/payload.event
  res.writeHead(200);
  res.end('ok');
}
```

### Testing Locally

* `WEBHOOK_INGEST_SECRET` is already set in Vercel and `.env` (see `vercel env ls`).
* To replay a specific request, check `src/lib/webhook.ts` for the exact serialization and use `curl` with the raw body + signature header.

---

## 3. Event Catalog

### 3.1 `contact_sales_submitted` (`type: "contact_sales"`)

Triggered after a user submits the contact-sales form (`/contact-sales`). The payload contains both legacy CRM fields and the full validated request.

```jsonc
{
  "event": "contact_sales_submitted",
  "type": "contact_sales",
  "payload": {
    "submission_id": "d0cc58fa-0f6e-4c0c-b0d2-1a0eb5cdb07c",
    "request_id": "req_1732400000000_abcd123",
    "id": "d0cc58fa-0f6e-4c0c-b0d2-1a0eb5cdb07c",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "company": "Analytical Engines Inc.",
    "company_size": "51-200",
    "phone": "+1 555 0100",
    "timeline": "Near-term",
    "message": "Looking for AI agents in Q1.",
    "industry": "B2B SaaS",
    "payload": {
      "companySize": "51-200",
      "industry": "B2B SaaS",
      "timeline": "Near-term",
      "phone": "+1 555 0100",
      "currentSolution": "",
      "message": "Looking for AI agents in Q1.",
      "attribution": {
        "utm_source": "linkedin",
        "utm_medium": "paid",
        "utm_campaign": "q1_pipeline",
        "referrer": "https://www.linkedin.com/feed/"
      },
      "analyticsConsent": true,
      "botField": ""
    }
  }
}
```

**Notes**

* `company_size` uses the form enum (`"1-10"`, `"11-50"`, etc.).
* `payload.attribution` includes every UTM/referrer field even if empty (they’ll be `null`).

### 3.2 `contact_sales_booking` (`type: "demo_meeting"`)

Sent when the Cal.com embed confirms a booking.

```jsonc
{
  "event": "contact_sales_booking",
  "type": "demo_meeting",
  "payload": {
    "submission_id": "d0cc58fa-0f6e-4c0c-b0d2-1a0eb5cdb07c",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "event_title": "Pullse Demo - Enterprise",
    "start_time": "2025-01-15T17:00:00.000Z",
    "end_time": "2025-01-15T17:30:00.000Z",
    "timezone": "America/New_York",
    "location": "Google Meet",
    "meeting_url": "https://meet.google.com/.../pullse-demo",
    "notes": "Please invite my RevOps lead.",
    "custom_answers": {
      "team_size": "35",
      "crm": "Salesforce"
    },
    "raw": { /* provider-specific extras */ }
  }
}
```

### 3.3 `startup_application_submitted` (`type: "startup_application"`)

Fires when `/apply/startup` inserts into Supabase.

```jsonc
{
  "event": "startup_application_submitted",
  "type": "startup_application",
  "payload": {
    "application_id": "app_abc123",
    "request_id": "req_1732401000000_cde456",
    "payload": {
      "company_name": "Orbit AI",
      "website": "https://orbit.ai",
      "email": "founder@orbit.ai",
      "founding_date": "2023-03-01",
      "annual_revenue": "500000",
      "total_funding": "2000000",
      "seats_needed": "25",
      "customer_status": "Signed LOI",
      "current_tools": "Zendesk, Salesforce",
      "use_case": "24/7 autonomous L1 support for SaaS customers",
      "utm_source": "producthunt",
      "utm_medium": "organic",
      "utm_campaign": "launch-week",
      "landing_page": "/apply/startup",
      "form_path": "/apply/startup"
    }
  }
}
```

### 3.4 Newsletter events (`type: "newsletter_signup"`)

Three events share the same schema: `newsletter_subscribed`, `newsletter_updated`, `newsletter_reactivated`.

```jsonc
{
  "event": "newsletter_subscribed",
  "type": "newsletter_signup",
  "payload": {
    "email": "ada@example.com",
    "first_name": "Ada",
    "last_name": "Lovelace",
    "source": "blog",
    "attribution": {
      "utm_source": "newsletter",
      "utm_medium": "email",
      "utm_campaign": "state-of-support",
      "referrer": "https://pullse.ai/blog/state-of-support"
    }
  }
}
```

Differences:

* `newsletter_updated` is emitted only when name/attribution change for an existing subscriber.
* `newsletter_reactivated` fires when an inactive subscriber is re-enabled. Both include the new data snapshot.

---

## 4. Configuring Endpoints

1. Store `WEBHOOK_INGEST_SECRET` and (optionally) `WEBHOOK_INGEST_URL` in your receiving service so you can validate requests.  
2. If you need a different destination per environment (e.g., staging vs production), set `WEBHOOK_INGEST_URL` via `vercel env add WEBHOOK_INGEST_URL <env>` before deploying.  
3. Downstream retries: Pullse does **not** automatically retry failed webhooks today, so implement dead-letter handling or periodic reconciliation on the ingest side.

---

## 5. Local Replay / Debugging Tips

* Check the Vercel logs (`vercel logs pullse-visionary-site --since 1h`) to see the raw error output from `sendWebhook`. The code logs any non-`ok` responses with the status code, status text, and response body.
* You can manually invoke `sendWebhook` via Node REPL to test the signature logic:

```bash
node -e "import('./dist/lib/webhook.js').then(async ({ sendWebhook }) => { await sendWebhook('http://localhost:3000/webhook', 'contact_sales_submitted', { id: 'test', name: 'Test User' }, { type: 'contact_sales' }); process.exit(); })"
```

* Remember to set `WEBHOOK_INGEST_SECRET` in your `.env.local` if you want to test signature verification end-to-end.

---

Need more events? See `src/app/api/*/route.ts` for the source of truth. Once a new webhook is added, update this guide and the ingest service simultaneously to keep schemas aligned.
