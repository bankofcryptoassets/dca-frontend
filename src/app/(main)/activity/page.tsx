'use client'
import { CardTitle } from '@/components/CardTitle'
import GradientBorderCard from '@/components/GradientBorderCard'
import { useBtcPrice, useGetPlan } from '@/utils/api'
import { Chip, cn, Divider } from '@heroui/react'
import { useMemo } from 'react'
import InlineSVG from 'react-inlinesvg'
import { useAccount } from 'wagmi'
import { addDays, format } from 'date-fns'
import { convertToBTC } from '@/utils/converters'

export default function ActivityPage() {
  const { address } = useAccount()
  const { data: plan } = useGetPlan(address!, { enabled: !!address })
  const { data: btcPrice } = useBtcPrice()

  const totalPurchases = useMemo(
    () => plan?.data?.payments?.length || 0,
    [plan]
  )

  // construct activities
  // 1. create plan will be first
  // 2. now add all the payments as activities, but based on the count, since we won't have any exact info, we will do that from amount and target amount
  const activities = useMemo(() => {
    return [
      {
        id: 1,
        date: format(new Date(plan?.data?.planCreated ?? ''), 'do MMM, yyyy'),
        type: 'CREATION',
        title: 'DCA Plan Created',
      },
      ...Array.from({ length: totalPurchases }).map((_, index) => ({
        id: index + 2,
        // get the plan creation date and add the 1 day if plan.plan is day and 7 days if plan.plan is weekly
        date: format(
          addDays(
            new Date(plan?.data?.planCreated ?? ''),
            plan?.data?.plan === 'weekly' ? 7 * (index + 1) : index + 1
          ),
          'do MMM, yyyy'
        ),
        type: 'PURCHASE',
        title: 'DCA Purchase Executed',
        amountBTC: convertToBTC(
          plan?.data?.amount,
          btcPrice?.data?.convertedPrice
        ),
        amountUSD: plan?.data?.amount,
      })),
    ]?.toReversed()
  }, [plan, btcPrice, totalPurchases])

  return (
    <div>
      <GradientBorderCard bgGradient bgDots>
        <div className="z-1 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="DUST CONVERTED"
              icon={
                <InlineSVG src="/icons/coins-bitcoin.svg" className="size-4" />
              }
            />

            <Chip size="sm" color="primary" variant="shadow">
              Coming Soon
            </Chip>
          </div>

          {/** TODO: Coming Soon */}
          <div className="pointer-events-none blur-xs select-none">
            <span className="text-[28px] leading-tight">86,000</span>
            <span className="text-foreground/50 ml-2 text-sm">SATS</span>
          </div>
        </div>
      </GradientBorderCard>

      <Divider className="my-4 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

      <div className="flex gap-5">
        <GradientBorderCard className="h-full" bgGradient bgDots>
          <div className="z-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle
                title="TOTAL PURCHASES"
                icon={<InlineSVG src="/icons/cash.svg" className="size-4" />}
              />
            </div>

            <div className="mt-auto text-[40px] leading-tight">
              {totalPurchases}
            </div>
          </div>
        </GradientBorderCard>

        <GradientBorderCard className="h-full" bgGradient bgDots>
          <div className="z-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle
                title="REFERRALS"
                icon={
                  <InlineSVG src="/icons/user-switch.svg" className="size-4" />
                }
              />
            </div>

            {/** TODO: Coming Soon */}
            <Chip size="sm" color="primary" variant="shadow" className="mt-5">
              Coming Soon
            </Chip>

            {/* <div className="text-[40px] leading-tight">0</div> */}
          </div>
        </GradientBorderCard>
      </div>

      <Divider className="my-4 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

      <GradientBorderCard>
        <div className="z-1 flex w-full flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="ACTIVITY"
              icon={
                <InlineSVG
                  src="/icons/activity.svg"
                  className="text-primary size-4"
                />
              }
            />
          </div>

          <div className="flex w-full flex-col gap-4">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </GradientBorderCard>
    </div>
  )
}

const ActivityItem = ({
  activity,
}: {
  activity: {
    id: number
    date: string
    type: string
    title: string
    amountBTC?: number
    amountUSD?: number
  }
}) => {
  const positiveNegativeBTC = (activity.amountBTC ?? 0) > 0 ? '+' : '-'
  const amoutBTCText = `${positiveNegativeBTC}${Math.abs(activity.amountBTC ?? 0)} BTC`
  const btcColor =
    activity?.type === 'DUST_SWEEP'
      ? 'text-primary'
      : (activity.amountBTC ?? 0) > 0
        ? 'text-[#2DCA72]'
        : 'text-[#FF4038]'

  const positiveNegativeUSD = (activity.amountUSD ?? 0) > 0 ? '+' : '-'
  const amoutUSDText = `${positiveNegativeUSD}$${Math.abs(activity.amountUSD ?? 0)}`

  return (
    <div className="flex w-full items-start gap-2.5">
      <div className="mt-1 size-4 flex-shrink-0">
        <InlineSVG
          src={ICONS[activity.type as keyof typeof ICONS]}
          className="size-full"
        />
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <div className="flex items-center justify-between gap-1">
          <div className="text-foreground/50">{activity.date}</div>
          {activity.type !== 'CREATION' && (
            <div className={cn('text-sm', btcColor)}>{amoutBTCText}</div>
          )}
        </div>
        <div className="flex items-start justify-between gap-1">
          <div className="">{activity.title}</div>
          {activity.type !== 'CREATION' && (
            <div className="text-foreground/50">{amoutUSDText}</div>
          )}
        </div>
      </div>
    </div>
  )
}

const ICONS = {
  PURCHASE: '/icons/cash.svg',
  STREAK_BOOST: '/icons/bolt-outline.svg',
  EXIT_PENALTY: '/icons/bitcoin-caution.svg',
  REFERRAL_BONUS: '/icons/user-switch.svg',
  DUST_SWEEP: '/icons/sweep.svg',
  CREATION: '/icons/bolt-outline.svg',
}
