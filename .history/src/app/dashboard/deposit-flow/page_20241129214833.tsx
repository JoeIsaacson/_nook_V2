'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react';

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

  const USDC_BALANCE = balance?.formatted;

  const [transaction1Status, setTransaction1Status] = useState<LifecycleStatus>({
    statusName: 'idle'
  });

  const [transaction2Status, setTransaction2Status] = useState<LifecycleStatus>({
    statusName: 'idle'
  });

  const handleTransaction1Status = (status: LifecycleStatus) => {
    console.log(status.statusName);
    setTransaction1Status(status);
    console.log(transaction1Status.statusName);
  };

  const handleTransaction2Status = (status: LifecycleStatus) => {
    console.log(status.statusName);
    setTransaction2Status(status);
    console.log(transaction2Status.statusName);
  };

  return (
    <>
      <div className="deposit-screen">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button
              className="btn"
              onClick={() => router.push('/dashboard')}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
           
            <div className="text-center w-100">
              <p className="mb-0">Deposit</p>
              <div>
                {USDC_BALANCE && Number(USDC_BALANCE) > 0 && (
                  <p className="mb-0">${USDC_BALANCE} available</p>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="container mt-4">

          <div className="row">
            <div className="col-12">
              <h1 className="mb-4 display-1 fw-normal text-center">
                $0.00
              </h1>
            </div>
          </div>

          <h6 className="mb-0 small text-center">
             10% · <span className="text-decoration-underline">$2.55 expected / yr</span>
          </h6>

        </div>

        <footer className="fixed-bottom">

        {transaction1Status.statusName}

          <div className="container py-3 text-center">
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
          </div>
        </footer>
      </div>
    </>
  )
};


// Windsail / iOS app in Xcode