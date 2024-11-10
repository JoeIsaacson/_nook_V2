'use client'

import { useAccount, useBalance } from 'wagmi'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter();
  const { address } = useAccount();
  
  // Mock ETH price in USD 
  const ethPrice = 3165 // Example price
  // Create state for lending positions
  const [lendingAssetsRewards, setLendingAssetsRewards] = useState<any[]>([]);
  const [lendingPrinciple, setLendingPrinciple] = useState<any[]>([]);

  // Fetch lending position
  const fetchLendingData = useCallback(() => {
    if (address) {
      fetch(
        `https://pro-openapi.debank.com/v1/user/protocol?id=${address}&protocol_id=compound`,
        {
          headers: {
            'accept': 'application/json',
            'AccessKey': process.env.NEXT_PUBLIC_DEBANK_API_KEY || ''
          }
        }
      )
      .then(res => res.json())
      .then(data => {
        const portfolioItem = data.portfolio_item_list[0].detail;
        setLendingAssetsRewards(portfolioItem.reward_token_list);
        setLendingPrinciple(portfolioItem.supply_token_list[0].amount);
      })
      .catch(err => console.error('Error:', err));
    }
  }, [address]);

  // Only run once when address changes
  useEffect(() => {
    fetchLendingData();
  }, [address]);
  
  // format the lending returns in USD
  const compPrice = 52.55;
  const formattedLendingRewards = lendingAssetsRewards.map(reward => 
    (reward.amount * compPrice).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );

  // format the lending principle in USD
  const formattedLendingPrincipleUSD = (Number(lendingPrinciple) * ethPrice).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const formattedLendingPrincipleETH = Number(lendingPrinciple).toFixed(6);
  // testing grounds
  console.log('Outside function:', formattedLendingPrincipleUSD);

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
            <h1 className="mb-4 display-1">${formattedLendingPrincipleETH}</h1>
            <h6 className="mb-4">{Number(lendingPrinciple).toFixed(6)} ETH</h6>
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
            <h6 className="my-4">
              ${formattedLendingRewards} earned
            </h6>
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
