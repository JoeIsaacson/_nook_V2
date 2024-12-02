'use client'

import { useAccount, useDisconnect} from 'wagmi'
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
      <div className="container mt-2">
          {/* Settings List */}
        <ul className="settings-list-stacked list-group list-group-flush row">
          <li className="list-group-item py-3">
                <i className="fas fa-user-plus me-2"></i>
                Refer a friend
              </li>
              <li className="list-group-item py-3" 
                onClick={() => {
                  disconnect();
                  router.push('/welcome');
                }}
              >
                <i className="fas fa-user-xmark me-2"></i>
                Log out
              </li>
            </ul>
            
            </div>
      </>
  )
}

export default Settings