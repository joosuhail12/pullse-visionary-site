import StartupApplication from '@/views/StartupApplication';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Apply for Startup Program | Pullse - 50% Off for 12 Months',
  description:
    "Join Pullse's startup program: 50% off for early-stage companies. Less than 3 years old, ≤$2M ARR or ≤$5M raised. Apply now.",
  path: '/apply/startup',
  keywords:
    'startup program, startup discount, early stage, 50% off, startup pricing, new company discount',
});

export default function StartupApplicationPage() {
  return <StartupApplication />;
}
