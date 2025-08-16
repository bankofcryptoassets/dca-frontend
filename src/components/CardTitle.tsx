'use client'
import { cn } from '@heroui/react'

export const CardTitle = ({
  title,
  className,
  icon,
  iconClassName,
}: {
  title: string
  className?: string
  icon?: React.ReactNode
  iconClassName?: string
}) => {
  return (
    <h3
      className={cn(
        'text-foreground/70 flex max-w-[200px] items-center gap-2 rounded-full bg-[linear-gradient(99.03deg,_rgba(255,_255,_255,_0.1)_6.85%,_rgba(255,_255,_255,_0)_93.15%)] p-1.5 text-xs font-semibold tracking-[4%]',
        className
      )}
    >
      {!!icon && (
        <span
          className={cn(
            'grid size-6 place-items-center rounded-full bg-[linear-gradient(102.3deg,_rgba(247,_147,_26,_0.1)_3.94%,_rgba(247,_147,_26,_0.07)_100%)]',
            iconClassName
          )}
        >
          {icon}
        </span>
      )}
      {title}
    </h3>
  )
}
