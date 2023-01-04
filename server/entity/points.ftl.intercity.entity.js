import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'

export const PointsFtlIntercityEntity = sequelize.define('points-ftl-intercity', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false}
})