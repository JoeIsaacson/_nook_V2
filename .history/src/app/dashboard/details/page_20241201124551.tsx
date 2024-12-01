'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface DashboardData {
  formattedLendingRewards: string;
  formattedAPY: string;
}

export default function Details() {
  const router = useRouter();
  const [details, setDetails] = useState<DashboardData | null>(null);


  useEffect(() => {
    // Get the APY from localStorage
    const dashboardData = localStorage.getItem('dashboardData');
    if (dashboardData) {
      const parsedData: DashboardData = JSON.parse(dashboardData);
      setDetails(parsedData);
      // Optionally clear the data after retrieving
      localStorage.removeItem('dashboardData');
    }
  }, 
  
  []);

  return (
    <>
      <div className="notifications-screen">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <button
              className="btn"
              onClick={() => router.push('/dashboard')}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="position-absolute start-50 translate-middle-x">
              <span className="navbar-text">Details</span>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="mt-4">
            <h6 className="mb-4 small">You are earning {details?.formattedAPY}% APY</h6>
            <h2>What happens next?</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mt-2 px-0">
          {/* notifications list */}
          <ul className="settings-list-stacked list-group list-group-flush">
            <li
              className="list-group-item px-4 py-3"
              style={{ cursor: 'pointer' }}
            >
              <p className="mb-0">You made a deposit</p>
              <p className="mb-0 fw-normal">2 hours ago</p>
            </li>
            <li
              className="list-group-item px-4 py-3"
              style={{ cursor: 'pointer' }}
            >
              <p className="mb-0">You earned X amount of rewards</p>
              <p className="mb-0 fw-normal">4 hours ago</p>
            </li>
          </ul>
        </div>

        <div className="container mt-5">
          <h6 className="mb-4 small">Earnings</h6>
          <h2 className="mb-0">Your breakdown of earnings</h2>
          <p className="mb-0">You have earned ${details?.formattedLendingRewards} in yield for an average of {details?.formattedAPY}% return on your deposit</p>
        </div>

      </div>
    </>
  )
}