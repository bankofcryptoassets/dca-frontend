'use client'
import {
  // addToast,
  Button,
  cn,
} from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import InlineSVG from 'react-inlinesvg'
import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { sdk } from '@farcaster/miniapp-sdk'
// import confetti from 'canvas-confetti'
// import SlotCounter from 'react-slot-counter'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { MINI_APP_URL } from '@/utils/constants'
import { useAccount, useConnect } from 'wagmi'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { metaMask } from 'wagmi/connectors'

export default function Home() {
  const router = useRouter()
  const { context } = useMiniKit()
  // const queryClient = useQueryClient()
  const { connect } = useConnect()
  const { isConnected } = useAccount()

  const handleContinue = () => {
    if (isConnected) {
      sdk.haptics.impactOccurred('soft')
      router.push('/create')
      return
    }
    connect(
      {
        connector: context?.client?.clientFid ? farcasterMiniApp() : metaMask(),
      },
      {
        onSettled: () => {
          router.push('/create')
          sdk.haptics.impactOccurred('soft')
        },
      }
    )
  }

  // const { data: waitlistCount } = useQuery({
  //   queryKey: ['waitlist-count'],
  //   queryFn: () => fetch('/api/waitlist/count').then((res) => res.json()),
  // })

  // const { data: waitlistExists } = useQuery({
  //   queryKey: ['waitlist-exists', context?.user?.fid],
  //   queryFn: () =>
  //     fetch('/api/waitlist/exists', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ fid: context?.user?.fid }),
  //     }).then((res) => res.json()),
  //   enabled: !!context?.user?.fid,
  // })

  // const isWaitlistJoined = waitlistExists?.exists

  // const handleSuccess = (alreadyJoined = false) => {
  //   confetti({ particleCount: 100, spread: 70, origin: { y: 1 } })
  //   queryClient.invalidateQueries({ queryKey: ['waitlist-exists'] })
  //   queryClient.invalidateQueries({ queryKey: ['waitlist-count'] })
  //   addToast({
  //     title: alreadyJoined
  //       ? 'You are already in the waitlist'
  //       : 'Successfully Joined the Waitlist',
  //     color: 'success',
  //   })
  //   sdk.haptics.notificationOccurred('success')
  // }

  // const handleSubmit = async () => {
  //   // for testing only
  //   // handleSuccess()
  //   // return

  //   if (!context?.user?.fid) {
  //     addToast({
  //       title: 'Something went wrong',
  //       description: 'Please try again later',
  //       color: 'danger',
  //     })
  //     return
  //   }

  //   try {
  //     const waitlistRes = await fetch('/api/waitlist', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ fid: context.user.fid }),
  //     })

  //     if (!waitlistRes.ok) {
  //       if (waitlistRes.status === 409) {
  //         handleSuccess(true)
  //         return
  //       }
  //       throw new Error('Failed to join waitlist')
  //     }

  //     handleSuccess()

  //     await sdk.actions.composeCast({
  //       text: "I'll be stacking Bitcoin daily with Bitmor. I've joined the waitlist and locked my chance at the Private Token Round. Only 500 seats, be early.",
  //       embeds: [MINI_APP_URL],
  //     })
  //   } catch (error) {
  //     console.error('Error:', error)
  //     addToast({
  //       title: 'Failed to join waitlist',
  //       description: 'Please try again later',
  //       color: 'danger',
  //     })
  //   }
  // }

  return (
    <div className="bg-background relative grid min-h-screen items-end justify-items-end">
      <div className="pointer-events-none overflow-hidden select-none">
        <div className="bg-primary absolute top-1/2 left-1/2 h-[651px] w-[378px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] blur-[146px]"></div>
        <div className="bg-primary absolute top-1/2 left-1/2 h-[254px] w-[228px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] blur-[96px]"></div>
        <div className="absolute inset-0 h-full w-full bg-[url(/extras/dots-bg-main.svg)] bg-center bg-repeat mix-blend-overlay transition-transform" />
      </div>

      <main className="bg-background relative z-1 row-start-2 flex w-full flex-col items-center gap-10 px-10 pt-10 pb-15">
        <Image
          src="/extras/main-bg-arch.png"
          alt="Main Background Arch"
          width={400}
          height={75}
          priority
          className="pointer-events-none absolute top-0 right-0 left-0 h-full max-h-18 w-full -translate-y-full transition-transform select-none"
        />

        <div className="h-7">
          <InlineSVG src="/logo.svg" className="h-8 w-auto select-none" />
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-center text-2xl">Stack Bitcoin Every Day</p>

          <p
            className={cn(
              'text-foreground/50 h-6 text-center text-base transition-[height,opacity] duration-300'
              // isWaitlistJoined && 'h-0 opacity-0'
            )}
          >
            Protect What You&apos;ve Earned, Forever.
          </p>

          {/* <div className="flex flex-col gap-2">
            <div
              className={cn(
                'h-0 space-y-2 opacity-0 transition-[height,opacity] duration-500',
                isWaitlistJoined && 'h-28.5 opacity-100'
              )}
            >
              <p className="text-foreground/75 text-center text-lg leading-tight">
                Thanks for joining the waitlist.
              </p>
              <p className="text-foreground/50 text-center text-sm leading-tight">
                We&apos;ll notify you when we go live.
              </p>
              <p className="text-foreground/50 text-center text-sm leading-tight">
                Stack BTC with us and secure your seat at the Private Round
                table.
              </p>
            </div>

            <div className="text-foreground/75 flex flex-col items-center text-center text-lg">
              <span className="text-primary flex items-center gap-1 text-3xl font-medium">
                <SlotCounter
                  value={waitlistCount?.count || 250}
                  sequentialAnimationMode
                />
                <span className="mt-0.5">/</span>
                <SlotCounter value={500} sequentialAnimationMode />
              </span>
              <span className="text-sm">People Joined</span>
            </div>
          </div> */}
        </div>

        {/* <Button
          color="primary"
          variant="shadow"
          fullWidth
          size="lg"
          className="border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
          onPress={() => {
            if (isWaitlistJoined) {
              sdk.haptics.notificationOccurred('success')
              return
            }
            handleSubmit()
          }}
          endContent={
            isWaitlistJoined && (
              <InlineSVG src="/icons/check.svg" className="size-4" />
            )
          }
        >
          {isWaitlistJoined ? 'Waitlist Joined' : 'Join the Waitlist'}
        </Button> */}

        <Button
          color="primary"
          variant="shadow"
          fullWidth
          size="lg"
          className="border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
          onPress={handleContinue}
        >
          Plan Your Bitcoin Treasury
        </Button>
      </main>
    </div>
  )
}
