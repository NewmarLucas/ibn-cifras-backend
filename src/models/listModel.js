const MusicListSchema = require('../database/schema/musicList')
const MusicSchema = require('../database/schema/music')

const createList = async (data) => {
  const list = await MusicListSchema.findOne({ title: data.title })
  if (list) return 'List already exists'

  await new MusicListSchema({
    title: data.title,
    subtitle: data.subtitle,
    musicIdList: [],
  }).save()

  return 'Added'
}

const listMusics = async (query) => {
  const filter = {}

  if (query.name) {
    Object.assign(filter, { name: query.name })
  }

  const list = await MusicListSchema.find(filter)
  const musicsList = await Promise.all(
    list[0]?.musicIdList?.map(async (item) => {
      const music = await MusicSchema.find({ _id: item })
      return music[0]
    })
  )

  return filter?.name ? { name: list[0].name, musicsList } : list
}

const deleteList = async (name) => {
  await MusicListSchema.deleteOne({ name: name })

  return 'Removed'
}

const updateMusicList = async (data) => {
  const list = await MusicListSchema.findOne({ title: data.title })

  if (!list) return 'List not found'

  await MusicListSchema.updateOne({ $set: { musicIdList: data.musicIdList } }).exec((err) => {
    if (err) {
      return err
    }
  })

  return 'Added'
}

const removeMusicFromList = async (data, musicId) => {
  const [oldList] = await MusicListSchema.find({ name: data.name })

  if (!oldList?.musicIdList || !oldList.musicIdList.includes(musicId)) {
    return 'Music in not in the list'
  }

  oldList.musicIdList?.splice(oldList.musicIdList.indexOf(musicId), 1)

  await MusicListSchema.updateOne(
    { name: data.name },
    { $set: { musicIdList: oldList.musicIdList } }
  ).exec((err) => {
    if (err) {
      return err
    }
  })

  return 'Removed'
}

module.exports = {
  listMusics,
  updateMusicList,
  removeMusicFromList,
  deleteList,
  createList,
}
