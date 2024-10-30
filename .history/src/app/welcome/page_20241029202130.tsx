'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount } from 'wagmi'

export default function Welcome() {
  const router = useRouter()
  const { connect } = useConnect({
    connectors: [new InjectedConnector()]
  })
  const { isConnected } = useAccount()

  const handleContinue = () => {
    if (!isConnected) {
      connect()
    } else {
      router.push('/dashboard')
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
