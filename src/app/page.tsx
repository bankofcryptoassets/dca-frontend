'use client'
import { Button } from '@heroui/react'
import Image from 'next/image'
import InlineSVG from 'react-inlinesvg'

export default function Home() {
  return (
    <div className="bg-background relative grid min-h-screen items-end justify-items-end">
      <Image
        src="/extras/main-bg.png"
        alt="Main Background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        fill
      />

      <main className="bg-background relative z-1 row-start-2 flex w-full flex-col items-center gap-15 px-10 pt-10 pb-15">
        <Image
          src="/extras/main-bg-arch.png"
          alt="Main Background Arch"
          width={400}
          height={75}
          className="absolute top-0 right-0 left-0 h-full max-h-18 w-full -translate-y-full"
        />

        <InlineSVG src="/logo.svg" className="h-7 w-auto" />

        <p className="text-center text-lg">
          Stack Bitcoin Every Day
          <br />
          Add Value to Your Name
        </p>

        <Button color="primary" variant="shadow" fullWidth>
          Plan Your Bitcoin Treasury
        </Button>
      </main>
    </div>
  )
}
