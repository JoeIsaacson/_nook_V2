'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface DashboardData {
  formattedLendingRewards: string;
  formattedAPY: string;
  totalRewardsObject: any[];
}

export default function Details() {
  const router = useRouter();
  const [details, setDetails] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Get the APY from localStorage
    const dashboardData = localStorage.getItem('dashboardData');
    
    if (dashboardData) {
      const parsedData: DashboardData = JSON.parse(dashboardData);

      console.log(parsedData);
      //
      setDetails(parsedData);
    }
  }, []);

  return (
    <>
      <div className="notifications-screen">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <button
              className="btn"
              onClick={() => router.push('/dashboard')}
            >
              <i className="fas fa-xmark"></i>
            </button>
          </div>
        </nav>

        <div className="container mt-2">
          <h6 className="small">You are earning {details?.formattedAPY}% APY</h6>
          <h2 className="mt-2 mb-3">What happens next</h2>
        </div>

        {/* graphic*/}

        <div className="details-graphic blur-overlay d-block d-sm-none">
          <img src="/img/GRAPH.png" alt="graphic" />
        </div>

        {/* payout schedule */}
        <div className="container mt-2 px-0">
          {/* notifications list */}
          <ul className="settings-list-stacked list-group list-group-flush">
            <li className="list-group-item px-4 py-3">
              <div className="row">
                <div className="col-auto d-flex align-items-center">
                  <div className="list-item-circle completed"></div>
                </div>
                <div className="col">
                  <p className="mb-0 fw-normal text-decoration-underline">Friday</p>
                  <p className="mb-0 fw-normal">Expected reward</p>
                </div>
              </div>
            </li>

            <li className="list-group-item px-4 py-3">
              <div className="row">
                <div className="col-auto d-flex align-items-center">
                  <div className="list-item-circle"></div>
                </div>
                <div className="col">
                  <p className="mb-0 fw-normal text-decoration-underline">Dec 8</p>
                  <p className="mb-0 fw-normal">Expected reward</p>
                </div>
              </div>
            </li>

          </ul>
        </div>

        <div className="container mt-4">
          <h6 className="mb-4 small">Earnings</h6>
          <h2 className="">Your breakdown of earnings</h2>
          <p className="mb-0 small">You have earned ${details?.formattedLendingRewards} in yield for an average of {details?.formattedAPY}% return on your deposit</p>
          {/* progress bar */}
          <div className="progress-stacked mt-4">
            <div className="progress" role="progressbar" aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} style={{ width: '80%' }}>
              <div className="progress-bar"></div>
            </div>
            <div className="progress" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} style={{ width: '20%' }}>
              <div className="progress-bar bg-secondary"></div>
            </div>
          </div>
        </div>

        <div className="container mt-2 px-0">
          {/* notifications list */}
          {/* <div className="list-group list-group-flush">
            {totalRewardsObject?.map((reward, index) => (

              <li key={index} className="list-group-item px-4 py-3">
                <div className="row">
                  <div className="col-auto d-flex align-items-center">
                    <div className="list-item-square"></div>
                  </div>
                  <div className="col">
                    <p className="mb-0 fw-normal">Moonwell</p>
                  </div>
                  <div className="col-auto">
                    <p className="mb-0 fw-normal">${reward.valueInUSDC.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))} */}

          </div>

          <div className="container">
          <button className="btn btn-transparent w-100 mt-2">Learn more</button>
          </div>

        </div>



        <div className="container mt-4 pb-4">
          <h6 className="mb-4 small">Deposits and payouts</h6>
          <h2 className="">Transferring money out</h2>
          <p className="small fw-normal">You can move your funds whenever you wish and are never locked</p>
          <button className="btn btn-transparent w-100 mt-2">Learn more</button>
        </div>

      </div>
    </>
  )
}