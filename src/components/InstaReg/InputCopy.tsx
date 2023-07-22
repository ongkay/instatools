import useSetParams from '@/src/hook/useSetParams'
import { Button, CopyButton, Input } from '@mantine/core'
import { IconAt, IconClipboardCheck, IconCopy } from '@tabler/icons-react'
import { ReactNode, useEffect, useState } from 'react'

interface Props {
  value: string
  actions?: () => void
  icon?: ReactNode
  name?: string
  params?: string
}

export default function InputCopy({ value, actions, icon, name, params }: Props) {
  const [values, setValues] = useState(value)
  const { urlParams, setParams } = useSetParams()

  useEffect(() => {
    setValues(value)
  }, [value])
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-1">
        <Input.Wrapper label={name} w={'100%'}>
          <Input
            placeholder="Loading....."
            onChange={(event) => setValues(event.currentTarget.value)}
            leftSection={icon}
            value={values}
          />
        </Input.Wrapper>

        <CopyButton value={values}>
          {({ copied, copy }) => (
            <Button
              w={'100%'}
              size="xs"
              color={copied ? 'teal' : 'blue'}
              onClick={() => {
                copy()
                if (params) setParams(params, values)
                if (actions) actions()
              }}
            >
              {copied ? (
                <>
                  <IconClipboardCheck size={15} /> Copied {name}
                </>
              ) : (
                <>
                  <IconCopy size={15} />
                  Copy {name}
                </>
              )}
            </Button>
          )}
        </CopyButton>
      </div>
    </>
  )
}
