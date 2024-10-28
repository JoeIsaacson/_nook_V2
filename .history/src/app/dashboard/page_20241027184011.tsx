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
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
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

    </>
  )
}

export default App
