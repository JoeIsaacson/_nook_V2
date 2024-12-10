'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount } from 'wagmi'
import { useEffect, ReactNode, useState } from 'react';

import {
  ConnectWallet,
  Wallet,
} from '@coinbase/onchainkit/wallet';

export default function Welcome() {
  const router = useRouter();
  const { connectors, connect, status, error } = useConnect();

  const { isConnected, address } = useAccount();

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const headers = [
    "Welcome to Nook",
    "You can earn 11.5%",
    "Get started with $5"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headers.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

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

          {/* Progress Bar */}
          <div className="progress-container d-flex gap-2">
            {headers.map((_, index) => (
              <div 
                key={index}
                className={`progress-bar ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="splash-header">
            {headers.map((text, index) => (
              <h1
                key={index}
                className={`display-1 header-slide ${
                  index === currentIndex ? 'visible' : ''
                }`}
              >
                {text}
              </h1>
            ))}
          </div>
        </div>

        {/* Fixed Footer */}
        <footer className="fixed-bottom">
          <div className="container py-3">
            <div className="row">
              <div className="col-12 text-center">

                <div className="flex justify-end">
                  <Wallet>
                    <ConnectWallet
                      className="btn btn-lg btn-transparent w-100"
                      text="Continue"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </ConnectWallet>
                  </Wallet>
                </div>

              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
};
