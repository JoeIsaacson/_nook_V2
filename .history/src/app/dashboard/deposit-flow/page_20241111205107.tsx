'use client'
import { useRouter, useParams } from 'next/navigation'

export default function DepositInput() {
  const router = useRouter()
  const params = useParams()

  console.log(params.id);

  return (
    <>
      <div className="deposit-screen">
        <nav className="navbar navbar-expand-lg navbar-light">
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

          <div className="row">
            <div className="col-12">
              <h1 className="mb-4 display-1 fw-normal text-center">$0</h1>
            </div>
            <div className="row">
              <div className="col-6">
                <button className="btn btn-transparent w-100">
                  Withdraw
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-transparent">
                  Max
                </button>
              </div>
            </div>
          </div>

          <footer className="">
            <div className="py-3 text-center">
              <button
                className="btn btn-transparent w-100 mt-5"
                onClick={() => router.push('/dashboard')}
              >
                <span>Deposit $100</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}; 