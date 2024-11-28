'use client'

import { OnchainProviderConfig } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { getConfig } from '@/wagmi'

export function Providers({ 
  children,
  initialState 
}: { 
  children: ReactNode
  initialState?: any 
}) {
  const config = getConfig()
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainProviderConfig>
          {children}
        </OnchainProviderConfig>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
