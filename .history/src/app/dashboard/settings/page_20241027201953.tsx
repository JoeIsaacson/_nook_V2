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

            <ul class="list-group list-group-flush">
              <li class="list-group-item">Cras justo odio</li>
              <li class="list-group-item">Dapibus ac facilisis in</li>
              <li class="list-group-item">Morbi leo risus</li>
              <li class="list-group-item">Porta ac consectetur ac</li>
              <li class="list-group-item">Vestibulum at eros</li>
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