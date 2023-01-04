import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'
import { UserEntity } from './user.entity.js'

export const RowsPoolingAdd = sequelize.define('rows-pooling-add', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  customerWarehouse: {type: DataTypes.STRING},
  deliveryCity: {type: DataTypes.STRING},
  bodyType: {type: DataTypes.STRING},
  deliveryCostFtl: {type: DataTypes.STRING},
  customerDiscount: {type: DataTypes.STRING},
  deliveryTariff: {type: DataTypes.STRING},
  pickupTariff: {type: DataTypes.STRING}
})

UserEntity.hasOne(RowsPoolingAdd)
RowsPoolingAdd.belongsTo(UserEntity)
