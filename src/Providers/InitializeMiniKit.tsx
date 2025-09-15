import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { useConnect } from 'wagmi'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'

export const InitializeMiniKit = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { setFrameReady, isFrameReady } = useMiniKit()
  const { connect } = useConnect()

  useEffect(() => {
    if (!isFrameReady)
      setFrameReady().then(async () => {
        await sdk.actions.addMiniApp()
        connect({ connector: farcasterMiniApp() })
      })
  }, [setFrameReady, isFrameReady, connect])

  return <>{children}</>
}
