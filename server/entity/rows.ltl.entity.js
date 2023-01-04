import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'
import { UserEntity } from './user.entity.js'

export const RowsLtlEntity = sequelize.define('rows-ltl', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  loadingAddress: {type: DataTypes.STRING},
  unloadingAddress: {type: DataTypes.STRING},
  region: {type: DataTypes.STRING},
  consignee: {type: DataTypes.STRING},
  bodyType: {type: DataTypes.STRING},
  deliveryCostOne: {type: DataTypes.STRING},
  deliveryCostTwo: {type: DataTypes.STRING},
  deliveryCostTree: {type: DataTypes.STRING},
  deliveryCostFor: {type: DataTypes.STRING},
  deliveryCostFive: {type: DataTypes.STRING},
  deliveryCostsSixEight: {type: DataTypes.STRING},
  deliveryCostsNineFifteen: {type: DataTypes.STRING},
  deliveryCostsSixteenTwenty: {type: DataTypes.STRING},
  deliveryCostsTwentyOneTwentyFive: {type: DataTypes.STRING}
})

UserEntity.hasOne(RowsLtlEntity)
RowsLtlEntity.belongsTo(UserEntity)