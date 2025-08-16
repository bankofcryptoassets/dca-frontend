import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/Providers'

export const metadata: Metadata = {
  title: { default: 'Bitmor', template: `%s - Bitmor` },
  description:
    'Bitmor is your Personal Bitcoin Treasury, growing your personal store of value as an investor and adding real value to your creator coins with Bitcoin.',
  keywords: ['Bitcoin', 'DCA', 'Stack Satoshis', 'Treasury', 'Everyday'],
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Bitmor DCA',
    description:
      'Grow your wealth. Strengthen your creator coins. With Bitcoin.',
    images: [
      {
        url: 'https://dca.bitmor.xyz/mini-app/hero.png',
        secureUrl: 'https://dca.bitmor.xyz/mini-app/hero.png',
        alt: 'Bitmor',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitmor DCA',
    description:
      'Grow your wealth. Strengthen your creator coins. With Bitcoin.',
    creator: '@Bitmor_AI',
    images: ['https://dca.bitmor.xyz/mini-app/hero.png'],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: 'https://dca.bitmor.xyz/mini-app/preview.png',
      button: {
        // title: 'Launch Bitmor',
        title: 'Join the Waitlist',
        action: {
          type: 'launch_frame',
          name: 'Bitmor',
          url: 'https://dca.bitmor.xyz',
          splashImageUrl: 'https://dca.bitmor.xyz/mini-app/splash.png',
          splashBackgroundColor: '#000000',
        },
      },
    }),
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: 'https://dca.bitmor.xyz/mini-app/preview.png',
      button: {
        // title: 'Launch Bitmor',
        title: 'Join the Waitlist',
        action: {
          type: 'launch_frame',
          name: 'Bitmor',
          url: 'https://dca.bitmor.xyz',
          splashImageUrl: 'https://dca.bitmor.xyz/mini-app/splash.png',
          splashBackgroundColor: '#000000',
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
