// Your existing page content goes here
'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function App() {
  const router = useRouter()
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const [showBalance, setShowBalance] = useState(false)

  console.log(useConnect);
  console.log(connectors);

  const { data: balance } = useBalance({
    address: account.address,
  })

// Mock ETH price in USD (you'll want to replace this with real price data)
const ethPrice = 2600 // Example price
const usdBalance = balance ? (Number(balance.formatted) * ethPrice).toFixed(2) : '0.00'
  
  // Format ETH to 6 decimal places
  const formattedEth = balance ? Number(balance.formatted).toFixed(6) : '0.000000'

  const handleCheckBalance = () => {
    setShowBalance(true)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* left side */}
          <button 
            className="btn"
            onClick={() => router.push('/dashboard/settings')}
          >
            <i className="fas fa-cog me-2"></i> 
          </button>
          {/* right side */}
          <button className="btn">
            <i className="fas fa-bell"></i>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4 display-1">${usdBalance}</h1>
            <h6 className="mb-4">{formattedEth} ETH</h6>
            <div className="row">
                <div className="col-6">
                    <button className="btn btn-secondary w-100">
                        Withdraw
                    </button>
                </div>
                <div className="col-6">
                    <button className="btn btn-outline-secondary w-100">
                        Details
                    </button>
                </div>
            </div>
            <h6 className="my-4">$200.55 earned</h6>
          </div>
        </div>
      </div>

    {/* Footer */}
    <footer className="fixed-bottom">
            <div className="container py-3">
            <div className="row">
                <div className="col-12 text-center">
                <button className="btn btn-transparent btn-primary btn-lg w-100 btn-left-justify">
                    <span>Deposit</span> 
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
                </div>
            </div>
            </div>
    </footer>
    </>
  )
}

export default App
