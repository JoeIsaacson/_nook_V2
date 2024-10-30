'use client'

import { useRouter } from 'next/navigation'
import { useConnect, useAccount } from 'wagmi'

export default function Welcome() {
  const router = useRouter();
  const { connect } = useConnect();
  const { 
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    status
  } = useAccount()

  const handleContinue = async () => {
    if (isConnecting) {
      console.log('Wallet is connecting...')
      return
    }

    if (isDisconnected) {
      try {
        await connect()
      } catch (error) {
        console.error('Failed to connect:', error)
      }
      return
    }

    if (isConnected) {
      console.log(`Connected with address: ${address}`)
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
                  {isConnecting && 'Connecting...'}
                  {isDisconnected && 'Connect Wallet'}
                  {isConnected && 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
};
