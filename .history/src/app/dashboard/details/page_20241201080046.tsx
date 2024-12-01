'use client'

import { useRouter } from 'next/navigation'

export default function Details() {
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
            <p>You're earning X% APY on your deposit</p>
            <h1>What happens next</h1>
        </div>

       {/* Main Content */}
       <div className="container mt-2 px-0">
        {/* notifications list */}
        <ul className="settings-list-stacked list-group list-group-flush">
            <li 
              className="list-group-item px-4 py-3"
              onClick={() => router.push('/dashboard/notifications/1')}
              style={{ cursor: 'pointer' }}
            >
              <p className="mb-0">You just received a referral bonus</p>
              <p className="mb-0 fw-normal">2 hours ago</p>
            </li>
            <li 
              className="list-group-item px-4 py-3"
              onClick={() => router.push('/dashboard/notifications/2')}
              style={{ cursor: 'pointer' }}
            >
              <p className="mb-0">Your savings rate just went up</p>
              <p className="mb-0 fw-normal">4 hours ago</p>
            </li>
        </ul>
        </div>
    </>
  )
}