import jwt from 'jsonwebtoken'
import { UserEntity } from '../entity/user.entity.js'
import { RowsLtlEntity } from '../entity/rows.ltl.entity.js'
import fs from 'fs'
import path from 'path'
import { createReport } from 'docx-templates'
import dotenv from 'dotenv'
import { sendMail } from '../service/agreements.send.service.js'
import { RowsFtlIntercity } from '../entity/rows.ftl.intercity.js'
import { RowsFtlMoskow } from '../entity/rows.ftl.moskow.js'
import { RowsFtlTander } from '../entity/rows.ftl.tander.js'
import { RowsPoolingAdd } from '../entity/rows.pooling.add.js'
import { RowsPoolingStandardPerformer } from '../entity/rows.pooling.standard.performer.js'
import { RowsPoolingStandardCustomer } from '../entity/rows.pooling.standard.customer.js'

dotenv.config()

export const generateAgreement = async (req, res) => {
  try {
    const token = req.headers.authorization.replace(/Bearer\s/, '')
    const {id, email} = await getUserData(token)
    const generatedDir = path.resolve(path.resolve('./docs/generated'))
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir)
    }
    const filePath = `./docs/generated/${req.body.type}-agreement-${email.split('@')[0]}-${req.body.data.contractNumber}.docx`
    if (req.body.type === 'ltl') {
      await generateLtlAgreement(req.body.data, id, filePath)
    }
    if (req.body.type === 'ftl') {
      await generateFtlAgreement(req.body.data, id, filePath)
    }
    if (req.body.type === 'pooling') {
      await generatePoolingAgreement(req.body.data, id, filePath)
    }
    const fileSend = await sendMail(fs.readFileSync(filePath, {encoding: 'base64'}), email)
    if (fileSend.response.status === 200) {
      fs.unlinkSync(filePath)
      return res.json({result: `Файл создан и отправлен на почту ${email}`})
    } else {
      return res.status(400).json({result: 'Ошибка отправки доп. соглашения на почту'})
    }
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({error: 'Произошла ошибка'})
  }
}

const getUserData = async (token) => {
  const {email} = jwt.verify(token, process.env.SECRET_TOKEN)
  const {id} = await UserEntity.findOne({
    where: {email: email}
  })
  return {id, email}
}

const generateLtlAgreement = async (data, userId, filePath) => {
  const dataRow = await RowsLtlEntity.findAll({where: {userId: userId}})
  data.chainRows = dataRow.filter(element => element.dataValues.consignee === 'сети')
  data.otherRows = dataRow.filter(element => element.dataValues.consignee === 'другое')
  const template = await fs.readFileSync(
    path.resolve(path.resolve('./docs/templates/ltl-template.docx')))
  const report = await createReport({
    template,
    data
  })
  await fs.writeFileSync(path.resolve(path.resolve(filePath)), report)
}

const generateFtlAgreement = async (data, userId, filePath) => {
  data.intercityRows = await RowsFtlIntercity.findAll({where: {userId: userId}})
  data.moskowRows = await RowsFtlMoskow.findAll({where: {userId: userId}})
  data.tanderRows = await RowsFtlTander.findAll({where: {userId: userId}})
  const template = await fs.readFileSync(
    path.resolve(path.resolve('./docs/templates/ftl-template.docx')))
  const report = await createReport({
    template,
    data
  })
  await fs.writeFileSync(path.resolve(path.resolve(filePath)), report)
}

const generatePoolingAgreement = async (data, userId, filePath) => {
  data.standardPerformer = (await RowsPoolingStandardPerformer.findAll({where: {userId: userId}})).map(e => e.dataValues)
  data.standardCustomer = (await RowsPoolingStandardCustomer.findAll({where: {userId: userId}})).map(e => e.dataValues)
  data.addCargo = (await RowsPoolingAdd.findAll({where: {userId: userId}})).map(e => e.dataValues)
  const template = await fs.readFileSync(
    path.resolve(path.resolve('./docs/templates/pooling-template.docx')))
  const report = await createReport({
    template,
    data
  })
  await fs.writeFileSync(path.resolve(path.resolve(filePath)), report)
}