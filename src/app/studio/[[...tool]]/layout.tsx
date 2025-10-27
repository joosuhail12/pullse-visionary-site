import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pullse Content Studio',
  description: 'Content management for Pullse blog and website',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
