import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const ENABLE_STUDIO = process.env.NEXT_PUBLIC_ENABLE_STUDIO === 'true' || process.env.ENABLE_STUDIO === 'true';

const Studio = dynamic(() => import('./studio-wrapper'), {
  ssr: false,
  loading: () => <div className="p-8 text-center text-sm text-muted-foreground">Loading Studio…</div>,
});

export default function StudioPage() {
  if (!ENABLE_STUDIO) {
    return notFound();
  }

  return <Studio />;
}
