'use client'
import { addToast, Button } from '@heroui/react'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import InlineSVG from 'react-inlinesvg'
import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { sdk } from '@farcaster/miniapp-sdk'
import { useState } from 'react'

export default function Home() {
  // const router = useRouter()
  const { context } = useMiniKit()
  const [joined, setJoined] = useState(false)

  const handleSubmit = async () => {
    if (!context?.user?.fid) {
      addToast({ title: 'Please open in Farcaster', color: 'danger' })
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
          addToast({
            title: 'You are already in the waitlist',
            color: 'primary',
          })
          setJoined(true)
          return
        }
        throw new Error('Failed to join waitlist')
      }

      setJoined(true)
      addToast({ title: 'Successfully Joined the Waitlist', color: 'success' })

      await sdk.actions.composeCast({
        text: "I'll be stacking Bitcoin daily with Bitmor. I've joined the waitlist and locked my chance at the Private Token Round. Only 500 seats, be early.",
        embeds: ['https://farcaster.xyz/miniapps/HVDZUx8hVTgA/bitmor'],
      })
    } catch (error) {
      console.error('Error:', error)
      addToast({
        title: 'Failed to join waitlist',
        description: 'Please try again later',
        color: 'danger',
      })
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

      <main className="bg-background relative z-1 row-start-2 flex w-full flex-col items-center gap-10 px-10 pt-10 pb-15">
        <Image
          src="/extras/main-bg-arch.png"
          alt="Main Background Arch"
          width={400}
          height={75}
          priority
          className="absolute top-0 right-0 left-0 h-full max-h-18 w-full -translate-y-full"
        />

        <div className="mb-7 h-7">
          <InlineSVG src="/logo.svg" className="h-8 w-auto" />
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-center text-2xl">Stack Bitcoin Every Day</p>
          <p className="text-foreground/50 text-center text-base">
            Protect What You’ve Earned, Forever.
          </p>
        </div>

        <Button
          color="primary"
          variant="shadow"
          fullWidth
          size="lg"
          className="border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
          onPress={() => {
            // router.push('/create')
            handleSubmit()
          }}
          disabled={joined}
          endContent={
            joined && <InlineSVG src="/icons/check.svg" className="h-4 w-4" />
          }
        >
          {joined ? 'Waitlist Joined' : 'Join the Waitlist'}
          {/* Plan Your Bitcoin Treasury */}
        </Button>
      </main>
    </div>
  )
}
