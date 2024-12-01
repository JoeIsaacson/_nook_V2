'use client'

import { useAccount } from 'wagmi'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const { address } = useAccount()

  // Constants
  const assetPrice = 1 // Asset currently set to USDC
  const nextPayout = 4

  const [lendingPrinciple, setLendingPrinciple] = useState<any[]>([]);
  const [lendingAssetsRewards, setLendingAssetsRewards] = useState<any[]>([]);
  const [assetAPY, setAssetAPY] = useState(0);

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
        //console.log('Protocol List:', data);
      })
  }, []);

  // Data fetching
  const fetchLendingData = useCallback(() => {
    if (!address) return;

    const apiKey = process.env.NEXT_PUBLIC_DEBANK_API_KEY;
    console.log('Using API Key:', apiKey ? 'Present' : 'Missing');

    // Main call with explicit chain parameter
    fetch(
      `https://pro-openapi.debank.com/v1/user/protocol?id=${address}&protocol_id=base_moonwell&chain_ids[]=base`,
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
        //console.log('API Response for Base:', data);
        if (data.portfolio_item_list && data.portfolio_item_list.length > 0) {
          const portfolioItem = data.portfolio_item_list[0].detail;
          const rewardTokenSummary = portfolioItem.reward_token_list;

          const sumRewardAmounts = (rewardList: any[]) => {
            console.log('rewardList', rewardList);
            return rewardList.map((token) => {
              return {
                tokenName: token.asset,
                amount: Number(token.amount),
                valueInUSDC: Number(token.amount) * Number(token.price_in_usdc)
              };
            });
          };

          const totalRewards = sumRewardAmounts(rewardTokenSummary);

          console.log('totalRewards', totalRewards);

          // Set the principle and rewards
          setLendingPrinciple(portfolioItem.supply_token_list[0].amount);
          // Set the rewards
          setLendingAssetsRewards(totalRewards);
          console.log('what is lendingPrinciple', portfolioItem.reward_token_list);
        } else {
          console.log('No data found');
        }
      })
      .catch(err => {
        console.error('Fetch Error:', err);
        console.error('Address:', address);
        console.error('API Key Present:', !!apiKey);
      });
  }, [address]);

  const fetchAssetAPY = useCallback(() => {
    // Fetch asset APY
    fetch('https://yields.llama.fi/pools')
      .then(res => res.json())
      .then(data => {
        // Find Moonwell protocol on Base chain
        const moonwellPool = data.data.find((pool: any) => 
          pool.project === "moonwell" &&
          pool.symbol === "USDC"
        );

        //console.log(moonwellPool);
        
        if (moonwellPool) {
          setAssetAPY(moonwellPool.apyBase);
        } else {
          console.warn('Moonwell pool not found');
          setAssetAPY(0);
        }
      })
      .catch(err => console.error('Error fetching APY:', err))
  }, []);

  // RUN IT ALL BABY
  useEffect(() => {
    protcolList()
    fetchLendingData()
    fetchAssetAPY()
  }, [address, fetchLendingData])

  // Principle value
  const formattedLendingPrincipleUSD = (Number(lendingPrinciple) * assetPrice).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Rewards value
  const formattedLendingRewards = lendingAssetsRewards.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  // APY value
  const formattedAPY = assetAPY.toFixed(2)

  return (
    <div className="dashboard-page container">
      <div className="row">
        <div className="left-panel col-6 d-none d-lg-block d-flex align-items-center justify-content-center">
          <div className="desktop-title-and-version align-items-center justify-content-center h-100">
            <p className="display-4 fs-4 text-decoration-underline text-center">nook</p>
            <p className="text-center small">V 0.00.4</p>
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
                    <button 
                      className="btn btn-transparent w-100 btn-outline-none border-0" 
                      onClick={() => {
                        const dashboardData = {
                          formattedLendingRewards: formattedLendingRewards,
                          formattedAPY: formattedAPY
                        };
                        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
                        router.push('/dashboard/details');
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>

                <h6 className="my-4 small">
                  ${(Number(formattedLendingRewards) || 0).toFixed(2)} earned
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
                  className="btn btn-lg btn-transparent btn-primary w-100 btn-left-justify mt-5"
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