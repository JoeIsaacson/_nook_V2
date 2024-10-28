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

          <div className="col-12">
            <h2 className="mb-3">Connect</h2>
            {connectors.slice(0, 1).map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
                className="btn btn-primary mb-2"
              >
                {connector.name}
              </button>
            ))}
            <div>{status}</div>
            {error?.message && (
              <div className="alert alert-danger mt-2">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
