const UserSchema = require('../database/schema/user')

const { verify } = require('../config/jwt')

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    const [, token] = req.headers.authorization.split(' ')

    try {
      const payload = await verify(token)

      const user = await UserSchema.findOne({ _id: payload.user })

      if (!user) {
        res.status(401).json({ msg: 'User not exists' })
        return
      }

      req.auth = user
      next()
      return
    } catch (err) {
      res.status(500).json({ error: err })
    }
  } else {
    res.status(401).json({ error: 'Invalid token' })
  }
}
