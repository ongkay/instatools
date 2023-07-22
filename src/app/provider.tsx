'use client'

import type { FC, ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { MantineProvider } from '@mantine/core'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <>
    <ThemeProvider attribute="class">
      <MantineProvider>{children}</MantineProvider>
    </ThemeProvider>
  </>
)

export default Providers
