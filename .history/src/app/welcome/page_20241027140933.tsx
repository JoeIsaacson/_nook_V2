'use client'

import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <>
      {/* Main Content */}
      <div className="splash-page container">
        <div className="pt-5">
          <h1>Welcome to</h1>
          <h1>Nook</h1>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed-bottom">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-center">
              <button 
                className="btn btn-transparent btn-lg w-100"
                onClick={() => router.push('/dashboard')}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}