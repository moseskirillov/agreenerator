import { sequelize } from '../db/connect.js'
import { DataTypes } from 'sequelize'

export const UserEntity = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  email: {
    type: DataTypes.STRING, allowNull: false, unique: true
  },
  password: {
    type: DataTypes.STRING, allowNull: false
  }
})