'use client'
import { Button, CopyButton, Input, Loader, Paper, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Icon2fa, IconKey, IconSend } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import getTotp from '@/src/lib/TotpGenerator'
import useSetParams from '@/src/hook/useSetParams'
import { useSearchParams } from 'next/navigation'

export function Totp() {
  const searchParams: any = useSearchParams()
  const { setParams } = useSetParams()
  const [show, setShow] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [otpValue, setOtpValue] = useState<string>('')
  const form = useForm({
    initialValues: {
      token: '',
    },
  })

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      form.setFieldValue('token', token)
      setShow(true)
      const getOtp = getTotp(token)
      setResult(getOtp)
      setOtpValue(getOtp)
    }
  }, [])

  return (
    <>
      {!show ? (
        <>
          <Button
            color="indigo"
            fullWidth
            justify="space-between"
            leftSection={<Icon2fa size={18} />}
            rightSection={<span />}
            onClick={() => {
              setShow(true)
            }}
          >
            Minta OTP 2fac
          </Button>
        </>
      ) : (
        <>
          <form
            onSubmit={form.onSubmit((values) => {
              const token = values.token.replace(/ /g, '')
              const getOtp = getTotp(token)
              setParams('token', token)
              setResult(getOtp)
              setOtpValue(getOtp)
            })}
            className="w-full"
          >
            <div className="flex items-center justify-center w-full gap-1">
              <Input
                required
                leftSection={<IconKey size={18} />}
                placeholder="Masukkan Token disini..."
                w={'100%'}
                {...form.getInputProps('token')}
              />
              <Button type="submit" color="teal" leftSection={<IconSend size={18} />}>
                Send
              </Button>
            </div>
          </form>

          <>
            <div className="flex flex-col items-center justify-center w-[70%] gap-2">
              <CopyButton value={otpValue}>
                {({ copied, copy }) => (
                  <>
                    <Paper
                      shadow="lg"
                      radius="md"
                      withBorder
                      className="cursor-pointer"
                      p="md"
                      w={'100%'}
                      bg={result ? 'cyan' : 'gray'}
                      onClick={() => {
                        if (result) {
                          copy()
                          console.log('sedang mengkopi OTP')
                        }
                      }}
                    >
                      <div className="flex flex-col items-center justify-center w-full gap-1 mb-2">
                        {result ? (
                          <>
                            {copied ? (
                              <>
                                <Text ta={'center'}>Mengkopi Kode OTP 2fuck</Text>
                              </>
                            ) : (
                              <>
                                <Text ta={'center'}>2fac OTP :</Text>
                              </>
                            )}
                            <Title ta={'center'} order={1}>
                              {result}
                            </Title>
                          </>
                        ) : (
                          <>
                            <Text ta={'center'}>masukkan kode tokennya</Text>
                            <Loader color="pink" />
                          </>
                        )}
                      </div>
                    </Paper>
                  </>
                )}
              </CopyButton>
            </div>
          </>
        </>
      )}
    </>
  )
}
