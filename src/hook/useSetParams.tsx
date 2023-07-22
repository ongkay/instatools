import { useState, useEffect, useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const useSetParams = () => {
  const [urlParams, setUrlParams] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams: any = useSearchParams()

  const params = new URLSearchParams(searchParams)

  const setParams = (name: string, value: string) => {
    params.set(name, value)
    const paramsString = params.toString()

    const set = pathname + '?' + paramsString
    router.push(set)
    setUrlParams(set)
    // console.log(set)
  }

  // useEffect(() => {
  //   // const fullUrl = pathname + searchParams.toString() // get fullUrl + semua params
  //   // setUrlParams(fullUrl)

  //   const username = searchParams.get('username')
  //   const password = searchParams.get('pw')
  //   const token = searchParams.get('token')
  //   const hp = searchParams.get('hp')

  //   setDataSave(`${username}:${password}:${token}:${hp}`)
  //   console.log({ dataSave })
  // }, [urlParams])

  return { urlParams, setParams }
}

export default useSetParams
