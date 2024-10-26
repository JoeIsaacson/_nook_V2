'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useState } from 'react'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [showBalance, setShowBalance] = useState(false)

  const { data: balance } = useBalance({
    address: account.address,
  })

  const handleCheckBalance = () => {
    setShowBalance(true)
  }

  return (
    <>
      <div>
        <h2>_NOOK</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <>
            <button type="button" onClick={() => disconnect()}>
              Disconnect
            </button>
            <button type="button" onClick={handleCheckBalance}>
              Check ETH Balance
            </button>
            {showBalance && balance && (
              <div>
                Balance: {balance.formatted} {balance.symbol}
              </div>
            )}
          </>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
