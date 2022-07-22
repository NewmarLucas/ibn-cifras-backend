const {
  listMusics,
  updateMusicList,
  removeMusicFromList,
  deleteList,
  createList,
  findMusicsFromList,
} = require('../models/listModel')

module.exports.create = async (req, res) => {
  try {
    const response = await createList(req.body)
    if (response === 'List already exists' || response === 'Wrong data') {
      res.status(400).json(response)
      return
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.list = async (req, res) => {
  try {
    const response = await listMusics(req.query)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.musicsFromList = async (req, res) => {
  const { listName } = req.params

  try {
    const response = await findMusicsFromList(listName)
    if (response === 'List not found') {
      res.status(401).json(response)
      return
    }
    res.status(200).json(response)
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
    if (response === 'List not found') {
      res.status(400).json(response)
      return
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.removeMusicFromList = async (req, res) => {
  const { param } = req.params
  const [musicId, listName] = param.split('-')

  try {
    const response = await removeMusicFromList(listName, musicId)
    if (response === 'Music in not in the list' || response === 'List not found') {
      res.status(400).json(response)
      return
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
