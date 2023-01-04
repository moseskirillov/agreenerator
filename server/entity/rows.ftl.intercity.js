import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'
import { UserEntity } from './user.entity.js'

export const RowsFtlIntercity = sequelize.define('rows-ftl-intercity', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  loadingAddress: {type: DataTypes.STRING},
  unloadingCity: {type: DataTypes.STRING},
  bodyType: {type: DataTypes.STRING},
  tent: {type: DataTypes.STRING},
  isotherms: {type: DataTypes.STRING},
  refrigerator: {type: DataTypes.STRING}
})

UserEntity.hasOne(RowsFtlIntercity)
RowsFtlIntercity.belongsTo(UserEntity)
