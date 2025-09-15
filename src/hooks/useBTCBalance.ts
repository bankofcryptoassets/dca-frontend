import { CONTRACT_ADDRESSES } from '@/utils/constants'
import { MAIN_ABI } from '@/utils/contracts'
import { useAccount, useReadContract } from 'wagmi'

export const useBTCBalance = () => {
  const { address } = useAccount()
  return useReadContract({
    address: CONTRACT_ADDRESSES.MAIN,
    abi: MAIN_ABI,
    functionName: 'usersBalance',
    // args: ['0x89c4c3c1EEAb2922626218ce3a5D9B2F52215F2e'],
    args: [address!],
    query: { enabled: !!address },
  })
}
