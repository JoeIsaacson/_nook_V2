'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react';

import { useAccount, useBalance } from 'wagmi'

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

  // get user eth balance on mainnet
  const { data: balance } = useBalance({
    address: address,
    token: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC contract address on Base
    chainId: 8453, // Base mainnet
  });

  const USDC_BALANCE = Number(balance?.formatted).toFixed(2);
  const [inputAmount, setInputAmount] = useState("0.00");
  const expectedYearlyReturn = (Number(inputAmount) * 0.12).toFixed(2);

  const calculatePercentage = () => {
    const amount = Number(inputAmount);
    const total = Number(USDC_BALANCE);
    return Math.min(((amount / total) * 100), 100).toFixed(0);
  };

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
  }, []);

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
            <div className="col-12">
              <input
                type="number"
                className="mb-4 display-1 fw-normal text-center border-0 w-100"
                value={inputAmount}
                onChange={(e) => {
                  setInputAmount(e.target.value);
                }}
                placeholder="0.00"
                step="0.01"
                min="0"
                max="10000"
              />
            </div>
          </div>

          {Number(inputAmount) > 0 && (
            <h6 className="mb-0 small text-center">
              {calculatePercentage()}% · <span className="">${expectedYearlyReturn} expected /yr</span>
            </h6>
          )}

        </div>

        <footer className="fixed-bottom">

          {/* {transaction1Status.statusName} */}

          {/* <div className="container py-3 text-center">
            {transaction1Status.statusName !== 'success' && (
              <Transaction
                chainId={BASE_MAINNET_CHAIN_ID}
                calls={USDCContracts}
                onStatus={handleTransaction1Status}
              >
                <TransactionButton
                  className="btn btn-primary w-100"
                  text="Confirm access"
                />
              </Transaction>
            )}

            {transaction1Status.statusName === 'success' && (
              <Transaction
                chainId={BASE_MAINNET_CHAIN_ID}
                calls={moonWellContracts}
                onStatus={handleTransaction2Status}
              >
                <TransactionButton
                  className="btn btn-secondary w-100"
                  text="Confirm deposit" />
              </Transaction>
            )}
          </div> */}
        </footer>
      </div>
    </>
  )
};


// Windsail / iOS app in Xcode