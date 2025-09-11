'use client'
import { ReactNode } from 'react'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'wagmi/chains'
import { InitializeMiniKit } from './InitializeMiniKit'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/utils/web3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MiniKitProvider
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          name: 'Bitmor',
          logo: 'https://dca.bitmor.xyz/mini-app/logo.png',
        },
      }}
    >
      <InitializeMiniKit>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
              <ToastProvider placement="top-center" />
              {children}
            </HeroUIProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </InitializeMiniKit>
    </MiniKitProvider>
  )
}
