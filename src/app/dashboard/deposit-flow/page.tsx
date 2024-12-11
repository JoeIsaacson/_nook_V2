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

  const onrampBuyUrl = projectId ? getOnrampBuyUrl({
    projectId,
    addresses: { [address as string]: ['base'] },
    assets: ['USDC'],
    presetFiatAmount: Number(inputAmount),
    fiatCurrency: 'USD'
  }) as any : undefined;

  const handleNumberClick = (num: string) => {
    if (num === '.') {
      if (inputAmount.includes('.')) return;
    }
    setInputAmount(prev => {
      const newValue = prev === '0' ? num : prev + num;
      return newValue;
    });
  };

  const handleDelete = () => {
    setInputAmount(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleClear = () => {
    setInputAmount('0');
  };

  const NumberPad = ({ onNumberClick, onDelete, onClear }: {
    onNumberClick: (num: string) => void;
    onDelete: () => void;
    onClear: () => void;
  }) => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

    return (
      <div className="number-pad mt-4">
        <div className="num-pad-grid-container">
          {numbers.map((num) => (
            <button
              key={num}
              className="btn btn-outline-link rounded-circle p-3"
              onClick={() => num === '⌫' ? onDelete() : onNumberClick(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    );
  };

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
                type="text"
                className="mb-4 display-1 fw-normal text-center border-0 w-100"
                value={inputAmount}
                readOnly
                placeholder="0"
              />
              <h6 className={`deposit-flow-expected-return mb-0 small text-center ${Number(inputAmount) > 0 ? 'fade-in' : ''}`}>
                {Number(inputAmount) > 0 && (
                  <span className="">${expectedYearlyReturn} expected /yr</span>
                )}
              </h6>
            </div>
          </div>
        </div>

        <footer className="fixed-bottom py-3">

          <div className="container text-center">

          <div className="mb-4">
            <NumberPad
              onNumberClick={handleNumberClick}
              onDelete={handleDelete}
              onClear={handleClear}
              />
            </div>

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