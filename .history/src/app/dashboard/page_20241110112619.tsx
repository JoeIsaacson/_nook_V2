'use client'

import { useAccount, useBalance } from 'wagmi'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter();
  const { address } = useAccount();  

  const { data: balance } = useBalance({
    address: address,
  });

  // Mock ETH price in USD 
  const ethPrice = 3165 // Example price
  // Calculate USD balance
  const usdBalance = balance ? (Number(balance.formatted) * ethPrice).toFixed(2) : '0.00'
  // Format ETH to 6 decimal places
  const formattedEth = balance ? Number(balance.formatted).toFixed(6) : '0.000000'


  // Fetch lending positions
  const fetchLendingAssetsRewards = () => {
    if (address) {
      fetch(
        `https://pro-openapi.debank.com/v1/user/protocol?id=0xbcb6c05ee1da1865ce07b2810cd5062fb5168cac&protocol_id=compound`,
        {
          headers: {
            'accept': 'application/json',
            'AccessKey': process.env.NEXT_PUBLIC_DEBANK_API_KEY || ''
          }
        }
      )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const lendingAssetsRewards = data.portfolio_item_list[0];
        console.log(lendingAssetsRewards);
        //console.log(lendingAssetsRewards[0].detail.supply_token_list);
        //return lendingAssetsRewards;
      })
      .catch(err => console.error('Error:', err));
    }
  };


  useEffect(() => {
    fetchLendingAssetsRewards();
  });

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

            <div className="row">
              {/* left side */}
              <div className="col-6">
                <h2>Reward balance 1</h2>
                <p></p>
              </div>
              {/* right side */}
              <div className="col-6">
                <h2>Reward balance 2</h2>
                <p>{lendingAssetsRewards}</p>
              </div>
            </div>
              
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
};