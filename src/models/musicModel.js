const MusicSchema = require('../database/schema/music')

const musicRegister = async (data) => {
  const splitedLink = data.url?.split('/')
  if (splitedLink[splitedLink.length - 1] !== 'imprimir.html' || splitedLink[2] === 'm.cifraclub.com.br') return 'Wrong link'

  const music = await MusicSchema.findOne({ url: data.url })
  if (music) return 'Music already exists'

  await new MusicSchema({
    name: data.name,
    singer: data.singer,
    url: data.url,
  }).save()

  return 'Created'
}

const musicEdit = async (data, id) => {
  const music = await MusicSchema.findOne({ _id: id })
  if (!music) return 'Music does not exists'

  if (data?.url) {
    const splitedLink = data.url?.split('/')
    if (splitedLink[splitedLink.length - 1] !== 'imprimir.html' || splitedLink[2] === 'm.cifraclub.com.br') return 'Wrong link'
  }

  await MusicSchema.updateOne({ _id: id }, { $set: data }).exec((err) => {
    if (err) {
      return err
    }
  })

  return 'Updated'
}

const musicDelete = async (id) => {
  const music = await MusicSchema.findOne({ _id: id })
  if (!music) return 'Music does not exists'

  await MusicSchema.deleteOne({ _id: id }).exec((err) => {
    if (err) {
      return err
    }
  })

  return 'Deleted'
}

const listMusics = async (query) => {
  const filter = {}

  if (query?.name) {
    Object.assign(filter, { name: { $regex: query.name, $options: 'i' } })
  }

  if (query?.singer) {
    Object.assign(filter, { singer: { $regex: query.singer, $options: 'i' } })
  }

  const data = await MusicSchema.find(filter)?.sort({ name: 1 })

  return data
}

module.exports = {
  musicRegister,
  musicEdit,
  listMusics,
  musicDelete,
}
