'use client'

import { Button, CopyButton, Input } from '@mantine/core'
import { useEffect, useState } from 'react'
import {
  IconArrowsShuffle,
  IconHome,
  IconMicroscope,
  IconAt,
  IconUser,
  IconLink,
  IconLock,
  IconDownload,
} from '@tabler/icons-react'
import { getRandomUser } from '@/src/lib/getRandomUser'
import { Otpnya } from './Otpnya'
import { Totp } from './Totp'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import useSetParams from '@/src/hook/useSetParams'
import { IconRefresh } from '@tabler/icons-react'
import InputCopy from './InputCopy'
import { Email } from './Email'
import { RandomData } from './RandomData'
import { useDisclosure } from '@mantine/hooks'
import { Drawer } from '@mantine/core'

export function InstaReg() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams: any = useSearchParams()
  const [myDomain, setMyDomain] = useState('')
  const [myDomains, setMyDomains] = useState('')

  const { urlParams, setParams } = useSetParams()
  const [dataSave, setDataSave] = useState('')
  const [dataUser, setdataUser] = useState({
    username: '',
    fullName: '',
    bio: '',
    password: '',
    lahir: '',
  })

  const [opened, { open, close }] = useDisclosure(false)

  const randomKlikHandler = () => {
    if (urlParams.length > 1) router.push('/')

    const getUserData = getRandomUser()
    setdataUser(getUserData)
  }

  const dataSaveHandler = () => {
    const username = searchParams.get('username')
    const password = searchParams.get('pw')
    const token = searchParams.get('token')
    const hp = searchParams.get('hp')

    setDataSave(`${username}:${password}:${token}:${hp}`)
  }

  const getUrlHandler = () => {
    setMyDomain(window.location.href)
  }

  useEffect(() => {
    const getUserData = getRandomUser()

    const fullName = searchParams.get('fullName') || getUserData.fullName
    const username = searchParams.get('username') || getUserData.username
    const password = searchParams.get('pw') || getUserData.password
    const lahir = getUserData.lahir

    fullName
      ? setdataUser({ bio: getUserData.bio, fullName, username, password, lahir })
      : setdataUser(getUserData)
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-3 px-5 m-5 mx-auto xl:w-1/3">
        <div className="flex items-center justify-center w-full gap-1">
          <Button
            variant="light"
            color="red"
            size="xs"
            leftSection={<IconHome size={16} />}
            fullWidth
            onClick={() => {
              router.replace('/')
              setTimeout(() => {
                location.reload()
              }, 500)
            }}
          >
            Home
          </Button>
          <Button
            variant="light"
            color="red"
            size="xs"
            leftSection={<IconRefresh size={16} />}
            fullWidth
            onClick={() => {
              location.reload()
            }}
          >
            Reload
          </Button>
          <CopyButton value={myDomain}>
            {({ copied, copy }) => (
              <Button
                variant="light"
                size="xs"
                leftSection={<IconLink size={18} />}
                color={copied ? 'teal' : 'red'}
                onClick={() => {
                  getUrlHandler()
                  copy()
                }}
              >
                {copied ? 'mengkopi url' : 'copy URL'}
              </Button>
            )}
          </CopyButton>
        </div>

        <CopyButton value={dataSave}>
          {({ copied, copy }) => (
            <Button
              fullWidth
              variant="light"
              leftSection={<IconDownload size={18} />}
              color={copied ? 'teal' : 'yellow'}
              onClick={() => {
                dataSaveHandler()
                copy()
              }}
            >
              {copied ? '2x klik copy!' : 'Get Data'}
            </Button>
          )}
        </CopyButton>

        <Totp />
        <Otpnya />
        <Email />
        <RandomData />
        <Button
          variant="filled"
          color="grape"
          leftSection={<IconArrowsShuffle size={16} />}
          fullWidth
          onClick={randomKlikHandler}
        >
          Radom data
        </Button>

        <InputCopy
          name="Name"
          value={dataUser.fullName}
          actions={() => {
            setParams('fullName', dataUser.fullName)
          }}
          icon={<IconUser size={18} />}
        />

        <InputCopy
          name="User"
          value={dataUser.username}
          actions={() => {
            setParams('username', dataUser.username)
          }}
          icon={<IconAt size={18} />}
        />

        <InputCopy
          name="Password"
          value={dataUser.password}
          actions={() => {
            setParams('pw', dataUser.password)
          }}
          icon={<IconLock size={18} />}
        />

        <InputCopy
          name="Bio"
          value={dataUser.bio}
          actions={() => {
            dataSaveHandler()
          }}
          icon={<IconMicroscope size={18} />}
        />

        <Button fullWidth variant="default">
          {dataUser.lahir}
        </Button>

        <>
          <Drawer
            opened={opened}
            onClose={close}
            title="Authentication"
            position="bottom"
            size="xl"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          >
            <div className="flex flex-col items-center justify-center w-full gap-3 px-5 m-5 mx-auto xl:w-1/3">
              <Button
                variant="filled"
                color="grape"
                leftSection={<IconArrowsShuffle size={16} />}
                fullWidth
                onClick={randomKlikHandler}
              >
                Radom data
              </Button>

              <InputCopy
                name="Name"
                value={dataUser.fullName}
                actions={() => {
                  setParams('fullName', dataUser.fullName)
                }}
                icon={<IconUser size={18} />}
              />

              <InputCopy
                name="User"
                value={dataUser.username}
                actions={() => {
                  setParams('username', dataUser.username)
                }}
                icon={<IconAt size={18} />}
              />

              <InputCopy
                name="Password"
                value={dataUser.password}
                actions={() => {
                  setParams('pw', dataUser.password)
                }}
                icon={<IconLock size={18} />}
              />

              <InputCopy
                name="Bio"
                value={dataUser.bio}
                actions={() => {
                  dataSaveHandler()
                }}
                icon={<IconMicroscope size={18} />}
              />

              <Button fullWidth variant="default">
                {dataUser.lahir}
              </Button>
            </div>
          </Drawer>

          <Button onClick={open}>Open drawer</Button>
        </>
      </div>
    </>
  )
}
