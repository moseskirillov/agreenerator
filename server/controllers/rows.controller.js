import jwt from 'jsonwebtoken'
import { UserEntity } from '../entity/user.entity.js'
import { RowsLtlEntity } from '../entity/rows.ltl.entity.js'
import { AddressEntity } from '../entity/address.entity.js'
import { PointsFtlIntercityEntity } from '../entity/points.ftl.intercity.entity.js'
import { RowsFtlIntercity } from '../entity/rows.ftl.intercity.js'
import { RowsFtlMoskow } from '../entity/rows.ftl.moskow.js'
import { RowsFtlTander } from '../entity/rows.ftl.tander.js'
import { RowsPoolingStandardPerformer } from '../entity/rows.pooling.standard.performer.js'
import { RowsPoolingAdd } from '../entity/rows.pooling.add.js'
import { RowsPoolingStandardCustomer } from '../entity/rows.pooling.standard.customer.js'
import { sequelize } from '../db/connect.js'

export const saveRows = async (req, res) => {
  const {type, data} = req.body
  const token = req.headers.authorization.replace(/Bearer\s/, '')
  const decode = jwt.verify(token, process.env.SECRET_TOKEN)
  const {id} = await UserEntity.findOne({where: {email: decode.email}})
  switch (type) {
    case 'ltl':
      await saveLtl(data, id, res)
      break
    case 'ftl':
      await saveFtl(data, id, res)
      break
    case 'pooling':
      await savePooling(data, id, res)
      break
    default:
      return res.status(400).json({error: 'Неверный тип данных'})
  }
}

export const getRows = async (req, res) => {
  try {
    const type = req.query.type
    const token = req.headers.authorization.replace(/Bearer\s/, '')
    const decode = jwt.verify(token, process.env.SECRET_TOKEN)
    const {id} = await UserEntity.findOne({where: {email: decode.email}})
    let rows = [[]]
    if (type === 'ltl') {
      rows = await getLtlRows(id)
    }
    if (type === 'ftl') {
      rows = await getFtlRows(id)
    }
    if (type === 'pooling') {
      rows = await getPoolingRows(id)
    }
    return res.json({data: rows})
  } catch (error) {
    console.error(error)
    return res.status(400).json({response: 'Произошла ошибка при получении данных'})
  }
}

export const getLtlRows = async (userId) => {
  const data = await RowsLtlEntity.findAll({where: {userId: userId}})
  const rows = [[]]
  if (data.length > 0) {
    rows.length = 0
    for (const row of data) {
      rows.push([
        row.loadingAddress,
        row.unloadingAddress,
        row.region,
        row.consignee,
        row.bodyType,
        row.deliveryCostOne,
        row.deliveryCostTwo,
        row.deliveryCostTree,
        row.deliveryCostFor,
        row.deliveryCostFive,
        row.deliveryCostsSixEight,
        row.deliveryCostsNineFifteen,
        row.deliveryCostsSixteenTwenty,
        row.deliveryCostsTwentyOneTwentyFive
      ])
    }
  }
  return rows
}

const getFtlRows = async (userId) => {
  const intercity = await RowsFtlIntercity.findAll({where: {userId: userId}})
  const moskow = await RowsFtlMoskow.findAll({where: {userId: userId}})
  const tander = await RowsFtlTander.findAll({where: {userId: userId}})
  const intercityRows = [[]]
  const moskowRows = [[]]
  const tanderRows = [[]]
  if (intercity.length > 0) {
    intercityRows.length = 0
    for (const row of intercity) {
      intercityRows.push([
        row.loadingAddress,
        row.unloadingCity,
        row.bodyType,
        row.tent,
        row.isotherms,
        row.refrigerator
      ])
    }
  }
  if (moskow.length > 0) {
    moskowRows.length = 0
    for (const row of moskow) {
      moskowRows.push([
        row.loadingAddress,
        row.transportType,
        row.palletCapacity,
        row.bodyType,
        row.minimumPaid,
        row.firstZone,
        row.secondZone,
        row.thirdZone,
        row.fourth,
        row.rateEightIdle,
        row.tariffAdditionalPoint,
        row.prr,
        row.forwarding
      ])
    }
  }
  if (tander.length > 0) {
    tanderRows.length = 0
    for (const row of tander) {
      tanderRows.push([
        row.loadingAddress,
        row.transportType,
        row.palletCapacity,
        row.bodyType,
        row.minimumPaid,
        row.unloadingAddress,
        row.consignee,
        row.minRate,
        row.rateEightIdle,
        row.tariffAdditionalPoint,
        row.prr,
        row.forwarding
      ])
    }
  }
  return {
    intercity: intercityRows,
    moskow: moskowRows,
    tander: tanderRows
  }
}

