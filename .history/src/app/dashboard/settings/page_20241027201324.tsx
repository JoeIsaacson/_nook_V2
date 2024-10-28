'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useRouter } from 'next/navigation'

function Settings() {
  const router = useRouter()
  const { disconnect } = useDisconnect()
  const account = useAccount()

  return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <button 
            className="btn"
            onClick={() => router.push('/dashboard')}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
      </nav>
      
      <h1>Settings</h1>

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
      </>
  )
}

export default Settings