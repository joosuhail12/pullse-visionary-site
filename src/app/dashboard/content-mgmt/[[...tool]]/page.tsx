'use client'

import dynamic from 'next/dynamic'

const Studio = dynamic(() => import('./studio-wrapper'), { ssr: false, loading: () => <div className="p-8 text-center text-sm text-muted-foreground">Loading Studio…</div> })

export default function StudioPage() {
  return <Studio />
}
