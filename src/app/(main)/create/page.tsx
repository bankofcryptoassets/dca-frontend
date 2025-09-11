'use client'
import GradientBorderCard from '@/components/GradientBorderCard'
import { HeroBitcoinAnimation } from '@/components/HeroBitcoinAnimation'
import {
  addToast,
  Button,
  Chip,
  cn,
  Divider,
  NumberInput,
  Slider,
  Tab,
  Tabs,
  Tooltip,
} from '@heroui/react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import InlineSVG from 'react-inlinesvg'
import { IoIosInformationCircle } from 'react-icons/io'
import { useBtcPrice, useCreatePlan } from '@/utils/api'
import { useApproval } from '@/utils/useApproval'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

export default function CreatePage() {
  const { address } = useAccount()
  const { data: btcPrice } = useBtcPrice()
  const btcPriceValue = useMemo(
    () => btcPrice?.data?.convertedPrice,
    [btcPrice]
  )
  const { approveAmount, isApproving } = useApproval()
  const { mutateAsync: createPlan, isPending: isCreating } = useCreatePlan()
  const [creating, setCreating] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const [step, setStep] = useState<0 | 1 | 2>(0)

  const handleNextStep = async () => {
    if (step === 0) {
      if (!selectedBtcTarget)
        return addToast({ title: 'Please enter a BTC target', color: 'danger' })
      if (!selectedContributionAmount)
        return addToast({
          title: 'Please enter a contribution amount',
          color: 'danger',
        })
    }

    if (step === 2) {
      if (!address)
        return addToast({
          title: 'Please connect your wallet',
          color: 'danger',
        })
      if (!selectedBtcTarget)
        return addToast({
          title: 'Please go back and enter a BTC target',
          color: 'danger',
        })
      if (!selectedContributionAmount)
        return addToast({
          title: 'Please go back and enter a contribution amount',
          color: 'danger',
        })

      try {
        setCreating(true)
        // get approval
        const approved = await approveAmount(selectedContributionAmount!)
        // if not approved, show error
        if (!approved)
          return addToast({
            title: 'Transaction failed',
            description: 'Please try again later or contact support',
            color: 'danger',
          })
        // if approved, create plan
        const created = await createPlan({
          wallet: address,
          planType: selectedCadence,
          amount: selectedContributionAmount,
          target: selectedBtcTarget,
        })
        // if not created, show error
        if (!created?.success)
          return addToast({
            title: 'Plan creation failed',
            description: 'Please try again later or contact support',
            color: 'danger',
          })
        // if created, show success and redirect to home
        addToast({ title: 'Plan created successfully', color: 'success' })
        queryClient.invalidateQueries({ queryKey: ['plan'] })
        return router.push('/home')
      } catch {
        return addToast({
          title: 'Create plan failed',
          description: 'Please try again later or contact support',
          color: 'danger',
        })
      } finally {
        setCreating(false)
      }
    }

    setStep((prev) => (prev === 0 ? 1 : prev === 1 ? 2 : 2))
  }

  const handleBackStep = () => {
    setStep((prev) => (prev === 0 ? 0 : prev === 1 ? 0 : 1))
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [step])

  const [selectedCadence, setSelectedCadence] = useState<'daily' | 'weekly'>(
    'daily'
  )
  // const [selectedTokens, setSelectedTokens] = useState<string[]>(['USDC'])
  const [selectedTokens] = useState<string[]>(['USDC'])
  const [exitFee, setExitFee] = useState(2)
  const [selectedBtcTarget, setSelectedBtcTarget] = useState<number>()
  const [selectedContributionAmount, setSelectedContributionAmount] =
    useState<number>()

  const daysToReachGoal = useMemo(() => {
    if (!selectedBtcTarget || !btcPriceValue || !selectedContributionAmount)
      return 0
    // Calculate the total USD value needed to reach the BTC goal
    const totalUSDNeeded = selectedBtcTarget * btcPriceValue
    // Calculate how many contributions are needed
    const numberOfContributions = Math.ceil(
      totalUSDNeeded / selectedContributionAmount
    )
    // Calculate days based on cadence
    if (selectedCadence === 'weekly') return numberOfContributions * 7
    if (selectedCadence === 'daily') return numberOfContributions
    return 0
  }, [
    selectedBtcTarget,
    btcPriceValue,
    selectedContributionAmount,
    selectedCadence,
  ])

  // const handleSelectToken = (token: string) => {
  //   setSelectedTokens((prev) => {
  //     if (prev.includes(token)) {
  //       return prev.filter((t) => t !== token)
  //     }
  //     return [...prev, token]
  //   })
  // }

  return (
    <div className="space-y-10">
      <Image
        src="/extras/bg-dots-primary.png"
        alt="Create Background"
        width={400}
        height={480}
        className="pointer-events-none absolute top-16 right-0 left-0 z-0 w-full [mask-image:linear-gradient(to_bottom,_rgba(0,0,0,1)_0%,_rgba(0,0,0,1)_80%,_rgba(0,0,0,0)_100%)] select-none"
        priority
      />

      <div className="mt-5 grid place-items-center">
        <HeroBitcoinAnimation playReverse={step === 1} />
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-6">
        <div className="text-lg">{TITLES[step]}</div>

        <GradientBorderCard
          className={cn('pb-6', !!SUBTITLES[step] && 'pt-12')}
        >
          {!!SUBTITLES[step] && (
            <div className="text-background absolute -top-0.5 right-0 left-0">
              <InlineSVG
                src="/extras/title-strip.svg"
                className="max-h-6 w-full"
              />
              <span className="absolute top-1 right-0 left-0 text-center text-[11px] font-semibold text-[#452B0B]">
                {SUBTITLES[step]}
              </span>
            </div>
          )}

          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-[#FFCA800F] px-3.5 py-3">
                <label htmlFor="btc-goal" className="text-sm">
                  Choose Your BTC Target
                </label>
                <NumberInput
                  aria-label="BTC Goal"
                  classNames={{ inputWrapper: 'rounded-xl bg-[#00000080]' }}
                  fullWidth
                  id="btc-goal"
                  placeholder="0.05"
                  minValue={0.00000001}
                  maxValue={100000000}
                  step={0.0001}
                  variant="faded"
                  formatOptions={{ maximumFractionDigits: 4 }}
                  size="sm"
                  color="primary"
                  endContent={
                    <span className="text-foreground/50 text-sm">BTC</span>
                  }
                  isWheelDisabled
                  hideStepper
                  value={selectedBtcTarget}
                  onValueChange={(value) => setSelectedBtcTarget(value)}
                />

                <div className="flex flex-wrap gap-1">
                  {PREDEFINED_BTC_TARGETS.map((item) => (
                    <Chip
                      key={item.value}
                      color={
                        selectedBtcTarget === item.value ? 'primary' : 'default'
                      }
                      variant="faded"
                      className={cn(
                        'cursor-pointer border-1 transition-colors',
                        selectedBtcTarget === item.value &&
                          'bg-primary/10 border-primary'
                      )}
                      onClick={() => setSelectedBtcTarget(item.value)}
                    >
                      {item.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-[#FFCA800F] px-3.5 py-3">
                <label className="text-sm">
                  How Often Do You Want to Invest?
                </label>

                <Tabs
                  className="w-full"
                  classNames={{
                    tabList:
                      'w-full rounded-xl border border-foreground/10 bg-[#00000080]',
                    tab: 'rounded-lg',
                    tabContent:
                      'text-foreground group-data-[selected=true]:text-primary group-data-[selected=true]:font-medium',
                    cursor: 'bg-primary/10!',
                  }}
                  aria-label="Options"
                  selectedKey={selectedCadence}
                  onSelectionChange={(key) =>
                    setSelectedCadence(key as 'daily' | 'weekly')
                  }
                >
                  <Tab key="daily" title="Daily" />
                  <Tab key="weekly" title="Weekly" />
                </Tabs>
              </div>

              <div className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-[#FFCA800F] px-3.5 py-3">
                <label htmlFor="pledged-money" className="text-sm">
                  Set Your Contribution Amount
                </label>
                <NumberInput
                  aria-label="Contribution Amount"
                  classNames={{ inputWrapper: 'rounded-xl bg-[#00000080]' }}
                  fullWidth
                  id="pledged-money"
                  placeholder="500"
                  min={0.01}
                  max={1000000}
                  step={0.01}
                  formatOptions={{ maximumFractionDigits: 2 }}
                  variant="faded"
                  size="sm"
                  color="primary"
                  endContent={
                    <span className="text-foreground/50 text-sm">$</span>
                  }
                  isWheelDisabled
                  hideStepper
                  value={selectedContributionAmount}
                  onValueChange={(value) =>
                    setSelectedContributionAmount(value)
                  }
                />
                <div className="flex flex-wrap gap-1">
                  {PREDEFINED_CONTRIBUTION_AMOUNTS.map((item) => (
                    <Chip
                      key={item.value}
                      color={
                        selectedContributionAmount === item.value
                          ? 'primary'
                          : 'default'
                      }
                      variant="faded"
                      className={cn(
                        'cursor-pointer border-1 transition-colors',
                        selectedContributionAmount === item.value &&
                          'bg-primary/10 border-primary'
                      )}
                      onClick={() => setSelectedContributionAmount(item.value)}
                    >
                      {item.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-full bg-[radial-gradient(50%_495.17%_at_50%_50%,_rgba(255,_255,_255,_0.1)_0%,_rgba(153,_153,_153,_0.1)_100%)] px-3 py-1.5">
                <span className="h-px w-full rotate-180 bg-[linear-gradient(90deg,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-10"></span>
                <span className="text-foreground/50 w-full flex-1 flex-shrink-0 text-xs whitespace-nowrap">
                  It will take{' '}
                  <span className="text-foreground">
                    {daysToReachGoal} days
                  </span>{' '}
                  to reach your goal
                </span>
                <span className="h-px w-full bg-[linear-gradient(90deg,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-10"></span>
              </div>

              <Divider className="bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

              <div className="flex flex-col gap-2.5">
                <label className="text-sm">Choose Tokens to Convert</label>
                <div className="flex flex-wrap gap-1">
                  {['USDC', 'ETH', 'ZORA', 'WETH'].map((token) => (
                    <Tooltip
                      key={token}
                      // TODO: Coming Soon
                      content={token === 'USDC' ? undefined : 'Coming Soon'}
                      isDisabled={token === 'USDC'}
                      color="primary"
                    >
                      <Chip
                        color={
                          selectedTokens.includes(token) ? 'primary' : 'default'
                        }
                        variant="faded"
                        className={cn(
                          'cursor-pointer border-1 transition-colors',
                          selectedTokens.includes(token) &&
                            'bg-primary/10 border-primary',
                          token !== 'USDC' && 'opacity-60'
                        )}
                      >
                        {token}
                      </Chip>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-2">
                <label
                  htmlFor="convert-dust-tokens"
                  className="text-foreground/75 text-sm"
                >
                  Auto-convert small balances to BTC (set limit)
                </label>

                {/** TODO: Coming Soon */}
                <Tooltip content="Coming Soon" color="primary">
                  <div>
                    <NumberInput
                      aria-label="Convert Dust Tokens"
                      className="max-w-24"
                      classNames={{ inputWrapper: 'rounded-xl max-w-24' }}
                      id="convert-dust-tokens"
                      placeholder="50"
                      min={0.1}
                      max={1000000}
                      step={1}
                      variant="faded"
                      size="sm"
                      color="primary"
                      startContent={
                        <span className="text-foreground/50 text-sm">$</span>
                      }
                      isWheelDisabled
                      hideStepper
                      isDisabled
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              {/** TODO: Coming Soon */}
              <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10 flex cursor-not-allowed items-center justify-center select-none">
                <Button
                  color="primary"
                  size="lg"
                  variant="shadow"
                  className="pointer-events-none cursor-not-allowed border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
                  disabled
                >
                  Earn Rewards Coming Soon
                </Button>
              </div>

              <div className="pointer-events-none flex cursor-not-allowed flex-col gap-6 blur-sm select-none">
                <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#FFCA800F] px-3.5 py-3">
                  <label
                    htmlFor="time-delay"
                    className="flex items-center gap-2 text-sm"
                  >
                    Choose Lockup Period
                    <Tooltip content="Time Delay">
                      <IoIosInformationCircle className="text-foreground/50 size-4" />
                    </Tooltip>
                  </label>
                  <NumberInput
                    classNames={{ inputWrapper: 'rounded-xl bg-[#00000080]' }}
                    fullWidth
                    id="time-delay"
                    placeholder="Set withdrawal lockup to prevent impulse moves"
                    min={1}
                    max={1000}
                    step={1}
                    variant="faded"
                    size="sm"
                    color="primary"
                    isWheelDisabled
                    hideStepper
                  />
                </div>

                <GradientBorderCard
                  wrapperClassName="rounded-b-none"
                  className="text-primary flex items-center justify-center gap-2.5 rounded-b-none bg-[linear-gradient(180deg,_rgba(247,_147,_26,_0.2)_0%,_rgba(247,_147,_26,_0.02)_100%)] py-3 text-xs"
                >
                  <InlineSVG src="/extras/airdrop.svg" />
                  <span>Pledgers will be eligible for our future airdrops</span>
                </GradientBorderCard>

                {/* <Divider className="bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" /> */}

                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="exit-fee"
                    className="flex items-center gap-2 text-sm"
                  >
                    Choose Early Exit Penalty
                    <Tooltip content="Exit Fee">
                      <IoIosInformationCircle className="text-foreground/50 size-4" />
                    </Tooltip>
                  </label>

                  <div className="flex items-center gap-5">
                    <div className="text-foreground text-[40px] leading-none">
                      {exitFee}%
                    </div>
                    <div className="bg-primary flex items-center gap-1 rounded-full border border-[#452B0B] px-2 py-1 text-xs font-semibold text-[#452B0B]">
                      <Image
                        src="/icons/asteroid.svg"
                        alt="Asteroid"
                        width={16}
                        height={16}
                      />
                      <span>{exitFee}x</span>
                      <span>REWARD MULTIPLIER</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs">0%</div>
                    <Slider
                      // @ts-expect-error - False Error
                      color="default"
                      value={exitFee}
                      onChange={(value) => setExitFee(value as number)}
                      maxValue={10}
                      minValue={0}
                      step={1}
                      id="exit-fee"
                      classNames={{
                        base: 'w-full',
                        trackWrapper: '',
                        track: 'border-3 border-transparent bg-foreground/20',
                        filler: 'bg-primary rounded-full',
                        thumb:
                          'bg-primary/30 backdrop-blur-xs size-7 after:bg-primary/30 after:backdrop-blur-xs after:text-[10px] after:text-[#452B0B] after:size-6 after:grid after:place-items-center after:content-[var(--data-value)]',
                      }}
                      style={
                        {
                          '--data-value': `"${exitFee || 0}%"`,
                        } as React.CSSProperties
                      }
                    />
                    <div className="text-xs">10%</div>
                  </div>
                </div>

                <div className="my-4 bg-[radial-gradient(50%_495.17%_at_50%_50%,_#F7931A_0%,_rgba(247,_147,_26,_0)_100%)] p-px">
                  <div className="text-foreground/50 bg-background/70 px-3 py-4 text-center text-xs backdrop-blur-xl">
                    If you leave early, your fee will reward those who stay.
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="my-4 flex flex-col gap-5 text-sm">
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">BTC Target</div>
                <div>{selectedBtcTarget} BTC</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Committed Amount</div>
                <div>${selectedContributionAmount}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Frequency</div>
                <div className="capitalize">{selectedCadence}</div>
              </div>

              {/** TODO: Coming Soon */}
              {/* <div className="flex items-center justify-between">
                <div className="text-foreground/50">Withdrawal Lockup</div>
                <div>30 Days</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Exit Penalty Set</div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 rounded-full bg-[#F7931A] px-1.5 py-0.5 text-[9px] font-semibold text-[#452B0B]">
                    <InlineSVG src="/icons/asteroid.svg" />
                    <span>2x</span>
                    <span className="opacity-70">REWARD MULTIPLIER</span>
                  </span>
                  <span>2%</span>
                </div>
              </div> */}

              <Divider className="bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

              {/** TODO: Coming Soon */}
              <div className="text-foreground/50 text-center">
                Maintain your streak to unlock rewards (Coming Soon)
              </div>
            </div>
          )}
        </GradientBorderCard>

        <div className="flex w-full gap-2">
          {/** TODO: Coming Soon */}
          {/* {step === 1 && (
            <Button
              onPress={handleNextStep}
              color="primary"
              size="lg"
              variant="bordered"
              className="w-full gap-1 border-2 border-[#F6921A] text-sm font-medium"
            >
              Continue <span className="text-[9px]">(Without Rewards)</span>
            </Button>
          )} */}
          <Button
            onPress={handleNextStep}
            color="primary"
            size="lg"
            variant="shadow"
            className={cn(
              'w-full border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium',
              step === 1 && 'text-sm'
            )}
            endContent={
              step === 2 ? (
                <InlineSVG src="/icons/check.svg" />
              ) : (
                <InlineSVG
                  src="/icons/arrow-right.svg"
                  className="flex-shrink-0"
                />
              )
            }
            isLoading={isCreating || isApproving || creating}
          >
            {BUTTON_TITLES[step]}
          </Button>
        </div>

        {step !== 0 && (
          <Button
            color="primary"
            variant="light"
            className="-mt-2 w-full text-base font-medium"
            onPress={handleBackStep}
            isLoading={isCreating || isApproving || creating}
          >
            Back
          </Button>
        )}

        <div className="flex items-center gap-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className={cn(
                'bg-foreground/15 h-1 w-9 rounded-full',
                step === item && 'bg-foreground'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const TITLES = ['Create Plan', 'Set Pledge', 'Review Plan']
const SUBTITLES = [
  'Start Your Bitcoin Ownership Journey',
  'Commit to your target and earn rewards.',
  '',
]
const BUTTON_TITLES = [
  'Continue',
  // 'Confirm Pledge', // TODO: Coming Soon
  'Continue',
  'Start My BTC Ownership Journey',
]
const PREDEFINED_BTC_TARGETS = [
  { value: 0.1, label: '0.1' },
  { value: 0.01, label: '1M sats' },
  { value: 0.05, label: '0.05' },
  { value: 0.5, label: '0.5' },
]

const PREDEFINED_CONTRIBUTION_AMOUNTS = [
  { value: 1, label: '$1' },
  { value: 5, label: '$5' },
  { value: 10, label: '$10' },
  { value: 100, label: '$100' },
]
