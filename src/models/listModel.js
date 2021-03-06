const MusicListSchema = require('../database/schema/musicList')
const MusicSchema = require('../database/schema/music')

const createList = async (data) => {
  if (!data?.title || !data?.subtitle || data?.title === '' || data?.subtitle === '') return 'Wrong data'

  const list = await MusicListSchema.findOne({ title: data.title })
  if (list) return 'List already exists'

  await new MusicListSchema({
    title: data.title,
    subtitle: data.subtitle,
    musicIdList: [],
  }).save()

  return 'Added'
}

const listMusics = async () => {
  const list = await MusicListSchema.find()

  return list
}

const findMusicsFromList = async (listName) => {
  const list = await MusicListSchema.findOne({ title: { $regex: listName, $options: 'i' } })
  if (!list) return 'List not found'

  const musics = await Promise.all(list?.musicIdList?.map(async (item) => {
    const music = await MusicSchema.findOne({ _id: item })
    return music
  }))

  return musics
}

const deleteList = async (name) => {
  const list = await MusicListSchema.findOne({ name })
  if (!list) return 'List not found'

  await MusicListSchema.deleteOne({ name })
  return 'Removed'
}

const updateMusicList = async (data) => {
  const list = await MusicListSchema.findOne({ title: data.title })
  if (!list) return 'List not found'

  await MusicListSchema.updateOne({ title: data.title }, { $set: { musicIdList: data.musicIdList } }).exec((err) => {
    if (err) {
      return err
    }
  })

  return 'Added'
}

const removeMusicFromList = async (listName, musicId) => {
  const oldList = await MusicListSchema.findOne({ title: { $regex: listName, $options: 'i' } })
  if (!oldList) return 'List not found'

  if (!oldList?.musicIdList || !oldList.musicIdList.includes(musicId)) {
    return 'Music in not in the list'
  }

  oldList.musicIdList?.splice(oldList.musicIdList.indexOf(musicId), 1)

  await MusicListSchema.updateOne(
    { title: listName },
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
  findMusicsFromList,
}
