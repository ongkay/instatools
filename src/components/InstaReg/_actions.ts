'use server'

import { getEmailText } from "@/src/lib/getEmailText"
import parser from 'mailparser'

const RegReset =
  /(https:\/\/instagram\.com\/accounts\/password)(\([-a-zA-Z0-9+&@#\/%=~_|$?!:;,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:;,.])*(\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegConfirm =
  /(?:https:\/\/instagram\.com\/accounts\/confirm)(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegOTP = /(?<=>)([0-9]{6})/gm

export async function getEmailAction(email: string, passmail: string, opsi: 'getOTP' | 'getLinkConfirm' | 'getLinkReset') {

  try {
    console.log(Date().toString() + " : --> Get Email Text")
    const dataMail = await getEmailText(
      email,
      passmail,
    ) as {
      idHeader: string
      body: string,
      mailFrom: string
    }
    console.log(Date().toString() + " : --> Get Email Text DONE")

    console.log(Date().toString() + " : --> Buka Parser")
    let Result: null | string = null
    const mail = await parser.simpleParser(dataMail.idHeader + dataMail.body)
    console.log("masuk parser")
    // console.log(mail.subject)
    // console.log(mail.from.text)
    // console.log(mail.html)
    let resMail = mail.html
    if (resMail) {
      console.log(Date().toString() + " : --> Parser Done")


      switch (opsi) {
        case 'getOTP':
          // Result = resMail.match(RegOTP)
          Result = '999777'
          console.log('Kode OTP = ' + Result)
          return Result

        case 'getLinkConfirm':
          let res = resMail.match(RegConfirm)
          Result = res ? res[0] : null
          console.log('Link konfirmasinya = ' + Result)
          return Result

        case 'getLinkReset':
          let res2 = resMail.match(RegReset)
          Result = res2 ? res2[0] : null
          console.log('Link reset password = ' + Result)
          return Result

        default:
          console.error('opsi tidak terpilih')
          return Result = null
      }
    }

    return Result

  } catch (e: any) {
    console.log("action Email error")
    console.error(e.message)
  }
  // await new Promise((resolve) => setTimeout(resolve, 7000));

  // revalidatePath('/')
  // return formData

}