'use client'
import { Button } from '@heroui/react'
import InlineSVG from 'react-inlinesvg'

export default function Home() {
  return (
    <div className="abcd grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <InlineSVG src="/logo.svg" className="h-8 w-auto" />
        <Button color="primary" variant="shadow" fullWidth size="lg">
          Click me
        </Button>
      </main>
    </div>
  )
}