const getPoolingRows = async (userId) => {
  const standardPerformer = await RowsPoolingStandardPerformer.findAll({where: {userId: userId}})
  const standardCustomer = await RowsPoolingStandardCustomer.findAll({where: {userId: userId}})
  const addCargo = await RowsPoolingAdd.findAll({where: {userId: userId}})
  const standardCustomerRows = [[]]
  const standardPerformerRows = [[]]
  const addCargoRows = [[]]
  if (standardPerformer.length > 0) {
    standardPerformerRows.length = 0
    for (const row of standardPerformer) {
      standardPerformerRows.push([
        row.shipper,
        row.consignee,
        row.deliveryCity,
        row.bodyType,
        row.deliveryCost
      ])
    }
  }
  if (standardCustomer.length > 0) {
    standardCustomerRows.length = 0
    for (const row of standardCustomer) {
      standardCustomerRows.push([
        row.customerWarehouse,
        row.consignee,
        row.deliveryCity,
        row.bodyType,
        row.oneFifteen,
        row.sixteenTwenty,
        row.twentyOneTwentyFive,
        row.twentySix,
        row.twentySeven,
        row.twentyEight,
        row.twentyNine,
        row.thirty,
        row.thirtyOne,
        row.thirtyTwo,
        row.thirtyThree
      ])
    }
  }
  if (addCargo.length > 0) {
    addCargoRows.length = 0
    for (const row of addCargo) {
      addCargoRows.push([
        row.customerWarehouse,
        row.deliveryCity,
        row.bodyType,
        row.deliveryCostFtl,
        row.customerDiscount,
        row.deliveryTariff,
        row.pickupTariff
      ])
    }
  }
  return {
    standardPerformer: standardPerformerRows,
    standardCustomer: standardCustomerRows,
    addCargo: addCargoRows
  }
}

export const getAddresses = async (req, res) => {
  const result = await AddressEntity.findAll()
  const addresses = []
  for (const address of result) {
    addresses.push({searchName: address.searchName, address: address.address})
  }
  return res.json(addresses)
}

export const getIntercityPoints = async (req, res) => {
  try {
    const result = await PointsFtlIntercityEntity.findAll()
    const points = []
    for (const point of result) {
      points.push(point.name)
    }
    return res.json({points: points})
  } catch (error) {
    console.error(error)
    return res.status(400).json({error: 'Ошибка получения списка городов'})
  }
}

const saveLtl = async (data, userId, res) => {
  try {
    await RowsLtlEntity.destroy({where: {}, truncate: true})
    for (const row of data) {
      await sequelize.transaction(async (t) => {
        await RowsLtlEntity.create({
          userId: userId,
          loadingAddress: row[0],
          unloadingAddress: row[1],
          region: row[2],
          consignee: row[3],
          bodyType: row[4],
          deliveryCostOne: row[5],
          deliveryCostTwo: row[6],
          deliveryCostTree: row[7],
          deliveryCostFor: row[8],
          deliveryCostFive: row[9],
          deliveryCostsSixEight: row[10],
          deliveryCostsNineFifteen: row[11],
          deliveryCostsSixteenTwenty: row[12],
          deliveryCostsTwentyOneTwentyFive: row[13]
        }, {transaction: t})
      })
    }
    return res.json({result: 'Данные сохранены'})
  } catch (error) {
    console.error(error)
    return res.status(400).json({result: 'Произошла ошибка при сохранении!'})
  }
}

