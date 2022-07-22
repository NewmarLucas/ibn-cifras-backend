const { sign } = require('../config/jwt')
const UserSchema = require('../database/schema/user')

const register = async (data) => {
  if (!data?.name || !data?.email || !data?.password) {
    return 'Wrong data'
  }

  const user = await UserSchema.findOne({ email: data.email })
  if (user) {
    return 'Email already exists'
  }

  await new UserSchema({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || 'ADMIN',
  }).save()

  return 'Created'
}

const login = async (email, password) => {
  try {
    const user = await UserSchema.findOne({
      email: email,
      password: password,
    }).select('-password')
    if (!user) {
      return 'Invalid user'
    }
    const token = sign({ user: user._id })
    return { user, token }
  } catch (err) {
    return err
  }
}

module.exports = {
  register,
  login,
}
