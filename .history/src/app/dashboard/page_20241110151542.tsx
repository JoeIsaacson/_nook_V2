'use client'

import { useAccount, useBalance } from 'wagmi'
import { useState, useEffect, useCallback } from 'react'
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
  const [lendingAssetsRewards, setLendingAssetsRewards] = useState<any[]>([]);

  const fetchLendingAssetsRewards = useCallback(() => {
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
        // Only set state if we have new data
        setLendingAssetsRewards(data.portfolio_item_list[0].detail.reward_token_list);
      })
      .catch(err => console.error('Error:', err));
    }
  }, [address]); // Only recreate if address changes

  // Fetch the lending principle
  const [lendingPrinciple, setLendingPrinciple] = useState<any[]>([]);

  const fetchLendingPrinciple = useCallback(() => {
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
        console.log(data);
        setLendingPrinciple(data.portfolio_item_list[0].detail.supply_token_list);
        //console.log(lendingPrinciple[0].supply_token_list[0].amounts);
      })
      .catch(err => console.error('Error:', err));
    }
  }, [address]);

  // Only run once when address changes
  useEffect(() => {
    fetchLendingAssetsRewards();
  }, [address]); // Remove fetchLendingAssetsRewards from dependencies

  // Only run once when address changes
  useEffect(() => {
    fetchLendingPrinciple();
  }, [address]); // Remove fetchLendingPrinciple from dependencies

  // get the COMP price token
  //const compPrice = lendingAssetsRewards.find(reward => reward.token_address === '0xc00e94cb662c3520282e6f5717214004a7f26888');
  
  // format the lending returns in USD
  const compPrice = 52.55;
  const formattedLendingRewards = lendingAssetsRewards.map(reward => 
    (reward.amount * compPrice).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
  // testing grounds
  // console.log(formattedLendingRewards);
  // console.log('Outside function:', lendingAssetsRewards);
  console.log('Outside function:', lendingPrinciple);

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
