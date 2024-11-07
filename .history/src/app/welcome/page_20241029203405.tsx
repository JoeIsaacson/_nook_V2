'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount } from 'wagmi'
const { connectors, connect, status, error } = useConnect()

// Log available connectors
console.log('Available connectors:', connectors.map(c => c.name))

export default function Welcome() {
  const router = useRouter();
  const { isConnected, address } = useAccount();

  const handleContinue = async () => {
    if (!isConnected) {
      try {
        await connect({
          connector: connectors[0] // First connector in the array
        })
      } catch (error) {
        console.error('Failed to connect:', error)
      }
    }
  }

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
                <button 
                  className="btn btn-transparent btn-lg w-100 btn-left-justify"
                  onClick={handleContinue}
                >
                  Continue <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}