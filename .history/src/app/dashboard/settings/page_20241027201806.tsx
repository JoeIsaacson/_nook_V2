'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useRouter } from 'next/navigation'

function Settings() {
  const router = useRouter()
  const { disconnect } = useDisconnect()
  const account = useAccount()

  return (
      <>
    {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <button 
            className="btn"
            onClick={() => router.push('/dashboard')}
          >
            <i className="fas fa-xmark"></i>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <p>Member since {new Date().toLocaleDateString()}</p>
            {account.status === 'connected' && (
              <div className="mb-4">
                <button 
                  className="btn btn-danger me-2" 
                  type="button" 
                  onClick={() => disconnect()}
                >
                Disconnect
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
      </>
  )
}

export default Settings