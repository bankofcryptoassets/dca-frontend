'use client'
import { Spinner } from '@heroui/react'

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-10000000 h-full w-full">
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner
          color="primary"
          size="lg"
          classNames={{ wrapper: 'size-12' }}
        />
      </div>
    </div>
  )
}
