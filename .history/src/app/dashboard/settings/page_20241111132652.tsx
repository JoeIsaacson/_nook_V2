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
        <div className="row">
          <div className="col-12">
            <div className="circle-badge circle-badge-large mb-4">JI</div>
            {/* Start Date */}
            <p>Member since {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            {/* Settings List */}
            <ul className="settings-list-stacked list-group list-group-flush row">
              <li className="list-group-item">
                <i className="far fa-face-smile me-2"></i>
                Personal info
              </li>
              <li className="list-group-item">
                <i className="fas fa-file-invoice me-2"></i>
                Tax documents
              </li>
              <li className="list-group-item">
                <i className="fas fa-user-plus me-2"></i>
                Refer a friend
              </li>
              <li className="list-group-item" onClick={() => disconnect()}>
                <i className="fas fa-sign-out me-2"></i>
                Log out (of Wallet)
              </li>
              <li className="list-group-item">
                <i className="fas fa-user-xmark me-2"></i>
                Close account
              </li>
            </ul>
          </div>
          </div>
        </div>
      </>
  )
}

export default Settings