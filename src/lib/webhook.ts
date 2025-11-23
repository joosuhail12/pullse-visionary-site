'use server';

/**
 * Sends a JSON webhook if a URL is configured.
 * Non-blocking for the caller: errors are logged but do not throw.
 */
export async function sendWebhook(url: string | undefined, event: string, payload: unknown) {
  if (!url) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Event-Type': event,
      },
      body: JSON.stringify({ event, payload }),
      signal: controller.signal,
    });
  } catch (error) {
    console.error(`Webhook (${event}) failed:`, error);
  } finally {
    clearTimeout(timeout);
  }
}
