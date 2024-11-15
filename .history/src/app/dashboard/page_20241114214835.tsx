'use client'

import { useAccount, useBalance } from 'wagmi'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const { address } = useAccount()

  // Constants
  const ethPrice = 3165  // Mock ETH price in USD
  const compPrice = 52.55
  const nextPayout = 4

  // State
  const [lendingAssetsRewards, setLendingAssetsRewards] = useState<any[]>([]);
  const [lendingPrinciple, setLendingPrinciple] = useState<any[]>([]);
  const [compoundUSDCAPY, setCompoundUSDCAPY] = useState(0);

  const protcolList = useCallback(() => {

    const apiKey = process.env.NEXT_PUBLIC_DEBANK_API_KEY;

    fetch(
      `https://pro-openapi.debank.com//v1/protocol/all_list`,
        {
          headers: {
            'accept': 'application/json',
            'AccessKey': apiKey || ''
          }
        }
      ).then(res => res.json())
      .then(data => {
        console.log('Protocol List:', data);
      })
  }, []);

  // Data fetching
  const fetchLendingData = useCallback(() => {
    if (!address) return;

    const apiKey = process.env.NEXT_PUBLIC_DEBANK_API_KEY;
    console.log('Using API Key:', apiKey ? 'Present' : 'Missing'); // Debug log

    console.log(protcolList);

    fetch(
      `https://pro-openapi.debank.com/v1/user/protocol?id=${address}&protocol_id=compound`,
      {
        headers: {
          'accept': 'application/json',
          'AccessKey': apiKey || ''
        }
      }
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('API Response:', data); // Debug log
        const portfolioItem = data.portfolio_item_list[0].detail;
        setLendingAssetsRewards(portfolioItem.reward_token_list);
        setLendingPrinciple(portfolioItem.supply_token_list[0].amount);
      })
      .catch(err => {
        console.error('Fetch Error:', err);
        console.error('Address:', address);
        console.error('API Key Present:', !!apiKey);
      });
  }, [address]);

  // Effects
    useEffect(() => {
    fetchLendingData()
    protcolList();
  }, [address, fetchLendingData, protcolList])

  useEffect(() => {
    fetch('https://yields.llama.fi/pools')
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setCompoundUSDCAPY(data.data[45].apy)
        console.log('Compound USDC APY is', compoundUSDCAPY);
      })
      .catch(err => console.error('Error fetching APY:', err))
  }, []);

  // Formatted values
  const formattedLendingRewards = lendingAssetsRewards.map(reward =>
    (reward.amount * compPrice).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  )

  const formattedLendingPrincipleUSD = (Number(lendingPrinciple) * ethPrice).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  const formattedAPY = compoundUSDCAPY.toFixed(2)

  return (
    <div className="container">
      <div className="row">
        <div className="left-panel col-6 d-none d-lg-block d-flex align-items-center justify-content-center">
          <div className="desktop-title-and-version align-items-center justify-content-center h-100">
            <p className="display-4 fs-4 text-decoration-underline text-center">nook</p>
            <p className="text-center small">V 0.00.0</p>
          </div>
        </div>

        <div className="right-panel col-12 col-lg-6">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container d-flex justify-content-end px-0">
              <button
                className="btn"
                onClick={() => router.push('/dashboard/settings')}
              >
                <i className="fas fa-cog"></i>
              </button>
              <button
                className="btn"
                onClick={() => router.push('/dashboard/notifications')}
              >
                <i className="fas fa-bell"></i>
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <div className="mt-5">
            <div className="row">
              <div className="col-12">
                <h1 className="mb-4 display-1 fw-normal">${formattedLendingPrincipleUSD}</h1>
                <h6 className="mb-4 small"><span className="text-decoration-underline">{formattedAPY}% APY</span> · Next payout in {nextPayout}h</h6>

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

                <h6 className="my-4 small">
                  ${formattedLendingRewards} earned
                </h6>
              </div>

              {/* Footer */}
              <footer className="d-none d-lg-block">
                <div className="py-2 text-center">
                  <button
                    className="btn btn-transparent btn-primary w-100 btn-left-justify mt-5"
                    onClick={() => router.push('/dashboard/deposit-flow')}
                  >
                    <span>Deposit</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </footer>
            </div>

            {/* Footer */}
            <footer className="fixed-bottom mt-5 d-lg-none">
              <div className="container py-3 text-center">
                <button
                  className="btn btn-transparent btn-primary w-100 btn-left-justify mt-5"
                  onClick={() => router.push('/dashboard/deposit-flow')}
                >
                  <span>Deposit</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  )
};