'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Details() {
  const router = useRouter();
  const [apy, setApy] = useState<string>('');

  useEffect(() => {
    // Get the APY from localStorage
    const storedAPY = localStorage.getItem('formattedAPY');
    if (storedAPY) {
      setApy(storedAPY);
      // Optionally clear the data after retrieving
      localStorage.removeItem('formattedAPY');
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
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="position-absolute start-50 translate-middle-x">
              <span className="navbar-text">Details</span>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="mt-4">
            <h5>Transaction Details</h5>
            <p>APY: {apy}%</p>
          </div>
        </div>
      </div>
    </>
  )
}