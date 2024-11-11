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
            <ul className="settings-list-stacked list-group list-group-flush">
              <li className="list-group-item px-5">
                <p className="mb-0">Personal info</p>
                <p className="mb-0">12 hours ago</p>
              </li>
              <li className="list-group-item">
                <p className="mb-0">Personal info</p>
                <p className="mb-0" >12 hours ago</p>
              </li>
              <li className="list-group-item">
                <p className="mb-0">Personal info</p>
                <p className="mb-0">12 hours ago</p>
              </li>
            </ul>
          </div>
      </>
  )
}

export default Notifications