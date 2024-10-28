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

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1>Settings</h1>
          </div>
        </div>
      </div>
      </>
  )
}

export default Settings