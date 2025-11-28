import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWebhook, WEBHOOK_INGEST_URL } from '@/lib/webhook';

const BookingSchema = z.object({
  submission_id: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required').max(200, 'Name too long').optional(),
  email: z.string().email('Invalid email').optional(),
  event_title: z.string().max(500, 'Event title too long').optional(),
  start_time: z.string().datetime().optional(),
  end_time: z.string().datetime().optional(),
  timezone: z.string().max(100, 'Timezone too long').optional(),
  location: z.string().max(500, 'Location too long').optional(),
  meeting_url: z.string().url('Invalid meeting URL').optional(),
  notes: z.string().max(2000, 'Notes too long').optional(),
  custom_answers: z.record(z.string(), z.string().max(500, 'Answer too long')).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = BookingSchema.parse(body);

    await sendWebhook(
      WEBHOOK_INGEST_URL,
      'contact_sales_booking',
      { ...validated },
      { type: 'demo_meeting' }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error('Booking webhook error:', error);
    return NextResponse.json({ error: 'Failed to send booking data' }, { status: 500 });
  }
}
