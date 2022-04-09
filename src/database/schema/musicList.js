const mongoose = require('mongoose')
const schema = mongoose.Schema

const musicListSchema = new schema({
  musicIdList: {
    type: Array,
    required: true,
    default: [],
  },
  name: {
    type: String,
    enum: ['SATURDAY', 'SUNDAY', 'TUESDAY', 'OTHER'],
    required: true,
  },
})

module.exports = mongoose.model('musicList', musicListSchema)
