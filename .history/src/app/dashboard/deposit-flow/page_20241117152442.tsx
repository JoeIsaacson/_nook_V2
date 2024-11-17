'use client'

import { useRouter, useParams } from 'next/navigation'
import { useBalance, useAccount } from 'wagmi'

export default function DepositInput() {
  const router = useRouter()
  const params = useParams()
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })

  console.log(params.id);

  return (
    <>
      <div className="deposit-screen">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button
              className="btn"
              onClick={() => router.push('/dashboard')}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
        </nav>

        <div className="container mt-4">

          <div className="row">
            <div className="col-12">
              <h1 className="mb-4 display-1 fw-normal text-center">
                {balance ? `${balance} ${balance.symbol}` : '$0'}
              </h1>
            </div>

          </div>

          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <h6 className="mb-0 small">
                <span className="text-decoration-underline">10%</span>
              </h6>
            </div>
            <div className="col-6 text-end">
              <button className="btn btn-transparent">
                Max
              </button>
            </div>
          </div>
        </div>

        <footer className="container">
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
    </>
  )
}; 