import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { coinbaseWallet, metaMask } from 'wagmi/connectors'
import { createPublicClient } from 'viem'

export const wagmiConfig = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
  connectors: [farcasterMiniApp(), coinbaseWallet(), metaMask()],
})

export const web3 = createPublicClient({ chain: base, transport: http() })
