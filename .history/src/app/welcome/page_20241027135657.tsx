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
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed-bottom bg-white border-top">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-center">
              <button 
                className="btn btn-primary btn-lg w-100"
                onClick={() => router.push('/dashboard')}
              >
                Enter App
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
