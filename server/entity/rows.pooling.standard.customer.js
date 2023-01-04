import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'
import { UserEntity } from './user.entity.js'

export const RowsPoolingStandardCustomer = sequelize.define('rows-pooling-standard-customer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  customerWarehouse: {type: DataTypes.STRING},
  consignee: {type: DataTypes.STRING},
  deliveryCity: {type: DataTypes.STRING},
  bodyType: {type: DataTypes.STRING},
  oneFifteen: {type: DataTypes.STRING},
  sixteenTwenty: {type: DataTypes.STRING},
  twentyOneTwentyFive: {type: DataTypes.STRING}
})

UserEntity.hasOne(RowsPoolingStandardCustomer)
RowsPoolingStandardCustomer.belongsTo(UserEntity)
