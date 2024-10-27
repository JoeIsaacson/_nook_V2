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
      </div>

      <div className='flex flex-col items-center justify-center'>
        <h2>_Nook</h2>
        <p>
          Nook connects your savings with the world.
        </p>
             {connectors.slice(0, 1).map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            Sign in with Coinbase Wallet
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
