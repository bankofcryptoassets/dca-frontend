'use client'
import GradientBorderCard from '@/components/GradientBorderCard'
import { HeroBitcoinAnimation } from '@/components/HeroBitcoinAnimation'
import {
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
import { useEffect, useState } from 'react'
import InlineSVG from 'react-inlinesvg'
import { IoIosInformationCircle } from 'react-icons/io'

export default function CreatePage() {
  const [step, setStep] = useState<0 | 1 | 2>(0)

  const handleNextStep = () => {
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

  const [selected, setSelected] = useState<'daily' | 'weekly'>('daily')
  const [selectedTokens, setSelectedTokens] = useState<string[]>([])
  const [exitFee, setExitFee] = useState(2)

  const handleSelectToken = (token: string) => {
    setSelectedTokens((prev) => {
      if (prev.includes(token)) {
        return prev.filter((t) => t !== token)
      }
      return [...prev, token]
    })
  }

  return (
    <div className="space-y-10">
      <Image
        src="/extras/bg-dots-primary.png"
        alt="Create Background"
        width={400}
        height={480}
        className="absolute top-16 right-0 left-0 z-0 w-full select-none"
      />

      <div className="mt-5 grid place-items-center">
        <HeroBitcoinAnimation playReverse={step === 1} />
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-5">
        <div className="text-lg">{TITLES[step]}</div>

        <GradientBorderCard className="pb-6">
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="btc-goal" className="text-sm">
                  BTC Goal
                </label>
                <NumberInput
                  classNames={{ inputWrapper: 'rounded-xl' }}
                  fullWidth
                  id="btc-goal"
                  placeholder="0.05"
                  min={0.00000001}
                  max={10000}
                  step={0.000001}
                  variant="faded"
                  size="sm"
                  color="primary"
                  endContent={
                    <span className="text-foreground/50 text-sm">BTC</span>
                  }
                  isWheelDisabled
                  hideStepper
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm">
                  At what frequency you want to invest
                </label>

                <Tabs
                  className="w-full"
                  classNames={{
                    tabList:
                      'w-full bg-foreground/10 rounded-xl border border-foreground/10',
                    tab: 'rounded-lg',
                    tabContent:
                      'text-foreground group-data-[selected=true]:text-primary group-data-[selected=true]:font-medium',
                    cursor: 'bg-primary/10!',
                  }}
                  aria-label="Options"
                  selectedKey={selected}
                  onSelectionChange={(key) =>
                    setSelected(key as 'daily' | 'weekly')
                  }
                >
                  <Tab key="daily" title="Daily" />
                  <Tab key="weekly" title="Weekly" />
                </Tabs>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pledged-money" className="text-sm">
                  Pledged Money
                </label>
                <NumberInput
                  classNames={{ inputWrapper: 'rounded-xl' }}
                  fullWidth
                  id="pledged-money"
                  placeholder="500"
                  min={0.1}
                  max={1000000}
                  step={1}
                  variant="faded"
                  size="sm"
                  color="primary"
                  endContent={
                    <span className="text-foreground/50 text-sm">$</span>
                  }
                  isWheelDisabled
                  hideStepper
                />
              </div>

              <div className="flex items-center gap-2.5 rounded-full bg-[radial-gradient(50%_495.17%_at_50%_50%,_rgba(255,_255,_255,_0.1)_0%,_rgba(153,_153,_153,_0.1)_100%)] px-3 py-1.5">
                <span className="h-px w-full rotate-180 bg-[linear-gradient(90deg,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-10"></span>
                <span className="text-foreground/50 w-full flex-1 flex-shrink-0 text-xs whitespace-nowrap">
                  It will take <span className="text-foreground">24 days</span>{' '}
                  to reach your goal
                </span>
                <span className="h-px w-full bg-[linear-gradient(90deg,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-10"></span>
              </div>

              <Divider className="bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

              <div className="flex flex-col gap-2">
                <label className="text-sm">Select Tokens to Convert</label>
                <div className="flex flex-wrap gap-1">
                  {['ETH', 'USDC', 'ZORA', 'WETH'].map((token) => (
                    <Chip
                      key={token}
                      color={
                        selectedTokens.includes(token) ? 'primary' : 'default'
                      }
                      variant="faded"
                      className={cn(
                        'cursor-pointer border-1',
                        selectedTokens.includes(token) &&
                          'bg-primary/10 border-primary'
                      )}
                      onClick={() => handleSelectToken(token)}
                    >
                      {token}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-2">
                <label htmlFor="convert-dust-tokens" className="text-sm">
                  Convert dust tokens to BTC
                </label>
                <NumberInput
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
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="time-delay"
                  className="flex items-center gap-2 text-sm"
                >
                  Time Delay
                  <Tooltip content="Time Delay">
                    <IoIosInformationCircle className="text-foreground/50 size-4" />
                  </Tooltip>
                </label>
                <NumberInput
                  classNames={{ inputWrapper: 'rounded-xl' }}
                  fullWidth
                  id="time-delay"
                  placeholder="Days to get your money after withdrawal"
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

              <Divider className="bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

              <div className="flex flex-col gap-4">
                <label
                  htmlFor="exit-fee"
                  className="flex items-center gap-2 text-sm"
                >
                  Exit Fee
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
                    <span>Multiplier</span>
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

              <div className="text-foreground/50 rounded-full bg-[radial-gradient(50%_495.17%_at_50%_50%,_rgba(255,_255,_255,_0.1)_0%,_rgba(153,_153,_153,_0.1)_100%)] px-3 py-1.5 text-center text-xs">
                Those who leave early pays rewards
                <br />
                to those who stay
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="my-4 flex flex-col gap-5 text-sm">
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">BTC Goal</div>
                <div>0.5 BTC</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Pledged Money</div>
                <div>$25</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Frequency</div>
                <div>Weekly</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Withdrawal Time Delay</div>
                <div>30 Days</div>
              </div>

              <Divider className="bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

              <div className="text-foreground/50 text-center">
                Maintain your streak to unlock rewards
              </div>
            </div>
          )}
        </GradientBorderCard>

        <Button
          onPress={handleNextStep}
          color="primary"
          size="lg"
          variant="shadow"
          className="w-full border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
          endContent={
            step === 2 ? (
              <InlineSVG src="/icons/check.svg" />
            ) : (
              <InlineSVG src="/icons/arrow-right.svg" />
            )
          }
        >
          {step === 2 ? 'Accept & Confirm' : 'Next'}
        </Button>

        {step !== 0 && (
          <Button
            color="primary"
            variant="light"
            className="-mt-2 w-full text-base font-medium"
            onPress={handleBackStep}
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
