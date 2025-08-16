'use client'
import { Divider, Snippet, Switch } from '@heroui/react'
import { CardTitle } from '@/components/CardTitle'
import GradientBorderCard from '@/components/GradientBorderCard'
import InlineSVG from 'react-inlinesvg'

export default function SettingsPage() {
  return (
    <div className="space-y-3">
      <GradientBorderCard className="p-4 pb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="DCA NOTIFICATIONS"
              icon={<InlineSVG src="/icons/bell.svg" className="size-4" />}
            />
          </div>

          <Divider className="bg-[linear-gradient(90deg,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

          <div className="flex flex-col gap-3 text-sm font-medium">
            <div className="flex items-center justify-between gap-2">
              <div>Purchase Confirmations</div>
              <Switch size="sm" className="origin-right scale-75" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div>Streak Reminders</div>
              <Switch size="sm" className="origin-right scale-75" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div>Reward Notifications</div>
              <Switch size="sm" className="origin-right scale-75" />
            </div>
          </div>
        </div>
      </GradientBorderCard>

      <Divider className="my-4 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

      <GradientBorderCard
        className="relative overflow-hidden p-4"
        bgGradient
        bgDots
      >
        <div className="relative z-1 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="REFERRAL LINK"
              icon={<InlineSVG src="/icons/link.svg" className="size-4" />}
            />
          </div>

          <div>
            <Snippet
              variant="flat"
              size="sm"
              hideSymbol
              classNames={{
                base: 'bg-transparent p-0 w-full',
                copyButton:
                  'bg-foreground/10 border border-foreground/10 h-10 w-10 rounded-xl flex-shrink-0',
                pre: 'bg-foreground/10 border border-foreground/10 truncate px-3.5 h-10 w-full rounded-xl grid items-center text-foreground/75',
              }}
            >
              https://dca.bitmor.xyz/424646334
            </Snippet>
          </div>
        </div>
      </GradientBorderCard>

      <Divider className="my-4 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />
    </div>
  )
}
