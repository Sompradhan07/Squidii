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
  title: 'Nura — Your Personalized Nutrition Blueprint',
  description:
    'Nura uses AI to create a nutritional blueprint unique to your body, goals, and life. Not a diet. A system.',
  keywords: ['personalized nutrition', 'AI nutrition', 'wellness', 'healthy eating', 'nutrition blueprint'],
  openGraph: {
    title: 'Nura — Your Personalized Nutrition Blueprint',
    description: 'Nura uses AI to create a nutritional blueprint unique to your body, goals, and life.',
    type: 'website',
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
