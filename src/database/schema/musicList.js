const mongoose = require('mongoose')
const schema = mongoose.Schema

const musicListSchema = new schema({
  musicIdList: {
    type: Array,
    required: true,
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('musicList', musicListSchema)
