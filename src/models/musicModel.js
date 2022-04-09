const MusicSchema = require('../database/schema/music')

const musicRegister = async (data) => {
  await new MusicSchema({
    name: data.name,
    singer: data.singer,
    url: data.url,
  }).save()

  return 'Created'
}

const musicEdit = async (data, id) => {
  await MusicSchema.updateOne({ _id: id }, { $set: data }).exec((err) => {
    if (err) {
      return err
    }
  })

  return 'Updated'
}

const musicDelete = async (id) => {
  await MusicSchema.deleteOne({ _id: id }).exec((err) => {
    if (err) {
      return err
    }
  })

  return 'Deleted'
}

const listMusics = async () => {
  const data = await MusicSchema.find({})

  return data
}

module.exports = {
  musicRegister,
  musicEdit,
  listMusics,
  musicDelete,
}
