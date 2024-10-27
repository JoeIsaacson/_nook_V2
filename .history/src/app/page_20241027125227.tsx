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
      <div>
        <h2>Controls</h2>
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
        {connectors.slice(0, 1).map((connector) => (
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

      <div className='flex flex-col items-center justify-center'>
        <h2>_Nook</h2>
        <p>
          _Nook is a platform for creating and sharing digital assets.
        </p>
        <div>
        <h2>Connect</h2>
   
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
