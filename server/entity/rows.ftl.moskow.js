import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'
import { UserEntity } from './user.entity.js'

export const RowsFtlMoskow = sequelize.define('rows-ftl-moskow', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  loadingAddress: {type: DataTypes.STRING},
  transportType: {type: DataTypes.STRING},
  palletCapacity: {type: DataTypes.STRING},
  bodyType: {type: DataTypes.STRING},
  minimumPaid: {type: DataTypes.STRING},
  firstZone: {type: DataTypes.STRING},
  secondZone: {type: DataTypes.STRING},
  thirdZone: {type: DataTypes.STRING},
  fourth: {type: DataTypes.STRING},
  rateEightIdle: {type: DataTypes.STRING},
  tariffAdditionalPoint: {type: DataTypes.STRING},
  prr: {type: DataTypes.STRING},
  forwarding: {type: DataTypes.STRING}
})

UserEntity.hasOne(RowsFtlMoskow)
RowsFtlMoskow.belongsTo(UserEntity)