import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '../wagmi'

import { Analytics } from "@vercel/analytics/react"

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '_nook!',
  description: 'Generated by @joey',
}

export default async function RootLayout(props: { children: ReactNode }) {
  const headersList = await headers()
  const initialState = cookieToInitialState(
    getConfig(),
    headersList.get('cookie'),
  )

  return (
    <html lang="en" className="layout-root">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body className={inter.className}>
        <Providers initialState={initialState}>{props.children}</Providers>
      </body>
    </html>
  )
}
