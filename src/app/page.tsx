'use client'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import InlineSVG from 'react-inlinesvg'
import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { sdk } from '@farcaster/miniapp-sdk'

export default function Home() {
  const router = useRouter()
  const { context } = useMiniKit()
  console.log('context', context?.user.fid)

  const handleSubmit = async () => {
    if (!context?.user?.fid) {
      console.error('No FID found')
      return
    }

    try {
      const waitlistRes = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fid: context.user.fid }),
      })

      if (!waitlistRes.ok) {
        if (waitlistRes.status === 409) {
          console.log('User already on waitlist')
          router.push('/home')
          return
        }
        throw new Error('Failed to join waitlist')
      }

      const text =
        'I joined the waitlist and locked in my spot for Bitmor private token round. Secure your seat on the table to be early.'

      await sdk.actions.composeCast({
        text,
        embeds: ['https://farcaster.xyz/miniapps/HVDZUx8hVTgA/bitmor'],
      })

      router.push('/home')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="bg-background relative grid min-h-screen items-end justify-items-end">
      <Image
        src="/extras/main-bg.png"
        alt="Main Background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        fill
        priority
      />

      <main className="bg-background relative z-1 row-start-2 flex w-full flex-col items-center gap-15 px-10 pt-10 pb-15">
        <Image
          src="/extras/main-bg-arch.png"
          alt="Main Background Arch"
          width={400}
          height={75}
          priority
          className="absolute top-0 right-0 left-0 h-full max-h-18 w-full -translate-y-full"
        />

        <div className="h-7">
          <InlineSVG src="/logo.svg" className="h-8 w-auto" />
        </div>

        <p className="text-center text-xl">
          Stack Bitcoin Every Day
          <br />
          Add Value to Your Name
        </p>

        <Button
          color="primary"
          variant="shadow"
          fullWidth
          size="lg"
          className="border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
          onPress={() => {
            // router.push('/home')
            handleSubmit()
          }}
        >
          Join the Waitlist
          {/* Plan Your Bitcoin Treasury */}
        </Button>
      </main>
    </div>
  )
}
