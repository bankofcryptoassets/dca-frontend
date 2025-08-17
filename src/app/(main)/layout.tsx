'use client'
import { Button, cn } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HiBolt } from 'react-icons/hi2'
import InlineSVG from 'react-inlinesvg'

const hideButtons = ['/create']

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isHideButton = hideButtons.includes(pathname)

  return (
    <>
      <div className="bg-background/10 sticky top-0 z-10 flex min-h-22 items-center justify-between px-5 py-6 backdrop-blur-3xl">
        <Image src="/logo.svg" alt="Logo" width={88} height={20} />

        {!isHideButton && (
          <Button
            color="primary"
            variant="shadow"
            className="bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
            startContent={<HiBolt />}
            onPress={() => {
              router.push('/create')
            }}
          >
            23 Days
          </Button>
        )}
      </div>

      <div className={cn('w-full px-5 pt-7 pb-28', isHideButton && 'pb-10')}>
        {children}
      </div>

      {!isHideButton && (
        <div className="bg-foreground/10 fixed right-5 bottom-5 left-5 z-10 flex h-18 items-center justify-evenly rounded-full backdrop-blur-2xl">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-foreground/75 flex flex-col items-center gap-2 text-base leading-none transition-colors',
                pathname === item.href && 'text-primary'
              )}
            >
              <span className="size-4">
                <InlineSVG src={item.icon} className="size-full" />
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

const MENU_ITEMS = [
  { href: '/home', icon: '/icons/home.svg', label: 'Home' },
  { href: '/activity', icon: '/icons/activity.svg', label: 'Activity' },
  { href: '/settings', icon: '/icons/settings.svg', label: 'Settings' },
]
