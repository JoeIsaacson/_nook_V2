// Your existing page content goes here
'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useState } from 'react'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
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
          <button className="btn">
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
            <h1 className="mb-4 display-3">${usdBalance}</h1>
            <h5 className="mb-4">{formattedEth} ETH</h5>
            <div className="row">
                <div className="col-6">
                    <button className="btn btn-primary w-100">
                        Withdraw <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
                <div className="col-6">
                    <button className="btn btn-secondary w-100">
                        Details <i className="fa-solid fa-arrow-down"></i>
                    </button>
                </div>
            </div>
            <h5 className="mb-4">$200 earned</h5>

            {account.status === 'connected' && (
              <div className="mb-4">
                <button className="btn btn-danger me-2" type="button" onClick={() => disconnect()}>
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    {/* Footer */}
    <footer className="fixed-bottom">
            <div className="container py-3">
            <div className="row">
                <div className="col-12 text-center">
                <button className="btn btn-transparent btn-lg w-100 btn-left-justify">
                    Deposit <i className="fa-solid fa-arrow-right"></i>
                </button>
                </div>
            </div>
            </div>
    </footer>
    </>
  )
}

export default App
