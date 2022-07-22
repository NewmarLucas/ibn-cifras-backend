const crypto = require('crypto')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    selected: true,
    set: (value) => crypto.createHash('md5').update(value).digest('hex'),
  },
  role: {
    type: String,
    enum: ['ADMIN'],
    required: true,
  },
})

module.exports = mongoose.model('user', userSchema)
