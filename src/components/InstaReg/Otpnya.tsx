'use client'

import { Button, CopyButton, Loader, Paper, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconPhonePlus } from '@tabler/icons-react'
import {
  cancelOrderAO,
  finishOrderAO,
  getOrderByIdAO,
  newOrderOTP,
} from '@/src/lib/getAdaOTP'
import { useSearchParams } from 'next/navigation'
import useSetParams from '@/src/hook/useSetParams'
import InputCopy from './InputCopy'
import { useDisclosure } from '@mantine/hooks'
import { Drawer } from '@mantine/core'

export function Otpnya() {
  const [opened, { open, close }] = useDisclosure(false)
  const searchParams: any = useSearchParams()
  const { setParams } = useSetParams()
  const [canceled, setCanceled] = useState(false)
  const [loadingHp, setLoadingHp] = useState(false)
  const [showHp, setShowHp] = useState(false)
  const [result, setResult] = useState<null | string>(null)
  const [request, setRequest] = useState(0)
  const [dataOTP, setDataOTP] = useState({
    saldo: '',
    hp: '',
    otp: '',
    idOrder: '',
  })

  const getNewHpHandler = async () => {
    const res = await newOrderOTP()
    setDataOTP({
      ...dataOTP,
      idOrder: res?.order_id,
      hp: res?.number,
      otp: res?.sms,
      saldo: res?.last_saldo,
    })
    setParams('hp', res.number)
    setParams('idOrder', res?.order_id)
    setLoadingHp(false)
    setShowHp(true)
    setRequest(1)
  }

  const getOTPHandler = async () => {
    if (dataOTP.idOrder) {
      const res = await getOrderByIdAO(dataOTP.idOrder)
      const jsonOTP = res?.sms
      const cekId = res?.order_id

      if (cekId) {
        setRequest(request + 1)
        setDataOTP({
          ...dataOTP,
          saldo: res?.last_saldo,
        })

        if (jsonOTP) {
          const findSmsOtp: any = JSON.stringify(jsonOTP).match(/(\d{3} \d{3})/g)
          const otpnya = findSmsOtp[0].split(' ').join('')
          setResult(otpnya)
          setDataOTP({
            ...dataOTP,
            otp: otpnya,
            saldo: res?.last_saldo,
          })
          setRequest(0)
          setParams('otp', otpnya)
          finishOrderHandler()

          //// tester aja
          // const findSmsOtp2: any = jsonOTP.match(/(\d{3} \d{3})/g)
          // const otpnya2 = findSmsOtp2[0].split(' ').join('')
          // console.log(otpnya2)
        }
      } else {
        console.log('gagal get OTP handler karena response tidak ada orderidnya')
        setRequest(0)
        setCanceled(true)
        setResult('GAGAL')
      }
    }
  }

  const cancelOrderHandler = async () => {
    await cancelOrderAO(dataOTP.idOrder)
    setRequest(0)
    setCanceled(true)
    setParams('hp', '')
    setParams('idOrder', '')
  }

  const finishOrderHandler = async () => {
    await finishOrderAO(dataOTP.idOrder)
    setCanceled(true)
    setRequest(0)
    setParams('idOrder', '')
    console.log('orderan OTP telah selesai')
  }

  useEffect(() => {
    if (!result && request >= 1 && !canceled) {
      setTimeout(() => {
        getOTPHandler()

        if (request >= 80) {
          setRequest(0)
          cancelOrderHandler()
        }
        console.log('Request')
      }, 10000)
    }
  }, [showHp, request])

  useEffect(() => {
    const idOrder = searchParams.get('idOrder')
    const hp = searchParams.get('hp')
    const otp = searchParams.get('otp') || ''

    if (idOrder) {
      setShowHp(true)
      setLoadingHp(false)
      setDataOTP({
        ...dataOTP,
        hp,
        idOrder,
        otp,
      })

      if (otp) {
        setCanceled(true)
        setRequest(0)
        setResult(otp)
      } else {
        setRequest(2)
        setCanceled(false)
      }
    }
  }, [])

  return (
    <>
      <Drawer
        opened={opened}
        position="bottom"
        size="xl"
        onClose={close}
        title="Alamat email ready"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div className="flex flex-col items-center justify-center w-full gap-3 px-3 pt-4 mx-auto xl:w-1/3">
          {!showHp ? (
            <>
              <Button
                fullWidth
                color="indigo"
                loading={loadingHp}
                justify="space-between"
                leftSection={<IconPhonePlus size={18} />}
                rightSection={<span />}
                onClick={() => {
                  getNewHpHandler()
                  setLoadingHp(true)
                }}
              >
                Kirimkan No Hp baru!!
              </Button>
            </>
          ) : (
            <>
              <InputCopy
                name="No Hapenya"
                value={dataOTP?.hp}
                icon={<IconPhonePlus size={18} />}
              />

              {!loadingHp && (
                <>
                  <div className="flex flex-col items-center justify-center w-[70%] gap-2">
                    <CopyButton value={dataOTP.otp}>
                      {({ copied, copy }) => (
                        <>
                          <Paper
                            shadow="lg"
                            radius="md"
                            withBorder
                            className="cursor-pointer"
                            p="md"
                            w={'100%'}
                            bg={result && result !== 'GAGAL' ? 'cyan' : 'gray'}
                            onClick={() => {
                              if (result) {
                                copy()
                              }
                            }}
                          >
                            <div className="flex flex-col items-center justify-center w-full gap-1 mb-2">
                              {result ? (
                                <>
                                  {copied ? (
                                    <>
                                      <Text ta={'center'}>Mengkopi Kode OTP</Text>
                                    </>
                                  ) : (
                                    <>
                                      <Text ta={'center'}>kode OTP :</Text>
                                    </>
                                  )}
                                  <Title ta={'center'} order={1}>
                                    {result}
                                  </Title>
                                </>
                              ) : (
                                <>
                                  <Text ta={'center'}>Meminta OTP: {request}</Text>
                                  <Loader color="pink" />
                                </>
                              )}
                            </div>
                          </Paper>
                        </>
                      )}
                    </CopyButton>
                    {!result && (
                      <>
                        <Button
                          variant="light"
                          color="red"
                          fullWidth
                          onClick={() => {
                            cancelOrderHandler()
                            setShowHp(false)
                          }}
                        >
                          Batalkan
                        </Button>
                      </>
                    )}
                    <Text ta={'center'} size="md">
                      saldo : Rp. {dataOTP.saldo}
                    </Text>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Drawer>
      <Button
        fullWidth
        color="indigo"
        loading={loadingHp}
        justify="space-between"
        leftSection={<IconPhonePlus size={18} />}
        rightSection={<span />}
        onClick={open}
      >
        Minta Nomor HP
      </Button>
    </>
  )
}
