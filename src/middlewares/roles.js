import { roles } from '../models/User.js'

export const isAdmin = (req, res, next) => {
  if (req.user.role !== roles.ADMIN) {
    return res.sendStatus(403)
  }

  next()
}