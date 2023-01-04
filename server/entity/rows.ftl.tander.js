import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'
import { UserEntity } from './user.entity.js'

export const RowsFtlTander = sequelize.define('rows-ftl-tander', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  loadingAddress: {type: DataTypes.STRING},
  transportType: {type: DataTypes.STRING},
  palletCapacity: {type: DataTypes.STRING},
  bodyType: {type: DataTypes.STRING},
  minimumPaid: {type: DataTypes.STRING},
  unloadingAddress: {type: DataTypes.STRING},
  consignee: {type: DataTypes.STRING},
  minRate: {type: DataTypes.STRING},
  rateEightIdle: {type: DataTypes.STRING},
  tariffAdditionalPoint: {type: DataTypes.STRING},
  prr: {type: DataTypes.STRING},
  forwarding: {type: DataTypes.STRING}
})

UserEntity.hasOne(RowsFtlTander)
RowsFtlTander.belongsTo(UserEntity)