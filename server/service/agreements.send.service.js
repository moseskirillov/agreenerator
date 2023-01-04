import Mailjet from 'node-mailjet'
import dotenv from 'dotenv'

dotenv.config()

export const sendMail = async function (file, email) {
  return Mailjet.apiConnect(process.env.MJ_API_KEY, process.env.MJ_APISECRET)
  .post('send', {version: 'v3.1'})
  .request({
    Messages: [{
      From: {
        Email: 'ru-ipi-developers@fmlogistic.com',
        Name: 'Agreement Generator'
      },
      To: [
        {
          Email: email,
          Name: 'Manager'
        }
      ],
      Subject: 'Создано новое доп. соглашение',
      TextPart: 'Создано новое доп. соглашение. Оно находится во вложении к этому письму',
      Attachments: [
        {
          ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          Filename: 'agreement.docx',
          Base64Content: file
        }
      ]
    }]
  })
}