import { sleep } from "./utils"


// @ts-ignore
const imaps = require('imap-simple2')
const simpleParser = require('mailparser').simpleParser
const _ = require('lodash')

const RegReset =
  /(https:\/\/instagram\.com\/accounts\/password)(\([-a-zA-Z0-9+&@#\/%=~_|$?!:;,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:;,.])*(\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegConfirm =
  /(?:https:\/\/instagram\.com\/accounts\/confirm)(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegOTP = /(?<=>)([0-9]{6})/gm

export const getMailku = async (email: string, passmail: string, opsi: "getOTP" | "getLinkConfirm" | "getLinkReset") => {
  let Result: null | string = null

  let isMailru =
    email.includes('@mail.ru') ||
    email.includes('@inbox.ru') ||
    email.includes('@list.ru') ||
    email.includes('@bk.ru')

  let isOutlook = email.includes('@outlook.com') || email.includes('@hotmail.com')

  let hostnya = isMailru
    ? 'imap.mail.ru'
    : isOutlook
      ? 'outlook.office365.com'
      : undefined

  console.log({ hostnya })

  if (!hostnya) {
    console.log('Email host terdeteksi bukan mailru atau outlook')
    return null
  } else {
    const config = {
      imap: {
        user: email,
        password: passmail,
        host: hostnya,
        port: 993,
        tls: true,
        authTimeout: 30000,
      },
    }


    return imaps.connect(config).then(function (connection: any) {
      console.log('connection')

      return connection.openBox('INBOX').then(function () {
        const searchCriteria = ['1:5']
        const fetchOptions = {
          bodies: ['HEADER', 'TEXT', ''],
        }
        return connection.search(searchCriteria, fetchOptions).then(function (messages: any) {
          console.log("messages")
          console.log(messages)

          messages.forEach(function (item: any) {
            const all = _.find(item.parts, { which: '' })
            const id = item.attributes.uid
            const idHeader = 'Imap-Id: ' + id + '\r\n'
            const tgl = item.attributes.date
            console.log(tgl) //  new Date('2023-06-18T00:42:24.000Z')
            // filter berdasarkan tgl 
            simpleParser(idHeader + all.body, (err: any, mail: any) => {
              console.log("masuk parser")
              if (mail.from.text.includes('Team')) {
                // if (mail.from.text.includes('Instagram')) {
                console.log(mail.subject)
                console.log(mail.from.text)
                // console.log(mail.html)
                let resMail = mail.html
                switch (opsi) {
                  case 'getOTP':
                    // Result = resMail.match(RegOTP)
                    Result = '456456'
                    console.log('Kode OTP = ' + Result)
                    break

                  case 'getLinkConfirm':
                    let res = resMail.match(RegConfirm)
                    Result = res ? res[0] : null
                    console.log('Link konfirmasinya = ' + Result)
                    break

                  case 'getLinkReset':
                    let res2 = resMail.match(RegReset)
                    Result = res2 ? res2[0] : null
                    console.log('Link reset password = ' + Result)
                    break

                  default:
                    console.error('opsi tidak terpilih')
                }
              }
              connection.end()
              return Result

            })
            console.log('selesai pert......................!!!!!!!!!!!!!!!!!!!!!')

          })

          console.log('selesai terakhir......................!!!!!!!!!!!!!!!!!!!!!')
          return Result
        })
      })
    })

    // await sleep(9000)
    // console.log("waiting first --> done")
    // if (!Result) {
    //   await sleep(4000)
    //   console.log("waiting 2nd --> done")
    // }

    // return Result


  }
}
