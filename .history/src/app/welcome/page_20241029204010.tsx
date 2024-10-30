'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount } from 'wagmi'

// Log available connectors
console.log('Available connectors:', connectors.map(c => c.name))

export default function Welcome() {
  const router = useRouter();
  const { connectors, connect } = useConnect({

  const { isConnected, address } = useAccount();

  const handleContinue = async () => {
    if (!isConnected) {
      try {
        //await connect()
      } catch (error) {
        console.error('Failed to connect:', error)
      }
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="splash-page">
      <div className="splash-content container">
        <Image 
          src="/img/graph_balloon_raw_1.png" 
          alt="ellipse" 
          className="ellipse-1"
          width={500}
          height={300}
        />
        <div className="splash-header pt-5">
          <h1 className="display-1">Welcome to</h1>
          <h1 className="display-1 bold">Nook</h1>
        </div>
      </div>

      <div className="background-logo">N</div>

      <footer className="fixed-bottom">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-center">
              <button 
                className="btn btn-transparent btn-lg w-100 btn-left-justify"
                onClick={handleContinue}
              >
                {isConnected ? 'Continue' : 'Connect Wallet'} 
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
