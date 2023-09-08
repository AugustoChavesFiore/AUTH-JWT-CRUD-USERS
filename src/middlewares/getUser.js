import { getUserbyId } from '../models/User.js'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.sendStatus(404)
  }

  const { user: userId } = jwt.verify(token, environments.SECRET)

  const user = await getUserbyId(userId)

  if (!user) {
    return res.sendStatus(403)
  }

  req.user = user
  next()
}