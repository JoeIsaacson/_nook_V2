'use client'

import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Welcome to _NOOK</h1>
        <p className="lead">Your Web3 Gateway</p>
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => router.push('/dashboard')}
        >
          Enter App
        </button>
      </div>
    </div>
  )
}