const saveFtl = async (data, userId, res) => {
  try {
    await RowsFtlIntercity.destroy({where: {}, truncate: true})
    await RowsFtlMoskow.destroy({where: {}, truncate: true})
    await RowsFtlTander.destroy({where: {}, truncate: true})
    for (const row of data.intercity) {
      await sequelize.transaction(async (t) => {
        await RowsFtlIntercity.create({
          userId: userId,
          loadingAddress: row[0],
          unloadingCity: row[1],
          bodyType: row[2],
          tent: row[3],
          isotherms: row[4],
          refrigerator: row[5]
        }, {transaction: t})
      })
    }
    for (const row of data.moskow) {
      await sequelize.transaction(async (t) => {
        await RowsFtlMoskow.create({
          userId: userId,
          loadingAddress: row[0],
          transportType: row[1],
          palletCapacity: row[2],
          bodyType: row[3],
          minimumPaid: row[4],
          firstZone: row[5],
          secondZone: row[6],
          thirdZone: row[7],
          fourth: row[8],
          rateEightIdle: row[9],
          tariffAdditionalPoint: row[10],
          prr: row[11],
          forwarding: row[12]
        }, {transaction: t})
      })
    }
    for (const row of data.tander) {
      await sequelize.transaction(async (t) => {
        await RowsFtlTander.create({
          userId: userId,
          loadingAddress: row[0],
          transportType: row[1],
          palletCapacity: row[2],
          bodyType: row[3],
          minimumPaid: row[4],
          unloadingAddress: row[5],
          consignee: row[6],
          minRate: row[7],
          rateEightIdle: row[8],
          tariffAdditionalPoint: row[9],
          prr: row[10],
          forwarding: row[11]
        }, {transaction: t})
      })
    }
    return res.json({result: 'Данные сохранены'})
  } catch (error) {
    console.error(error)
    return res.status(400).json({result: 'Произошла ошибка при сохранении!'})
  }
}

const savePooling = async (data, userId, res) => {
  try {
    await RowsPoolingStandardPerformer.destroy({where: {}, truncate: true})
    await RowsPoolingStandardCustomer.destroy({where: {}, truncate: true})
    await RowsPoolingAdd.destroy({where: {}, truncate: true})
    for (const row of data.standardPerformer) {
      await sequelize.transaction(async (t) => {
        await RowsPoolingStandardPerformer.create({
          userId: userId,
          shipper: row[0],
          consignee: row[1],
          deliveryCity: row[2],
          bodyType: row[3],
          deliveryCost: row[4]
        }, {transaction: t})
      })
    }
    for (const row of data.standardCustomer) {
      await sequelize.transaction(async (t) => {
        await RowsPoolingStandardCustomer.create({
          userId: userId,
          customerWarehouse: row[0],
          consignee: row[1],
          deliveryCity: row[2],
          bodyType: row[3],
          oneFifteen: row[4],
          sixteenTwenty: row[5],
          twentyOneTwentyFive: row[6]
        }, {transaction: t})
      })
    }
    for (const row of data.addData) {
      await sequelize.transaction(async (t) => {
        await RowsPoolingAdd.create({
          userId: userId,
          customerWarehouse: row[0],
          deliveryCity: row[1],
          bodyType: row[2],
          deliveryCostFtl: row[3],
          customerDiscount: row[4],
          deliveryTariff: row[5],
          pickupTariff: row[6]
        }, {transaction: t})
      })
    }
    return res.json({result: 'Данные сохранены'})
  } catch (error) {
    return res.status(400).json({result: 'Произошла ошибка при сохранении!'})
  }
}