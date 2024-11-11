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
            {/* subheading */}
            <p>22 unread notifications</p>
            {/* notifications list */}
            <ul className="settings-list-stacked list-group list-group-flush row">
              <li className="list-group-item py-3">
                <span>Personal info</span>
                <span>12 hours ago</span>
              </li>
            </ul>
          </div>
      </>
  )
}

export default Notifications