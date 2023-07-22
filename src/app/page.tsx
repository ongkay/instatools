// 'use client'

import { Suspense } from 'react'
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle'
import { InstaReg } from '../components/InstaReg'

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <InstaReg />
        <ColorSchemeToggle />
      </Suspense>
    </>
  )
}
