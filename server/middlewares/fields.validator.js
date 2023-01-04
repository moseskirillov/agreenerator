import { parse } from '../util/parser.date.js'
import { AddressEntity } from '../entity/address.entity.js'

export const fieldsNormalizer = async (req, res, next) => {
  req.body.data.validityContractDate = parse(req.body.data.validityContractDate)
  req.body.data.docDate = parse(req.body.data.docDate)
  req.body.data.contractDate = parse(req.body.data.contractDate)
  if (req.body.type === 'ltl') {
    await ltlFieldsNormalizer(req, res, next)
  }
  if (req.body.type === 'ftl') {
    await ftlFieldsNormalizer(req, res, next)
  }
  if (req.body.type === 'pooling') {
    await poolingFieldsNormalizer(req, res, next)
  }
}

const ltlFieldsNormalizer = async (req, res, next) => {
  try {
    if (req.body.data.contractorWarehouse !== '') {
      const contractorAddress = await getWarehouseAddress(req.body.data.contractorWarehouse)
      req.body.data.contractorAddress = contractorAddress
      req.body.data.fromContractorWarehouses = `со склада Исполнителя, расположенного по адресу: ${contractorAddress}, `
    } else {
      req.body.data.fromContractorWarehouses = null
    }
    if (req.body.data.customerWarehouse !== '') {
      req.body.data.fromCustomerWarehouse = `со склада Заказчика, расположенного по адресу: ${req.body.data.customerWarehouse}, `
    } else {
      req.body.data.fromCustomerWarehouse = null
    }
    if (req.body.data.docType === 'Приложение') {
      req.body.data.docTypeGenitive = 'Приложения'
    } else if (req.body.data.docType === 'Доп. соглашение') {
      req.body.data.docTypeGenitive = 'Доп. соглашения'
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(400).json({response: 'Ошибка валидации полей'})
  }
}

const ftlFieldsNormalizer = async (req, res, next) => {
  next()
}

const poolingFieldsNormalizer = async (req, res, next) => {
  req.body.data.ltlDate = parse(req.body.data.ltlDate)
  if (req.body.data.contractorWarehouse !== '') {
    req.body.data.contractorAddress = await getWarehouseAddress(req.body.data.contractorWarehouse)
  } else {
    req.body.data.contractorAddress = ''
  }
  next()
}

export const getWarehouseAddress = async (searchName) => {
  const address = await AddressEntity.findOne({
    where: {
      searchName: searchName
    }
  })
  return address.dataValues.address
}