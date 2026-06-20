import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter_Tight } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.celliqui.in'),
  title: 'Squidii: Food That Fits Your Goals',
  description:
    'Squidii delivers meals designed around your body and your goals, so you don’t have to plan, calculate, or compromise. Launching soon.',
  keywords: ['healthy meal delivery', 'goal-based meals', 'meal subscription', 'fitness meals', 'macro meals', 'healthy eating'],
  openGraph: {
    title: 'Squidii: Food That Fits Your Goals',
    description: 'Meals designed around your body and your goals. Eating right is simple. Doing it every day is the hard part. Launching soon.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Squidii: Food That Fits Your Goals',
    description: 'Meals designed around your body and your goals. Launching soon.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased overflow-x-hidden" style={{ background: 'var(--nb-bg)', color: 'var(--nb-text)' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
