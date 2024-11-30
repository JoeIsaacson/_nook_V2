'use client'

import { useRouter } from 'next/navigation'
import { useAccount, useBalance, useContractRead } from 'wagmi'

import { useCallback, useState } from 'react';

import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
} from '@coinbase/onchainkit/transaction';

import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';

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

  // Define the possible status values
  type LifecycleStatus = 'init';

  const [transactionStatus, setTransactionStatus] = useState<LifecycleStatus>('init');

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
    setTransactionStatus(status);
  }, []);

  console.log('LifecycleStatus', transactionStatus);

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
          </div>
        </nav>

        <div className="container mt-4">

          <div className="row">
            <div className="col-12">
              <h1 className="mb-4 display-1 fw-normal text-center">
                $100
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <h6 className="mb-0 small">
                <span className="text-decoration-underline">10%</span>
              </h6>
            </div>
          </div>
        </div>

        <footer className="fixed-bottom">
          <div className="container py-3 text-center">
            {/* Action one */}
            <Transaction
              chainId={BASE_MAINNET_CHAIN_ID}
              calls={USDCContracts}
              onStatus={handleOnStatus}
            >
              <TransactionButton
                className="btn btn-primary w-100"
                text="Action one"
                successOverride="WHAT"
              />
            </Transaction>

            {/* Action two */}
            <Transaction
              chainId={BASE_MAINNET_CHAIN_ID}
              calls={moonWellContracts}
              onStatus={handleOnStatus}
            >
              <TransactionButton
                className="btn btn-secondary w-100"
                text="Action two" />
              <TransactionSponsor />
            </Transaction>
          </div>
        </footer>
      </div>
    </>
  )
};


// Windsail / iOS app in Xcode