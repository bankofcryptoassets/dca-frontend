import { cn } from '@heroui/react'
import InlineSVG from 'react-inlinesvg'
import Wave from 'react-wavify'

export const HeroBitcoinAnimation = ({
  playReverse,
}: {
  playReverse?: boolean
}) => {
  return (
    <div className="relative select-none">
      <>
        <InlineSVG
          src="/icons/btc.svg"
          className={cn(
            'bitcoin-falling one absolute top-0 left-1/2 z-0 size-3 opacity-0',
            playReverse && '[animation-direction:reverse]!'
          )}
        />
        <InlineSVG
          src="/icons/btc.svg"
          className={cn(
            'bitcoin-falling two absolute top-0 left-1/2 z-0 size-3 opacity-0',
            playReverse && '[animation-direction:reverse]!'
          )}
        />
        <InlineSVG
          src="/icons/btc.svg"
          className={cn(
            'bitcoin-falling three absolute top-0 left-1/2 z-0 size-3 opacity-0',
            playReverse && '[animation-direction:reverse]!'
          )}
        />
        <InlineSVG
          src="/icons/btc.svg"
          className={cn(
            'bitcoin-falling four absolute top-0 left-1/2 z-0 size-3 opacity-0',
            playReverse && '[animation-direction:reverse]!'
          )}
        />
      </>

      <div className="border-primary relative size-[120px] overflow-hidden rounded-full border-2">
        {/* Background layer - Bitcoin outline */}
        <InlineSVG
          src="/extras/bitcoin-outline.svg"
          className="absolute top-1/2 left-1/2 z-1 size-[76px] -translate-x-1/2 -translate-y-1/2"
        />

        {/* Middle layer - Wave fills the bottom half */}
        <Wave
          fill="hsl(var(--heroui-primary))"
          paused={false}
          style={{ display: 'flex', width: '100%', height: '100%' }}
          options={{
            height: playReverse ? 68 : 48,
            amplitude: 10,
            speed: 0.2,
            points: 2,
          }}
        />

        {/* Top layer - White bitcoin, but clipped to only show below the wave */}
        <InlineSVG
          src="/extras/bitcoin-white.svg"
          className="stroke-primary absolute top-1/2 left-1/2 z-0 size-[76px] -translate-x-1/2 -translate-y-1/2 stroke-1"
          id="bitcoin-white"
        />
      </div>
    </div>
  )
}
