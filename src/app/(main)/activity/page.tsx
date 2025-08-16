import { CardTitle } from '@/components/CardTitle'
import GradientBorderCard from '@/components/GradientBorderCard'
import { cn, Divider } from '@heroui/react'
import InlineSVG from 'react-inlinesvg'

export default function ActivityPage() {
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
          </div>

          <div>
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

            <div className="mt-auto text-[40px] leading-tight">47</div>
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

            <div className="text-[40px] leading-tight">39</div>
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
            {DUMMY_ACTIVITY.map((activity) => (
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
  activity: (typeof DUMMY_ACTIVITY)[number]
}) => {
  const positiveNegativeBTC = activity.amountBTC > 0 ? '+' : '-'
  const amoutBTCText = `${positiveNegativeBTC}${Math.abs(activity.amountBTC)} BTC`
  const btcColor =
    activity?.type === 'DUST_SWEEP'
      ? 'text-primary'
      : activity.amountBTC > 0
        ? 'text-[#2DCA72]'
        : 'text-[#FF4038]'

  const positiveNegativeUSD = activity.amountUSD > 0 ? '+' : '-'
  const amoutUSDText = `${positiveNegativeUSD}$${Math.abs(activity.amountUSD)}`

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
          <div className={cn('text-sm', btcColor)}>{amoutBTCText}</div>
        </div>
        <div className="flex items-start justify-between gap-1">
          <div className="">{activity.title}</div>
          <div className="text-foreground/50">{amoutUSDText}</div>
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
}

const DUMMY_ACTIVITY = [
  {
    id: 1,
    date: '21st Sept, 2025',
    type: 'PURCHASE',
    title: 'DCA Purchase Executed',
    amountBTC: 0.00005,
    amountUSD: 50.75,
  },
  {
    id: 2,
    date: '21st Sept, 2025',
    type: 'STREAK_BOOST',
    title: '7 Streak Boost Earned',
    amountBTC: 0.000002,
    amountUSD: 2.75,
  },
  {
    id: 3,
    date: '21st Sept, 2025',
    type: 'EXIT_PENALTY',
    title: 'Penalty Pool Contribution',
    amountBTC: -0.000002,
    amountUSD: -2.75,
  },
  {
    id: 4,
    date: '21st Sept, 2025',
    type: 'REFERRAL_BONUS',
    title: 'Referral Bonus',
    amountBTC: 0.000002,
    amountUSD: 2.75,
  },
  {
    id: 5,
    date: '21st Sept, 2025',
    type: 'DUST_SWEEP',
    title: 'Dust Sweep Executed',
    amountBTC: 0.000002,
    amountUSD: 3.75,
  },
]
