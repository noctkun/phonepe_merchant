import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PhonePe Merchant Dashboard',
  description: 'Manage your business payments and analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
