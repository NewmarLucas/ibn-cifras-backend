const MusicListSchema = require('../database/schema/musicList')
const MusicSchema = require('../database/schema/music')

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

  return { name: list[0].name, musicsList }
}

const addMusicToList = async (data) => {
  const oldList = await MusicListSchema.find({ name: data.name })

  if (oldList && oldList.length !== 0) {
    await MusicListSchema.updateOne(
      { name: data.name },
      { $set: { musicIdList: data.musicIdList } }
    ).exec((err) => {
      if (err) {
        return err
      }
    })

    return 'Added'
  }

  await new MusicListSchema({
    name: data.name,
    musicIdList: data.musicIdList,
  }).save()

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
  addMusicToList,
  removeMusicFromList,
}
