import axios from 'axios'
import { adaotp } from '../config/adaotp'

const tmdb = axios.create({
  baseURL: adaotp.baseUrl,
  params: {
    api_key: adaotp.apiKey,
  },
})

export const getInfoSaldo = async () => {
  try {
    const url = 'get-profile/'
    const endPoint = adaotp.baseUrl + url + adaotp.apiKey

    const response = await axios.get(endPoint)
    // console.log(response.data)

    if (response.data.success === true) {
      let res = response.data.data.data.saldo
      console.log(res)
      return res
    } else return undefined
  } catch (err) {
    return undefined
  }
}

const data = {
  order_id: '5494943',
  aplikasi_id: '210',
  number: '085796319788',
  status: '1',
  sms: null,
  status_sms: '0',
  price: '688',
  last_saldo: '16239',
  created_at: '2023-06-07 17:43:04',
  last_sms: '2023-06-07 17:43:04',
  aplikasi_name: 'Instagram',
}

export const newOrderOTP = async () => {
  try {
    const url = 'set-orders/'
    const idService = '210'
    const endPoint = adaotp.baseUrl + url + adaotp.apiKey + idService

    const response = await axios.get(endPoint)

    if (response.data.success === true) {
      let res = response.data.data.data
      return res
    } else return undefined
  } catch (err) {
    return undefined
  }
}

export const getOrderByIdAO = async (id: string) => {
  try {
    if (id.length < 2) {
      console.log('data ID tidak boleh kosong')
      return undefined
    }

    const url = 'get-orders/'
    const endPoint = adaotp.baseUrl + url + adaotp.apiKey + id

    const response = await axios.get(endPoint)

    if (response.data.success === true) {
      let res = response.data.data.data
      return res[0]
    } else return undefined
  } catch (err) {
    return undefined
  }
}

export const cancelOrderAO = async (id: string) => {
  try {
    if (id.length < 2) {
      console.log('data ID tidak boleh kosong')
      return undefined
    }
    const url = 'cancle-orders/'
    const endPoint = adaotp.baseUrl + url + adaotp.apiKey + id

    const response = await axios.get(endPoint)
    console.log(response.data)

    if (response.data.success === true) {
      let res = response.data.data.data
      console.log(res)
      return res
    } else return undefined
  } catch (err) {
    return undefined
  }
}

export const finishOrderAO = async (id: string) => {
  try {
    if (id.length < 2) {
      console.log('data ID tidak boleh kosong')
      return undefined
    }

    const url = 'finish-orders/'
    const endPoint = adaotp.baseUrl + url + adaotp.apiKey + id

    const response = await axios.get(endPoint)

    if (response.data.success === true) {
      let res = response.data.data.data
      return res
    } else return undefined
  } catch (err) {
    return undefined
  }
}
