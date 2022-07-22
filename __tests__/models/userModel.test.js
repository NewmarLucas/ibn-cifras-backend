const mockingoose = require('mockingoose')
const UserSchema = require('../../src/database/schema/user')

const {
  register,
  login
} = require('../../src/models/userModel')

const userDataExample = [{
  _id: '6276b734b96ee7d3f2530cbf',
  name: 'username',
  email: 'email@gmail.com',
  password: '12345678',
  role: 'ADMIN',
}]

describe('userModel functions', () => {
  //Create a new user
  it('Should register a new user', async () => {
    mockingoose(UserSchema).toReturn(null, 'findOne')
    const data = {
      name: 'username',
      email: 'email@gmail.com',
      password: '12345678',
      role: 'ADMIN',
    }
    const response = await register(data)
    expect(response).toBe('Created')
  })

  it('Should receive an error when register a new user with a wrong data', async () => {
    mockingoose(UserSchema).toReturn(null, 'findOne')
    const data = {
      name: 'username',
      role: 'ADMIN',
    }
    const response = await register(data)
    expect(response).toBe('Wrong data')
  })

  it('Should receive an error when register a new user with a already existing email', async () => {
    mockingoose(UserSchema).toReturn(userDataExample, 'findOne')
    const data = {
      name: 'username',
      email: 'email@gmail.com',
      password: '12345678',
      role: 'ADMIN',
    }
    const response = await register(data)
    expect(response).toBe('Email already exists')
  })
})