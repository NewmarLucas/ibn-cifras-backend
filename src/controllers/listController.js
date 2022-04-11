const {
  listMusics,
  addMusicToList,
  removeMusicFromList,
} = require('../models/listModel')

module.exports.list = async (req, res) => {
  try {
    const musics = await listMusics(req.query)
    res.status(200).json(musics)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.addMusicToList = async (req, res) => {
  const data = req.body

  try {
    const musics = await addMusicToList(data)
    res.status(200).json(musics)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.removeMusicFromList = async (req, res) => {
  const data = req.body
  const { musicId } = req.params

  try {
    const musics = await removeMusicFromList(data, musicId)
    res.status(200).json(musics)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}