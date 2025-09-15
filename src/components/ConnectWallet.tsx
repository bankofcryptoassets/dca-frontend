import { Button } from '@heroui/react'
import { useConnect } from 'wagmi'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { metaMask } from 'wagmi/connectors'
import Image from 'next/image'
import { HeroBitcoinAnimation } from './HeroBitcoinAnimation'

export const ConnectWallet = () => {
  const { context } = useMiniKit()
  const { connect } = useConnect()

  return (
    <>
      <div className="bg-background/10 sticky top-0 z-10 flex h-22 items-center justify-between px-5 py-6 backdrop-blur-3xl">
        <div>
          <Image src="/logo.svg" alt="Logo" width={88} height={20} />
        </div>
      </div>

      <div className="grid h-[calc(100vh-11rem)] w-full place-items-center px-5 pt-7 pb-28">
        <div className="space-y-10">
          <Image
            src="/extras/bg-dots-primary.png"
            alt="Create Background"
            width={400}
            height={480}
            className="absolute top-16 right-0 left-0 z-0 w-full [mask-image:linear-gradient(to_bottom,_rgba(0,0,0,1)_0%,_rgba(0,0,0,1)_80%,_rgba(0,0,0,0)_100%)] select-none"
          />

          <div className="mt-5 grid place-items-center">
            <HeroBitcoinAnimation playReverse={false} />
          </div>

          <div className="mt-20 flex w-full flex-col items-center gap-6">
            <Button
              color="primary"
              size="lg"
              variant="shadow"
              className="w-full border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
              onPress={() => {
                connect({
                  connector: context?.client?.clientFid
                    ? farcasterMiniApp()
                    : metaMask(),
                })
              }}
            >
              Connect Wallet to Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
