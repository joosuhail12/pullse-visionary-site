import type { Metadata } from 'next';
import StartupApplication from '@/views/StartupApplication';

export const metadata: Metadata = {
  title: 'Apply for Startup Program | Pullse - 50% Off for 12 Months',
  description:
    'Join Pullse\'s startup program: 50% off for early-stage companies. Less than 3 years old, ≤$2M ARR or ≤$5M raised. Apply now.',
};

export default function StartupApplicationPage() {
  return <StartupApplication />;
}
