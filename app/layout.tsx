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
  title: 'Nura — Food That Fits Your Goals',
  description:
    'Nura delivers meals designed around your body and your goals — so you don’t have to plan, calculate, or compromise. Launching in Bengaluru.',
  keywords: ['healthy meal delivery', 'goal-based meals', 'Bengaluru meal delivery', 'fitness meals', 'macro meals', 'healthy eating Bengaluru'],
  openGraph: {
    title: 'Nura — Food That Fits Your Goals',
    description: 'Meals designed around your body and your goals. Eating right is simple — doing it every day is the hard part. Launching in Bengaluru.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nura — Food That Fits Your Goals',
    description: 'Meals designed around your body and your goals. Launching in Bengaluru.',
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
