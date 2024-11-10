'use client'

import { useAccount, useBalance } from 'wagmi'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function App() {
  const router = useRouter();
  const { address } = useAccount();
  const [lendingPositions, setLendingPositions] = useState<any[]>([]);

  const { data: balance } = useBalance({
    address: address,
  });

  // Mock ETH price in USD (you'll want to replace this with real price data)
  const ethPrice = 3165 // Example price
  const usdBalance = balance ? (Number(balance.formatted) * ethPrice).toFixed(2) : '0.00'

  // console.log(balance, usdBalance);

  console.log(balance);

  // Format ETH to 6 decimal places
  const formattedEth = balance ? Number(balance.formatted).toFixed(6) : '0.000000'

  useEffect(() => {
    if (address) {
      fetch(
        `https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=${address}`,
        {
          headers: {
            'accept': 'application/json',
            'AccessKey': process.env.NEXT_PUBLIC_DEBANK_API_KEY || ''
          }
        }
      )
      .then(res => res.json())
      .then(data => {
        // Filter for lending protocols and positions
        const lending = data.filter((protocol: any) => {
          return protocol.portfolio_item_list.some((item: any) => 
            item.detail.supply_token_list || // For Aave-like protocols
            item.detail.lending_token_list    // For Compound-like protocols
          )
        });
        
        console.log('All lending positions:', lending);
        setLendingPositions(lending);
      })
      .catch(err => console.error('Error:', err));
    }
  }, [address]);

  // Example of displaying the data
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
            <i className="fas fa-cog"></i>
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

      <div>
        <h2>Your Lending Positions</h2>
        {lendingPositions.map((protocol: any) => (
          <div key={protocol.id}>
            <h3>{protocol.name}</h3>
            <p>Total Value: ${protocol.portfolio_item_list.reduce((acc: number, item: any) => 
              acc + (item.stats.net_usd_value || 0), 0).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
