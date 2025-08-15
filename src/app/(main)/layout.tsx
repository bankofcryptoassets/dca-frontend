'use client'
import { Button, cn } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiBolt } from 'react-icons/hi2'
import InlineSVG from 'react-inlinesvg'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      <div className="bg-background/10 flex items-center justify-between px-5 py-8 backdrop-blur-3xl">
        <Image src="/logo.svg" alt="Logo" width={75} height={17} />

        <Button
          color="primary"
          variant="shadow"
          className="bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
          startContent={<HiBolt />}
        >
          23 Days
        </Button>
      </div>

      <div className="w-full px-5 pt-7 pb-30">{children}</div>

      <div className="bg-foreground/10 absolute right-5 bottom-5 left-5 flex h-17.5 items-center justify-evenly rounded-full backdrop-blur-2xl">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-foreground/75 flex flex-col items-center gap-1.5 text-sm transition-colors',
              pathname === item.href && 'text-primary'
            )}
          >
            <span className="size-3.5">
              <InlineSVG src={item.icon} className="size-full" />
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}

const MENU_ITEMS = [
  { href: '/home', icon: '/icons/home.svg', label: 'Home' },
  { href: '/activity', icon: '/icons/activity.svg', label: 'Activity' },
  { href: '/settings', icon: '/icons/settings.svg', label: 'Settings' },
]
