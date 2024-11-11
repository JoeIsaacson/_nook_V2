'use client'

import { useAccount, useDisconnect} from 'wagmi'
import { useRouter } from 'next/navigation'

function Notifications() {
  const router = useRouter();

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
            {/* subheading */}
            <p>22 unread notifications</p>
            {/* notifications list */}
            <ul className="settings-list-stacked list-group list-group-flush row">
              <li className="list-group-item py-3">
                <i className="far fa-face-smile me-2"></i>
                Personal info
              </li>
              <li className="list-group-item py-3">
                <i className="fas fa-file-invoice me-2"></i>
                Tax documents
              </li>
              <li className="list-group-item py-3">
                <i className="fas fa-user-plus me-2"></i>
                Refer a friend
              </li>
              <li className="list-group-item py-3">
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

export default Notifications