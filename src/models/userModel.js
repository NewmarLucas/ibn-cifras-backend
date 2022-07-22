const { sign } = require('../config/jwt')
const UserSchema = require('../database/schema/user')

const emailExists = (email) => {
  const user = UserSchema.find({ email: email })
  return user?.length > 0
}

const register = async (data) => {
  if (emailExists(data.email)) {
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
