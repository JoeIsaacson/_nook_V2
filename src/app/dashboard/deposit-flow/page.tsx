'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react';

import { useAccount, useBalance, useContractRead } from 'wagmi'

import {
  Transaction,
  TransactionButton,
} from '@coinbase/onchainkit/transaction';

import { LifecycleStatus } from '@coinbase/onchainkit/transaction';

import { FundButton, getOnrampBuyUrl } from '@coinbase/onchainkit/fund';

import { USDCContracts, moonWellContracts } from './contracts';

export default function DepositInput() {
  const router = useRouter();
  const { address } = useAccount();
  const BASE_MAINNET_CHAIN_ID = 8453;
  const moonWellDepositAddress = '0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22'; // Moonwell USDC Market on Base
  const projectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID;

  // get user USDC balance on Base
  const { data: balance } = useBalance({
    address: address,
    token: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC contract address on Base
    chainId: 8453, // Base mainnet
  });

  const USDC_BALANCE = Number(balance?.formatted).toFixed(2);
  const [inputAmount, setInputAmount] = useState("0");
  const expectedYearlyReturn = (Math.min(Number(inputAmount) * 0.12)).toFixed(2);

  const calculatePercentage = () => {
    const amount = Number(inputAmount);
    const total = Number(USDC_BALANCE);
    return Math.min(((amount / total) * 100), 100).toFixed(0);
  };


  const [theThing, setTheThing] = useState<string>('');

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    setTheThing(status.statusName);
  }, []);

  console.log('theThing', theThing);

  const { data: allowance } = useContractRead({
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC contract address
    abi: [{
      name: 'allowance',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' }
      ],
      outputs: [{ type: 'uint256' }]
    }],
    functionName: 'allowance',
    args: [address as `0x${string}`, moonWellDepositAddress], // owner, spender
    chainId: BASE_MAINNET_CHAIN_ID,
  })

  const hasAllowance = allowance && Number(allowance) >= Number(inputAmount) * 1000000;

  // console.log('hasAllowance', hasAllowance);
  // console.log('its', allowanceFormatted);

  const onrampBuyUrl = projectId ? getOnrampBuyUrl({
    projectId,
    addresses: { [address as string]: ['base'] },
    assets: ['USDC'],
    presetFiatAmount: Number(inputAmount),
    fiatCurrency: 'USD'
  }) as any : undefined;

  return (
    <>
      <div className="deposit-screen">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <button
              className="btn"
              onClick={() => router.push('/dashboard')}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="position-absolute start-50 translate-middle-x text-center">
              <span className="navbar-text small fw-medium">Deposit</span>
              <span className={`navbar-text USDC-balance-text small ${Number(inputAmount) > Number(USDC_BALANCE) ? 'text-secondary' : ''}`}>
                {USDC_BALANCE && Number(USDC_BALANCE) > 0 && (
                  <p className="mb-0">${USDC_BALANCE} available {Number(inputAmount) > 0 && (<span>· {calculatePercentage()}%</span>)}</p>
                )}
              </span>
            </div>

          </div>
        </nav>

        <div className="container mt-4">

          <div className="row">
            <div className="col-12 position-relative">
              <input
                type="number"
                className="mb-4 display-1 fw-normal text-center border-0 w-100"
                value={inputAmount}
                onChange={(e) => {
                  setInputAmount(e.target.value);
                }}
                onFocus={(e) => e.target.select()}
                placeholder="0"
                step="0.01"
                min="0"
                max="10000"
              />
            </div>
          </div>

          {Number(inputAmount) > 0 && (
            <h6 className={`deposit-flow-expected-return mb-0 small text-center ${Number(inputAmount) > 0 ? 'fade-in' : ''}`}>
               <span className="">${expectedYearlyReturn} expected /yr</span>
            </h6>
          )}

        </div>

        <footer className="fixed-bottom py-3">
          <div className="container text-center">
            {Number(inputAmount) > 0 && (
              <>
                {/* Show Onramp if insufficient balance */}
                {Number(inputAmount) > Number(USDC_BALANCE) && (
                  <FundButton 
                    fundingUrl={onrampBuyUrl}
                    className="100"
                    text="Continue"
                  />
                )}

                {/* Original deposit flow for sufficient balance */}
                {Number(inputAmount) <= Number(USDC_BALANCE) && (
                  <>
                    {!hasAllowance && (
                    //  check to see if USDC contract is met
                     <Transaction
                        chainId={BASE_MAINNET_CHAIN_ID}
                        calls={USDCContracts(inputAmount) as any}
                        onStatus={handleOnStatus}
                        capabilities={{
                          paymasterService: {
                            url: process.env.NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT!,
                          },
                        }}
                      >
                        <TransactionButton
                          className="btn btn-lg btn-primary w-100 py-2"
                          text="Continue"
                        />
                      </Transaction>
                    )}
                    
                    {/* // Confirm moonwell mint */}
                    {hasAllowance && (
                      <Transaction
                        chainId={BASE_MAINNET_CHAIN_ID}
                        calls={moonWellContracts(inputAmount) as any}
                        onStatus={handleOnStatus}
                      >
                        <TransactionButton
                          className="btn btn-lg btn-secondary w-100 py-2"
                          text="Continue"
                        />
                      </Transaction>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </footer>
      </div>
    </>
  )
};

// Windsail / iOS app in Xcode

// Increased staking conversion across our core Staking flows including SAS (Single Asset Staking) and MAS (Multi-Asset Staking) flows, leading to a 34% increase in net staking volume for SAS compared to control, and a 16% lift in net staking volume for MAS compared to control. WHAT: Executed on design adaptations for SAS and MAS across RN and Web based on the latest design directions from the L6 level designer that came before him, by executing on general design directions and launching 8 new experiments, resulting in a projected to contribution of 8.5MM ARR.

// HOW:Execution: Delivered high-quality designs by quickly working through product and eng requirements based off of prior explorations, and focusing on CDS compliance and growth opportunities (see designs)

// Influence: Held several design reviews with Staking XFN leadership and CS3 leadership to get feedback and buy in with the general direction and then later final design spec, including legal text, customer copy, etc.

// Customer focus: Prioritized solving user pain points, enhancing user experience and driving engagement.

// Improved Staking Discovery and Overall visibility by concepting and designing a new set of home cards for customers that were not staking or were not staking the majority of their stake-able assets, leading to a increase in staking by +39 bps Staking Revenue SWI, +3 bps Consumer Revenue (see post)WHAT: Collaborated with the PM, DS and PMM team to help design two different home-card components (educational and data based variants) for RN and Web, including copy, graphics, video content and interaction design details (see designs) 

// HOW:Product thinking: Worked with DS Chris Kim to unveil the DS insight around % of Eligible Assets Staked chart that showed how our users were mostly either 0% staked or 90-100% staked. This chart became a key insight behind our approach to staking for 2025.

// Execution: Collaborated with eng and marketing to come up with a new approach to marketing in the app with educational video content that we haven't been able to do before while championing new design patterns on our Retail app like the interactive graph and video player.

// Supported the Staking with the RAV4 app-wide re-architecture leading to a 53% increase in net staking revenue increase (+4.72 % SWI) and a 34% increase in new staking users WHAT: Supported the RAV4 implementation and rollout for Staking, including the deprecation of Earn tab, introduction of My Assets, additional staking points on the ADP page and follow up specs with RAV4 DD for Web and RN

// HOW:Storytelling: Effectively communicated changes and impacts to cross-functional teams in terms of key design specs for other RAV4 XFN and Design partners across Trade, Cash, etc.

// Execution: Single-handedly took on several RAV4 related work streams during a critical transition where we were short staffed after the departure of the lead designer, including stepping up as a team player to help design the RAV4 Double Down to increase overall visibility and clean up design debt, post launch (see designs)

// WHAT: Cedric has shown the ability to think through some relatively complex challenges and has expressed his interest in taking on more and moving faster. But he has yet to prove that he can take on more without dropping any parts of a project. To show that he can exceed expectations he needs to show that he can stay on top of what he takes on.

// HOW: To show that he can stay that he can stay on top of what he takes on and perform at his level, Cedric needs to:

// Be more consistent. He spikes with communication and craft sometimes, but not on a consistent basis. 

// Share more often and put together more concise plans and next steps of sharing. Be proactive and own your design deadlines and comms. 

// When in doubt, or not confident (90% plus) - get the confidence needed. Talk to Joey, peers, XFN team, etc. 