import { CONTRACT_ADDRESSES } from '@/utils/constants'
import { ERC20_ABI } from '@/utils/contracts'
import { web3 } from '@/utils/web3'
import { parseUnits } from 'viem'
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

export const useApproval = () => {
  const { address } = useAccount()

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACT_ADDRESSES.USDC,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESSES.MAIN] : undefined,
    query: { enabled: !!address },
  })

  const { writeContractAsync: writeApprove } = useWriteContract()
  const { isLoading: isApproving, isSuccess: isApproved } =
    useWaitForTransactionReceipt()

  const approveAmount = async (amount: number) => {
    try {
      if (!address) throw new Error('Please connect your wallet')
      const parsedAmount = parseUnits(amount.toString(), 6)
      if (allowance && allowance >= parsedAmount) return true
      const hash = await writeApprove({
        address: CONTRACT_ADDRESSES.USDC,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.MAIN, parsedAmount],
      })
      if (!hash) throw new Error('Transaction failed')
      const receipt = await web3.waitForTransactionReceipt({ hash })
      if (receipt?.status !== 'success') throw new Error('Transaction failed')
      refetchAllowance()
      return true
    } catch {
      return false
    }
  }

  return { approveAmount, isApproving, isApproved, allowance }
}
