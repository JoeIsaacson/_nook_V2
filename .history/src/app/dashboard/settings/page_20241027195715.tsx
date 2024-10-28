'use client'

import { useRouter } from 'next/navigation'

function Settings() {
  const router = useRouter()

  return (
      <h1>Settings</h1>

      {account.status === 'connected' && (
        <div className="mb-4">
          <button className="btn btn-danger me-2" type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
      )}
  )
}

export default Settings