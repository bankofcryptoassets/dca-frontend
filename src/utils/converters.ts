import { DEFAULT_BTC_PRICE } from './constants'

export const convertToBTC = (amount?: number, btcPrice?: number) => {
  if (!amount) return 0
  if (!btcPrice) return (btcPrice = DEFAULT_BTC_PRICE)
  return Number.parseFloat((amount / btcPrice)?.toFixed(8) ?? 0)
}

export const getDaysToReachGoal = (
  cadence?: 'daily' | 'weekly',
  target?: number,
  amount?: number,
  btcPrice?: number
) => {
  if (!target || !btcPrice || !amount) return 0
  // Calculate the total USD value needed to reach the BTC goal
  const totalUSDNeeded = target * btcPrice
  // Calculate how many contributions are needed
  const numberOfContributions = Math.ceil(totalUSDNeeded / amount)
  // Calculate days based on cadence
  if (cadence === 'weekly') return numberOfContributions * 7
  if (cadence === 'daily') return numberOfContributions
  return 0
}

export const calculateApprovalAmount = (
  btcAmount: number,
  btcPrice?: number
) => {
  if (!btcPrice) btcPrice = DEFAULT_BTC_PRICE
  return btcAmount * btcPrice * 2
}
