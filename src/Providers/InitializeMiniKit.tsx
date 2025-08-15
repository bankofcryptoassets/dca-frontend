import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { useEffect } from 'react'

export const InitializeMiniKit = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) setFrameReady({ disableNativeGestures: true })
  }, [setFrameReady, isFrameReady])

  return <>{children}</>
}
