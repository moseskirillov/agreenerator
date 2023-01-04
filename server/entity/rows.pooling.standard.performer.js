import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'
import { UserEntity } from './user.entity.js'

export const RowsPoolingStandardPerformer = sequelize.define('rows-pooling-standard-performer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  shipper: {type: DataTypes.STRING},
  consignee: {type: DataTypes.STRING},
  deliveryCity: {type: DataTypes.STRING},
  bodyType: {type: DataTypes.STRING},
  deliveryCost: {type: DataTypes.STRING}
})

UserEntity.hasOne(RowsPoolingStandardPerformer)
RowsPoolingStandardPerformer.belongsTo(UserEntity)
