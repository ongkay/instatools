import '@mantine/core/styles.css'
import '@/styles/globals.css'
import React from 'react'
import { ColorSchemeScript } from '@mantine/core'
import Providers from './provider'

export const metadata = {
  title: 'Insta Tools',
  description: 'Robot buat daftar aja',
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
