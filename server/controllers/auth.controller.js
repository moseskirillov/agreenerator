import { UserEntity } from '../entity/user.entity.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sequelize } from '../db/connect.js'

export const register = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await findUser(email)
    if (user === null) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      await sequelize.transaction(async (t) => {
        await UserEntity.create({email: email, password: hash}, {transaction: t})
      })
      return res.status(200).json('OK')
    }
    return res.status(400).json({error: 'Пользователь уже существует!'})
  } catch (error) {
    console.error(error)
    return res.status(400).json({error: 'Произошла ошибка'})
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await findUser(email)
    if (user) {
      const passwordValid = bcrypt.compareSync(password, user.password)
      if (passwordValid) {
        const token = generateToken(email)
        return res.json({token: token})
      } else {
        return res.status(404).json({error: 'Неверный логин или пароль!'})
      }
    } else {
      return res.status(404).json({error: 'Неверный логин или пароль!'})
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({error: 'Произошла ошибка'})
  }
}

export const check = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (token) {
      const {email} = jwt.verify(token.replace(/Bearer\s/, ''), process.env.SECRET_TOKEN)
      const user = await findUser(email)
      if (user) {
        const token = generateToken(email)
        return res.json({token: token})
      } else {
        return res.status(400).json({error: 'Пользователь не подтвержден'})
      }
    } else {
      return res.status(400).json({error: 'Ошибка авторизации'})
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({error: 'Ошибка авторизации'})
  }
}

const findUser = async (email) => {
  return await UserEntity.findOne({
    where: {
      email: email
    }
  })
}

const generateToken = (email) => {
  return jwt.sign(
    {email},
    process.env.SECRET_TOKEN,
    {expiresIn: '24h'}
  )
}