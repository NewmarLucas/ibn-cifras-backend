const { login, register } = require('../models/userModel')

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await login(email, password)
    if (user === 'Invalid user') {
      return res.status(401).json({ msg: user })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.register = async (req, res) => {
  const data = req.body
  try {
    const user = await register(data)
    if (user === 'Email already exists' || user === 'Wrong data') {
      res.status(400).json(user)
      return
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
