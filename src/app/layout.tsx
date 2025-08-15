import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/Providers'

export const metadata: Metadata = {
  title: { default: 'Bitmor DCA', template: `%s - Bitmor DCA` },
  description: 'Bitmor DCA',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Bitmor DCA',
    description: 'Bitmor DCA: Buy Bitcoin Everyday',
    images: [
      {
        url: 'https://dca.bitmor.xyz/base-app/hero.png',
        secureUrl: 'https://dca.bitmor.xyz/base-app/hero.png',
        alt: 'Bitmor DCA',
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
      'Bitmor DCA: Protects crypto investments, detects rug pulls & honeypots on Eth, Base, BSC, Polygon, Solana offers market insights for informed decisions.',
    creator: '@Bitmor_AI',
    images: ['https://dca.bitmor.xyz/base-app/hero.png'],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: 'https://dca.bitmor.xyz/base-app/hero.png',
      button: {
        title: 'Launch Bitmor DCA',
        action: {
          type: 'launch_frame',
          name: 'Bitmor DCA',
          url: 'https://dca.bitmor.xyz',
          splashImageUrl: 'https://dca.bitmor.xyz/base-app/splash.png',
          splashBackgroundColor: '#000000',
        },
      },
    }),
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: 'https://dca.bitmor.xyz/base-app/hero.png',
      button: {
        title: 'Launch Bitmor DCA',
        action: {
          type: 'launch_frame',
          name: 'Bitmor DCA',
          url: 'https://dca.bitmor.xyz',
          splashImageUrl: 'https://dca.bitmor.xyz/base-app/splash.png',
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
