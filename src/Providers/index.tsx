'use client'
import { ReactNode } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { baseSepolia } from 'wagmi/chains'
import { InitializeMiniKit } from './InitializeMiniKit'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/utils/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MiniKitProvider
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'mini-app-theme',
          name: 'Bitmor DCA',
          logo: 'https://dca.bitmor.xyz/base-app/logo.png',
        },
      }}
    >
      <InitializeMiniKit>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <HeroUIProvider>{children}</HeroUIProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </InitializeMiniKit>
    </MiniKitProvider>
  )
}
