'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount } from 'wagmi'

export default function Welcome() {
  const router = useRouter();
  const { connectors, connect, status, error } = useConnect()

  return (
    <>
      {/* Main Content */}
      <div className="splash-page">
        <div className="splash-content container">
          <img src="/img/graph_balloon_raw_1.png" alt="ellipse" className="ellipse-1" />
          <div className="splash-header pt-5">
            <h1 className="display-1">Welcome to</h1>
            <h1 className="display-1 bold">Nook</h1>
          </div>
        </div>

        {/* Background Image */}
        <div className="background-logo">N</div>

        {/* Fixed Footer */}
        <footer className="fixed-bottom">
          <div className="container py-3">
            <div className="row">
                <div className="col-12 text-center">
                  {/* button connectors */}
                  <div>
                    <h2>Connect</h2>
                  {connectors.map((connector) => (
                    <button
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      type="button"
                    >
                      {connector.name}
                    </button>
                  ))}
                  <div>{status}</div>
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
