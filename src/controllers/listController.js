const {
  listMusics,
  updateMusicList,
  removeMusicFromList,
  deleteList,
  createList,
} = require('../models/listModel')

module.exports.create = async (req, res) => {
  try {
    const response = await createList(req.body)
    if (response === 'List already exists') {
      res.status(401).json(response)
      return
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

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
    const response = await updateMusicList(data)
    if (response === 'List not found') {
      res.status(401).json(response)
      return
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.remove = async (req, res) => {
  const { name } = req.params

  try {
    const response = await deleteList(name)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.removeMusicFromList = async (req, res) => {
  const data = req.body
  const { musicId } = req.params

  try {
    const response = await removeMusicFromList(data, musicId)
    if (response === 'Music in not in the list') {
      res.status(401).json(response)
      return
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
