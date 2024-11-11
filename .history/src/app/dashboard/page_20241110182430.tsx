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


  const [compoundUSDCAPY, setCompoundUSDCAPY] = useState(0);

  useEffect(() => {
    fetch('https://yields.llama.fi/pools')
      .then(res => res.json())
      .then(data => {
        // const compoundUSDC = data.data.find(pool => 
        //   pool.project === 'compound' && pool.symbol === 'USDC'
        // );
        // console.log(`USDC APY: ${compoundUSDC.apy}%`);
        console.log(data);
        console.log(data.data[45].apy);
        // set the compound USDC APY
        setCompoundUSDCAPY(data.data[45].apy);
      });
  }, []);

  console.log('Compound USDC APY:', compoundUSDCAPY);

  const nextPayout = 4;
  const formattedAPY = compoundUSDCAPY.toFixed(2);

  return (
    <>
      <div className="container">
      <div className="row">
          <div className="left-panel col-6 d-none d-lg-block">Hi, it's me</div>
          <div className="right-panel col-12 col-lg-6">

      {/* <!--Right hand side / small device size--> */}

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
            <h1 className="mb-4 display-1">${formattedLendingPrincipleUSD}</h1>
            <h6 className="mb-4 small">{formattedAPY}% APY · Next payout in {nextPayout}h</h6>
            <div className="row">
              <div className="col-6">
                <button className="btn btn-transparent w-100">
                  Withdraw
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-transparent w-100 btn-outline-none border-0">
                  Details
                </button>
              </div>
            </div>
            <h6 className="my-4">
              ${formattedLendingRewards} earned
            </h6>
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
      </div>
      </div>
      </div>
      </div>
    </>
  )
};
