'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react';

import { useAccount, useBalance, useContractRead } from 'wagmi'

import {
  Transaction,
  TransactionButton,
} from '@coinbase/onchainkit/transaction';

import { LifecycleStatus } from '@coinbase/onchainkit/transaction';

import { USDCContracts, moonWellContracts } from './contracts';

export default function DepositInput() {
  const router = useRouter();
  const { address } = useAccount();
  const BASE_MAINNET_CHAIN_ID = 8453;
  const moonWellDepositAddress = '0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22'; // Moonwell USDC Market on Base

  // get user USDC balance on Base
  const { data: balance } = useBalance({
    address: address,
    token: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC contract address on Base
    chainId: 8453, // Base mainnet
  });

  const USDC_BALANCE = Number(balance?.formatted).toFixed(2);
  const [inputAmount, setInputAmount] = useState("0");
  const expectedYearlyReturn = (Math.min(Number(inputAmount), Number(USDC_BALANCE)) * 0.12).toFixed(2);

  const calculatePercentage = () => {
    const amount = Number(inputAmount);
    const total = Number(USDC_BALANCE);
    return Math.min(((amount / total) * 100), 100).toFixed(0);
  };

  console.log('USDCContracts', USDCContracts(inputAmount));

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
  }, []);

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
    // watch: true,
  })

  const allowanceFormatted = allowance ? Number(allowance) / 1000000 : 0;
  const hasAllowance = allowance && Number(allowance) >= Number(inputAmount) * 1000000;


  console.log('hasAllowance', hasAllowance);
  console.log('its', allowanceFormatted);

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
              <span className="navbar-text">Deposit</span>
              <span className={`navbar-text USDC-balance-text ${Number(inputAmount) > Number(USDC_BALANCE) ? 'text-danger' : ''}`}>
                {USDC_BALANCE && Number(USDC_BALANCE) > 0 && (
                  <p className="mb-0">${USDC_BALANCE} available</p>
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
              {calculatePercentage()}% · <span className="">${expectedYearlyReturn} expected /yr</span>
            </h6>
          )}

        </div>

        <footer className="fixed-bottom py-3">
          <div className="container text-center">
            {Number(inputAmount) > 0 && Number(USDC_BALANCE) > 0 && (
              <>
                <Transaction
                  chainId={BASE_MAINNET_CHAIN_ID}
                  calls={USDCContracts(inputAmount) as any}
                  onStatus={handleOnStatus}
                >
                  <TransactionButton
                    className="btn btn-lg btn-primary w-100 py-2"
                    text="Confirm access"
                  />
                </Transaction>

                {hasAllowance && (
                  <Transaction
                    chainId={BASE_MAINNET_CHAIN_ID}
                    calls={moonWellContracts(inputAmount) as any}
                    onStatus={handleOnStatus}
                  >
                    <TransactionButton
                      className="btn btn-lg btn-secondary w-100 py-2"
                      text="Confirm deposit" />
                  </Transaction>
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