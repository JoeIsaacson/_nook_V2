'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount, WagmiConfig, WagmiProvider, createConfig, http } from 'wagmi'
import { useEffect, ReactNode } from 'react';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';

import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';

import { color } from '@coinbase/onchainkit/theme';

export default function Welcome() {
  const router = useRouter();
  const { connectors, connect, status, error } = useConnect();

  const { isConnected, address } = useAccount();

  console.log(status, isConnected);
  console.log(connectors);

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  function handleContinue() {
    if (isConnected === false) {
      connect({ connector: connectors[0] });
    } else {
      router.push('/dashboard');
    }
  }

  // Debug logging
  console.log('Wallet Status:', {
    connectionStatus: status,
    isConnected,
    walletAddress: address,
    availableConnectors: connectors.map(c => c.name)
  })

  return (
    <>
      {/* Main Content */}
      <div className="splash-page">
        <div className="splash-content container">
          <img
            src="/img/ellipse_1.svg"
            alt="ellipse"
            className="ellipse-1 coin-1" />
          <div className="splash-header pt-5">
            <h1 className="display-1">Welcome to Nook</h1>
          </div>
        </div>

        {/* Fixed Footer */}
        <footer className="fixed-bottom">
          <div className="container py-3">
            <div className="row">
              <div className="col-12 text-center">

                <div className="flex justify-end">
                  <Wallet>
                    <ConnectWallet>
                      <Avatar className="h-6 w-6" />
                      <Name />
                    </ConnectWallet>
                    <WalletDropdown>
                      <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                        <Avatar />
                        <Name />
                        <Address className={color.foregroundMuted} />
                      </Identity>
                      <WalletDropdownDisconnect />
                    </WalletDropdown>
                  </Wallet>
                </div>

                {/* Continue Button */}
                <div>

                  <button
                    className="btn btn-transparent btn-lg w-100 btn-left-justify"
                    onClick={handleContinue}>
                    Continue
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>

                  <div>{error?.message}</div>
                </div>

              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
};