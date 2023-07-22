'use client'

import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ColorSchemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const { setTheme } = useTheme()
  const dark = colorScheme === 'dark'

  useEffect(() => {
    setIsDark(dark)
    setTheme(colorScheme)
  }, [colorScheme])

  function setThemes() {
    isDark ? setColorScheme('light') : setColorScheme('dark')
  }

  return (
    <Group mt="xl" justify="center">
      <ActionIcon
        variant="light"
        color={isDark ? 'yellow' : 'blue'}
        size="xl"
        onClick={setThemes}
      >
        {isDark ? (
          <IconSun size={20} stroke={1.5} />
        ) : (
          <IconMoonStars size={20} stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  )
}
