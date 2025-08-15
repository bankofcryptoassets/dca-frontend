'use client'
import { HeroUIProvider } from '@heroui/react'

type Props = { children: React.ReactNode }

export const ThemeProviders = ({ children }: Props) => {
  return <HeroUIProvider>{children}</HeroUIProvider>
}
