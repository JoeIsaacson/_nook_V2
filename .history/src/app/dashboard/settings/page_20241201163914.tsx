'use client'

import { useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'

function Settings() {
  const router = useRouter()
  const { disconnect } = useDisconnect()

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
        <div className="my-4">
          <h2 className="mt-2 mb-3">Settings</h2>
          <h6 className="small">App version 0.00.4</h6>
        </div>

        <button 
          className="btn btn-transparent"
          onClick={() => {
            disconnect();
            router.push('/welcome');
          }}
        >
          Log out
        </button>
      </div>
    </>
  )
}

export default Settings