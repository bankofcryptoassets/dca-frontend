'use client'
import { Button } from '@heroui/react'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { useAccount, useConnect, useSignMessage } from 'wagmi'

export const Login = () => {
  const { isConnected, address, chain, status } = useAccount()
  const { connect } = useConnect()
  const {
    signMessage,
    isPending,
    data,
    error,
    context,
    failureReason,
    status: signMessageStatus,
  } = useSignMessage()

  const handleConnect = () => {
    connect({ connector: farcasterMiniApp() })
  }

  const handleSignMessage = () => {
    signMessage({ message: 'hello world' })
  }

  console.log('Wallet DATA', {
    isConnected,
    address,
    chain,
    data,
    error,
    isPending,
    context,
    status,
    failureReason,
    signMessageStatus,
  })

  if (isConnected) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="mb-2 text-sm text-gray-600">Connected account:</div>
          <div className="rounded bg-gray-100 p-2 font-mono text-sm">
            {address}
          </div>
        </div>

        <div className="space-y-2">
          <Button
            fullWidth
            color="primary"
            variant="shadow"
            className="w-full border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
            onPress={handleSignMessage}
            isLoading={isPending}
          >
            {isPending ? 'Signing...' : 'Sign message'}
          </Button>

          {data && (
            <div className="mt-4 rounded border border-green-200 bg-green-50 p-3">
              <div className="mb-1 text-sm font-medium text-green-800">
                Signature:
              </div>
              <div className="font-mono text-xs break-all text-green-700">
                {data}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 p-3">
              <div className="mb-1 text-sm font-medium text-red-800">
                Error:
              </div>
              <div className="text-sm text-red-700">{error.message}</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Button
      fullWidth
      color="primary"
      variant="shadow"
      className="border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
      onPress={handleConnect}
    >
      Connect with Farcaster Wallet
    </Button>
  )
}
