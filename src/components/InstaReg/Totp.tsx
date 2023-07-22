'use client'
import { Button, CopyButton, Input, Loader, Paper, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Icon2fa, IconKey, IconSend } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import getTotp from '@/src/lib/TotpGenerator'
import useSetParams from '@/src/hook/useSetParams'
import { useSearchParams } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks'
import { Drawer } from '@mantine/core'

export function Totp() {
  const [opened, { open, close }] = useDisclosure(false)
  const searchParams: any = useSearchParams()
  const { setParams } = useSetParams()
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
      const getOtp = getTotp(token)
      setResult(getOtp)
      setOtpValue(getOtp)
    }
  }, [])

  return (
    <>
      <Drawer
        opened={opened}
        position="bottom"
        size="xl"
        onClose={close}
        title="TOTP 2fa"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div className="flex flex-col items-center justify-center w-full gap-3 px-3 pt-4 mx-auto xl:w-1/3">
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
            <div className="flex flex-col items-center justify-center w-full gap-1">
              <Input.Wrapper label="Masukkan Token 2fa" w={'100%'}>
                <Input
                  required
                  leftSection={<IconKey size={18} />}
                  placeholder="Paste Tokennya disini..."
                  w={'100%'}
                  {...form.getInputProps('token')}
                />
              </Input.Wrapper>

              <Button
                w={'100%'}
                size="xs"
                type="submit"
                color="teal"
                leftSection={<IconSend size={18} />}
              >
                Kirim kodenya
              </Button>
            </div>
          </form>

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
      </Drawer>

      <Button
        color="indigo"
        fullWidth
        justify="space-between"
        leftSection={<Icon2fa size={18} />}
        rightSection={<span />}
        onClick={open}
      >
        Minta OTP 2fac
      </Button>
    </>
  )
}
