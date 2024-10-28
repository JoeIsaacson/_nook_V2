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

  const handleCheckBalance = () => {
    setShowBalance(true)
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">{balance?.formatted}</h2>
            <h5>ETH balance</h5>

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
    </>
  )
}

export default App
