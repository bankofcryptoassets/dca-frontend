'use client'
import { cn } from '@heroui/react'
import Image from 'next/image'

export default function GradientBorderCard({
  children,
  className,
  wrapperClassName,
  bgDots = false,
  bgGradient = false,
}: {
  children: React.ReactNode
  className?: string
  wrapperClassName?: string
  bgDots?: boolean
  bgGradient?: boolean
}) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl bg-[linear-gradient(180deg,_#F7931A_0%,_rgba(247,_147,_26,_0.1)_100%)] p-0.25',
        wrapperClassName
      )}
    >
      <div
        className={cn(
          'bg-background relative w-full overflow-hidden rounded-2xl p-4',
          bgGradient &&
            'bg-[radial-gradient(91.8%_91.78%_at_60.24%_4.16%,_rgba(247,_147,_26,_0.7)_0%,_rgba(0,_0,_0,_0.5)_100%)]',
          className
        )}
      >
        {children}

        {bgDots && (
          <Image
            src="/extras/bg-dots.png"
            alt="BG Dots"
            className="pointer-events-none absolute -top-2 -right-4 -bottom-2 -left-4 z-0 h-full w-full object-cover mix-blend-overlay select-none"
            width={382}
            height={137}
          />
        )}
      </div>
    </div>
  )
}
