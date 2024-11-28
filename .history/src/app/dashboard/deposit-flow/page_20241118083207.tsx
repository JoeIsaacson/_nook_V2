'use client'

import { useRouter } from 'next/navigation'
import { useAccount, useContractRead  } from 'wagmi'

import { useCallback, useState } from 'react';

import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';

import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';

import { USDCContracts, moonWellContracts } from './contracts';

export default function DepositInput() {
  const router = useRouter();
  // const projectId = 'ad6eda58-8529-4a92-a0b4-dacb59bd9e03';

  const { address } = useAccount();
  const BASE_MAINNET_CHAIN_ID = 8453;
  
  const [transactionStatus, setTransactionStatus] = useState<LifecycleStatus>('idle');

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
    setTransactionStatus(status);
  }, []);

  const { data: allowance } = useContractRead({
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC contract address on Base
    abi: USDCContracts[0].abi,
    functionName: 'allowance',
    args: [address, moonWellContracts[0].address],
  });

  console.log('allowance', allowance);
  console.log('useContractRead', useContractRead());

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

            <Transaction
              chainId={BASE_MAINNET_CHAIN_ID}
              contracts={moonWellContracts}
              onStatus={handleOnStatus}
            >
              <TransactionButton 
                className="btn btn-secondary"/>
              <TransactionSponsor />
              <TransactionStatus>
                <TransactionStatusLabel />
                <TransactionStatusAction />
              </TransactionStatus>
            </Transaction>

          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <h6 className="mb-0 small">
                <span className="text-decoration-underline">10%</span>
              </h6>
            </div>
            <div className="col-6 text-end">
              <button className="btn btn-transparent">
                Max
              </button>
            </div>
          </div>
        </div>

        <footer className="">
          <div className="container py-3 text-center">
          {transactionStatus.statusName !== 'success' && (

          <Transaction
            chainId={BASE_MAINNET_CHAIN_ID}
            contracts={USDCContracts}
            onStatus={handleOnStatus}
          >
            <TransactionButton
              className="btn btn-primary w-100 mt-5"
              text="Deposit $100"
            />
            <TransactionSponsor />
            <TransactionStatus>
              <TransactionStatusLabel />
              <TransactionStatusAction />
            </TransactionStatus>
            </Transaction>
            )}
          </div>
        </footer>
      </div>
    </>
  )
}; 