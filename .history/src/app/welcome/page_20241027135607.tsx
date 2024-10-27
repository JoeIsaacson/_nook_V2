'use client'

import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <>
      {/* Main Content */}
      <div className="container mt-5">
        <div className="text-center">
          <h1>Welcome to _NOOK</h1>
          <p className="lead">Your Web3 Gateway</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => router.push('/dashboard')}
          >
            Enter App
          </button>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed-bottom bg-white border-top">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-6">
              <small className="text-muted">© 2024 _NOOK. All rights reserved.</small>
            </div>
            <div className="col-6 text-end">
              <div className="d-flex justify-content-end align-items-center">
                <a href="#" className="text-decoration-none me-3">
                  <small>Terms</small>
                </a>
                <a href="#" className="text-decoration-none me-3">
                  <small>Privacy</small>
                </a>
                <a href="#" className="text-decoration-none">
                  <small>Help</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
