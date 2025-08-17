'use client'
import { CardTitle } from '@/components/CardTitle'
import GradientBorderCard from '@/components/GradientBorderCard'
import { Button, Chip, Divider, NumberInput, Progress } from '@heroui/react'
import InlineSVG from 'react-inlinesvg'
import { FaCheck, FaFlag, FaShareNodes } from 'react-icons/fa6'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/Drawer'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="space-y-3">
      {/* GOAL PROGRESS */}
      <GradientBorderCard className="pb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="GOAL PROGRESS"
              icon={<InlineSVG src="/icons/golf-hole.svg" className="size-4" />}
            />

            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  color="primary"
                  variant="bordered"
                  className="border-primary/20 h-9 rounded-full font-medium"
                >
                  Edit Amount
                </Button>
              </DrawerTrigger>

              <DrawerContent>
                <DrawerHeader className="px-5 pt-6 pb-0">
                  <DrawerTitle className="text-xl">Edit Amount</DrawerTitle>
                  <div className="flex flex-col items-center">
                    <div className="my-8 w-[200px] text-center">
                      <NumberInput
                        variant="underlined"
                        className="h-20 bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0)_0%,_rgba(255,_255,_255,_0.1)_100%)]"
                        classNames={{
                          input: 'h-20 text-center text-[40px]',
                          inputWrapper: 'h-20 border-foreground/20 border-b-2',
                          mainWrapper: 'h-20',
                        }}
                        defaultValue={50}
                        placeholder="$50.00"
                        formatOptions={{
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }}
                      />
                    </div>

                    <Chip
                      color="primary"
                      variant="flat"
                      className="text-primary text-sm"
                    >
                      ~0.0014 BTC at current price
                    </Chip>

                    <div className="text-foreground/50 mt-4 text-center text-sm">
                      Amount can only be increased. <br />
                      Commit responsibly
                    </div>
                  </div>

                  <Divider className="my-8 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />
                </DrawerHeader>

                <DrawerFooter className="px-5 pt-0 pb-10">
                  <Button
                    color="primary"
                    size="lg"
                    className="border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
                  >
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="text-[28px]">0.32 </span>
              <span className="text-foreground/50 text-sm">/0.5 BTC</span>
            </div>

            <Progress
              classNames={{
                base: 'h-3.5 border-3 border-foreground/20 rounded-full',
                track: 'bg-foreground/20',
                indicator: 'bg-[#F89820]',
              }}
              value={56}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-foreground/50 mb-0.5 text-xs">
                Est. Days Remaining
              </div>
              <div className="text-sm">58 Days</div>
            </div>

            <div className="flex items-center gap-2">
              <Chip
                color="default"
                variant="faded"
                className="text-foreground/70 px-0 text-xs"
              >
                56% Completed
              </Chip>

              <Button
                color="primary"
                size="sm"
                variant="bordered"
                className="h-7 gap-1 rounded-full border-1 px-2 font-medium"
                endContent={<FaShareNodes />}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </GradientBorderCard>

      {/* NEXT BTC PURCHASE */}
      <GradientBorderCard className="pb-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="NEXT BTC PURCHASE"
              icon={<InlineSVG src="/icons/calendar.svg" className="size-4" />}
            />

            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  color="primary"
                  variant="bordered"
                  className="border-primary/20 h-9 rounded-full font-medium"
                >
                  Prepay
                </Button>
              </DrawerTrigger>

              <DrawerContent>
                <DrawerHeader className="px-5 pt-6 pb-0">
                  <DrawerTitle className="text-xl">Prepay</DrawerTitle>
                  <div className="flex flex-col items-center">
                    <div className="my-8 w-[200px] text-center">
                      <NumberInput
                        variant="underlined"
                        className="h-20 bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0)_0%,_rgba(255,_255,_255,_0.1)_100%)]"
                        classNames={{
                          input: 'h-20 text-center text-[40px]',
                          inputWrapper: 'h-20 border-foreground/20 border-b-2',
                          mainWrapper: 'h-20',
                        }}
                        defaultValue={50}
                        placeholder="$50.00"
                        formatOptions={{
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }}
                      />
                    </div>

                    <Chip
                      color="primary"
                      variant="flat"
                      className="text-primary text-sm"
                    >
                      ~0.0014 BTC at current price
                    </Chip>

                    <div className="text-foreground/50 mt-4 text-center text-sm">
                      This covers 3 days of
                      <br />
                      Scheduled Payment
                    </div>
                  </div>

                  <Divider className="my-8 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />
                </DrawerHeader>

                <DrawerFooter className="px-5 pt-0 pb-10">
                  <Button
                    color="primary"
                    size="lg"
                    className="border-2 border-[#F6921A] bg-gradient-to-r from-[#F7931A] to-[#C46200] font-medium"
                  >
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="flex flex-col gap-3.5 text-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>23rd Oct, 2025</div>
                <div>$50.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Weekly</div>
                <div className="text-[#2DCA72]">Covered</div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>30th Oct, 2025</div>
                <div>$50.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-foreground/50">Weekly</div>
                <div className="text-foreground/50">Scheduled</div>
              </div>
            </div>
          </div>
        </div>
      </GradientBorderCard>

      {/* REWARDS EARNED */}
      <GradientBorderCard
        wrapperClassName="relative bg-[linear-gradient(180deg,_rgba(247,_147,_26,_0.192157)_14.78%,_#F7931A_92.41%)] "
        className="z-1 shadow-[0px_-22px_32.4px_0px_#F7931A_inset]"
      >
        <Image
          src="/extras/bg-dots-rewards.png"
          alt="BG Dots"
          className="pointer-events-none absolute -top-8 right-0 bottom-0 left-0 z-0 h-full w-full object-cover mix-blend-lighten select-none"
          width={382}
          height={280}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="REWARDS EARNED"
              icon={<InlineSVG src="/icons/gift.svg" className="size-4" />}
            />

            <div className="flex items-center gap-2">
              <Button
                color="primary"
                size="sm"
                className="text-primary w-auto min-w-auto gap-1 rounded-full bg-transparent bg-[linear-gradient(90deg,_rgba(247,_147,_26,_0)_0%,_rgba(247,_147,_26,_0.5)_100%)] px-2 font-medium"
                startContent={
                  <InlineSVG
                    src="/icons/bolt.svg"
                    className="text-primary size-4"
                  />
                }
              >
                23 Days
              </Button>

              <Button
                color="primary"
                size="sm"
                className="bg-primary w-auto min-w-auto gap-1 rounded-full border border-[#452B0B] px-2 font-bold text-[#452B0B]"
                startContent={
                  <InlineSVG src="/icons/asteroid.svg" className="size-4" />
                }
              >
                2x
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[28px] leading-tight">0.02 BTC</div>

            <div className="w-full rounded-[10px] border border-white/5 bg-[linear-gradient(90deg,_rgba(255,_215,_167,_0.05)_0%,_rgba(119,_119,_119,_0.1)_100%)] p-2.5 backdrop-blur-2xl">
              <div className="mb-2.5 flex items-center px-1">
                <div className="bg-primary grid size-7 flex-shrink-0 place-items-center rounded-full">
                  <FaCheck className="size-3.5 text-[#452B0B]" />
                </div>

                <Progress
                  size="sm"
                  classNames={{
                    base: 'rounded-none',
                    track: 'bg-[#34312F] rounded-none',
                    indicator:
                      'bg-[linear-gradient(90deg,_#E08016_0%,_#FFBE77_100%)]',
                  }}
                  value={40}
                />

                <div className="grid size-7 flex-shrink-0 place-items-center rounded-full bg-[#34312F]">
                  <FaFlag className="text-primary size-3" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 text-center text-xs">
                <div>Day 20</div>
                <div className="text-foreground/50 text-[10px]">
                  Next Milestone in 4 Days. Keep going
                </div>
                <div>Day 40</div>
              </div>
            </div>
          </div>
        </div>
      </GradientBorderCard>

      <Divider className="my-4 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

      {/* DUST SWAP */}
      <GradientBorderCard bgGradient bgDots>
        <div className="relative z-1 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="DUST SWAP"
              icon={<InlineSVG src="/icons/coin-swap.svg" className="size-4" />}
            />
          </div>

          <div>
            <span className="text-[28px]">$0.53 </span>
            <span className="text-foreground/50 text-sm"> ~ 3 Less Days</span>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <Button
              variant="bordered"
              size="sm"
              className="border-foreground/10 bg-foreground/5 text-foreground/90 rounded-full text-xs font-medium backdrop-blur-xs"
            >
              Dust Swap to BTC
            </Button>
          </div>
        </div>
      </GradientBorderCard>

      <Divider className="my-4 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

      {/* RISK MANAGEMENT */}
      <GradientBorderCard wrapperClassName="bg-[linear-gradient(180deg,_#FF4038_0%,_rgba(255,_64,_56,_0.1)_100%)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              title="RISK MANAGEMENT"
              icon={
                <InlineSVG
                  src="/icons/caution.svg"
                  className="size-4 text-[#FF4038]"
                />
              }
              iconClassName="bg-[linear-gradient(102.3deg,_rgba(255,_255,_255,_0.1)_3.94%,_rgba(255,_255,_255,_0.07)_100%)]"
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="text-foreground/50">Withdrawal Delay:</div>
            <div>30 Days</div>
          </div>

          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="text-foreground/50">Current penalty:</div>
            <div>0.095 BTC</div>
          </div>

          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="text-foreground/50">Early Withdrawal Amount</div>
            <div>0.495 BTC</div>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                color="danger"
                variant="bordered"
                className="mt-4 border-[#FF4038]/10 bg-[#FF4038]/10 font-medium"
              >
                Do Early Withdraw
              </Button>
            </DrawerTrigger>

            <DrawerContent className="border-[#FF4038]">
              <DrawerHeader className="px-5 pt-6 pb-0">
                <DrawerTitle className="text-xl">Quit Plan</DrawerTitle>

                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground/50">
                      Current BTC Balance
                    </div>
                    <div className="font-medium">0.1 BTC</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-foreground/50">
                      Date of Withdrawal Request
                    </div>
                    <div className="font-medium">17 AUG 2025</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-foreground/50">Time Delay Set</div>
                    <div className="font-medium">7 days</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-foreground/50">Early Exit Penalty</div>
                    <div className="text-danger font-medium">- 0.01 BTC</div>
                  </div>
                </div>

                <Divider className="my-6 bg-[radial-gradient(50%_23209.76%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-20" />

                <div className="flex w-full flex-col items-center gap-2">
                  <div className="text-foreground/50 text-sm">
                    You&apos;ll Get
                  </div>
                  <div className="flex items-center justify-center gap-2 text-center text-[40px]">
                    <span>0.09 BTC</span>
                    <Chip
                      color="primary"
                      variant="flat"
                      className="text-primary text-sm"
                    >
                      ~$50
                    </Chip>
                  </div>
                </div>

                <div className="my-6 flex items-center gap-2.5 rounded-full bg-[radial-gradient(50%_495.17%_at_50%_50%,_rgba(255,_255,_255,_0.1)_0%,_rgba(153,_153,_153,_0.1)_100%)] px-3 py-1.5">
                  <span className="h-px w-full rotate-180 bg-[linear-gradient(90deg,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-10"></span>
                  <span className="text-foreground/50 w-full flex-1 flex-shrink-0 text-sm whitespace-nowrap">
                    BTC will hit the wallet on{' '}
                    <span className="text-foreground">17 SEP 2025</span>
                  </span>
                  <span className="h-px w-full bg-[linear-gradient(90deg,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] opacity-10"></span>
                </div>

                <div className="text-foreground/75 mb-6 text-center text-sm">
                  <p>Patience Builds Freedom.</p>
                  <p className="text-foreground/50">
                    You&apos;re 50% There. Don&apos;t Quit Now. Keep Going.
                  </p>
                </div>
              </DrawerHeader>

              <DrawerFooter className="px-5 pt-0 pb-10">
                <Button
                  color="danger"
                  size="lg"
                  className="border-2 border-[#FF4038] bg-gradient-to-r from-[#FF4038] to-[#B7241E] font-medium"
                >
                  Quit Plan
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <p className="text-center text-sm font-medium">
            Withdraw after 30 Days (No Penalty)
          </p>
        </div>
      </GradientBorderCard>
    </div>
  )
}
