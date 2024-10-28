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
            <p className="me-2">Member since {new Date().toLocaleDateString()}</p>
            {/* Settings List */}
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="fas fa-xmark"></i>
                Cras justo odio
              </li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>

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