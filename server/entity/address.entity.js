import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'

export const AddressEntity = sequelize.define('address', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  searchName: {
    type: DataTypes.STRING, unique: true
  },
  address: {
    type: DataTypes.STRING
  }
})