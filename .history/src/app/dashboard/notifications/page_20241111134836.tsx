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
            <ul className="list-group list-group-flush row">
              <li className="list-group-item py-3">
                <p className="my-0">Personal info</p>
                <p>12 hours ago</p>
              </li>
              <li className="list-group-item py-3">
                <p className="my-0">Personal info</p>
                <p>12 hours ago</p>
              </li>
            </ul>
          </div>
      </>
  )
}

export default Notifications