'use client'

import { useRouter } from 'next/navigation'

export default function NotificationDetail() {
  const router = useRouter()

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <button 
            className="btn"
            onClick={() => router.push('/dashboard/notifications')}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h5>You just received a referral bonus</h5>
        <p className="text-muted small">4 hours ago</p>
        
        <p className="mt-4">
          Congratulations! You've earned a referral bonus for bringing a new user to the platform.
          The bonus has been added to your account.
        </p>
      </div>
    </>
  )
}

export default 1