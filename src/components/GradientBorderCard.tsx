'use client'
import { cn } from '@heroui/react'

export default function GradientBorderCard({
  children,
  className,
  wrapperClassName,
}: {
  children: React.ReactNode
  className?: string
  wrapperClassName?: string
}) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl bg-[linear-gradient(180deg,_#F7931A_0%,_rgba(247,_147,_26,_0.1)_100%)] p-0.25',
        wrapperClassName
      )}
    >
      <div className={cn('bg-background w-full rounded-2xl p-4', className)}>
        {children}
      </div>
    </div>
  )
}
