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

        <div className="container mt-2">
            <p>3 unread notifications</p>
        </div>

       {/* Main Content */}
       <div className="container mt-2 px-0">
        {/* notifications list */}
        <ul className="settings-list-stacked list-group list-group-flush">
            <li className="list-group-item px-4 py-3">
            <p className="mb-0">Personal info</p>
            <p className="mb-0 fw-normal">12 hours ago</p>
            </li>
            <li className="list-group-item px-4 py-3">
            <p className="mb-0">Personal info</p>
            <p className="mb-0 fw-normal">12 hours ago</p>
            </li>
            <li className="list-group-item px-4 py-3">
            <p className="mb-0">Personal info</p>
            <p className="mb-0 fw-normal">12 hours ago</p>
            </li>
        </ul>
        </div>
    </>
  )
}

export default Notifications