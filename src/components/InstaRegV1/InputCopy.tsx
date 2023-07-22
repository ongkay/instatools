import { Button, CopyButton, Input } from '@mantine/core'
import { IconAt, IconClipboardCheck, IconCopy } from '@tabler/icons-react'
import { ReactNode, useEffect, useState } from 'react'

interface Props {
  value: string
  actions?: () => void
  icon?: ReactNode
  name?: string
}

export default function InputCopy({ value, actions, icon, name }: Props) {
  const [values, setValues] = useState('')
  console.log(values)

  return (
    <>
      <div className="flex items-center justify-center w-full gap-1">
        <Input
          placeholder="Loading....."
          onChange={(event) => setValues(event.currentTarget.value)}
          leftSection={icon}
          value={values}
          w={'100%'}
        />
        <CopyButton value={values}>
          {({ copied, copy }) => (
            <Button
              w={'25%'}
              color={copied ? 'teal' : 'blue'}
              onClick={() => {
                copy()
                if (actions) actions()
              }}
            >
              {copied ? <IconClipboardCheck size={20} /> : <IconCopy size={20} />}
            </Button>
          )}
        </CopyButton>
      </div>
    </>
  )
}
