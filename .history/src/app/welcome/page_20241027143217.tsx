'use client'

import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <>
      {/* Main Content */}
      <div className="splash-page">
        <div className="splash-content container">
            <div className="splash-header pt-5">
            <h1 className="display-1">Welcome to</h1>
            <h1 className="display-1 bold"><b>Nook</b></h1>
            </div>
         </div>

        {/* Background Image */}
        <div className="background-logo">
            N
        </div>

        {/* Fixed Footer */}
        <footer className="fixed-bottom">
            <div className="container py-3">
            <div className="row">
                <div className="col-12 text-center">
                <button 
                    className="btn btn-transparent btn-lg w-100 btn-left-justify"
                    onClick={() => router.push('/dashboard')}
                >
                    Continue <i className="fa-solid fa-arrow-right"></i>
                </button>
                </div>
            </div>
            </div>
        </footer>
      </div>
    </>
  )
}
