'use client'

import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Welcome to _NOOK</h1>
        <p className="lead">GET TO IT</p>
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => router.push('/dashboard')}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
