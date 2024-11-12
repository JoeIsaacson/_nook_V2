'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount } from 'wagmi'
import { useEffect } from 'react';

export default function Welcome() {
  const router = useRouter();
  const { connectors, connect, status, error } = useConnect();

  const { isConnected } = useAccount();
  console.log(status, isConnected);

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
            <h1 className="display-1 bold">Nook</h1>
          </div>
        </div>

        {/* Fixed Footer */}
        <footer className="fixed-bottom">
          <div className="container py-3">
            <div className="row">
                <div className="col-12 text-center">
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
