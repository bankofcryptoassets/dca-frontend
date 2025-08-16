import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

export const InitializeMiniKit = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady)
      setFrameReady({ disableNativeGestures: true }).then(async () => {
        console.log('App Initialized!')
        await sdk.actions.addMiniApp()
      })
  }, [setFrameReady, isFrameReady])

  return <>{children}</>
}
