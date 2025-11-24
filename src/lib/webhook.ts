import { createHmac } from 'node:crypto';

export type WebhookType =
  | 'contact_sales'
  | 'demo_meeting'
  | 'startup_application'
  | 'newsletter_signup';

export const WEBHOOK_INGEST_URL =
  process.env.WEBHOOK_INGEST_URL || 'https://chimera.getpullse.com/api/webhooks/ingest';
export const WEBHOOK_INGEST_SECRET = process.env.WEBHOOK_INGEST_SECRET;

interface SendWebhookOptions {
  secret?: string;
  headers?: Record<string, string>;
  type?: WebhookType;
}

/**
 * Sends a JSON webhook if a URL is configured.
 * Non-blocking for the caller: errors are logged but do not throw.
 */
export async function sendWebhook(
  url: string | undefined,
  event: string,
  payload: unknown,
  options: SendWebhookOptions = {},
) {
  if (!url) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const base: Record<string, unknown> = { event };
  if (options.type) base.type = options.type;

  const normalizedPayload =
    payload && typeof payload === 'object' && !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : { payload };

  const body = JSON.stringify({ ...base, ...normalizedPayload });
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Event-Type': event,
    ...options.headers,
  };

  if (options.type) {
    headers['X-Webhook-Type'] = options.type;
  }

  const signatureSecret = options.secret ?? WEBHOOK_INGEST_SECRET;

  if (signatureSecret) {
    headers['X-Webhook-Signature-Version'] = 'v1';
    headers['X-Webhook-Signature'] = createHmac('sha256', signatureSecret).update(body).digest('hex');
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      signal: controller.signal,
    });
    if (!response.ok) {
      const responseText = await response.text().catch(() => '');
      console.error(
        `Webhook (${event}) responded with ${response.status}: ${response.statusText} ${responseText}`,
      );
    }
  } catch (error) {
    console.error(`Webhook (${event}) failed:`, error);
  } finally {
    clearTimeout(timeout);
  }
}
