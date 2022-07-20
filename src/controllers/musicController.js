const {
  musicRegister,
  listMusics,
  musicEdit,
  musicDelete,
} = require('../models/musicModel')

module.exports.register = async (req, res) => {
  const data = req.body

  try {
    const music = await musicRegister(data)
    if (music === 'Wrong link') {
      res.status(401).json(music)
      return
    }
    res.status(200).json(music)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.edit = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const music = await musicEdit(data, id)
    if (music === 'Wrong link' || music === 'Music does not exists') {
      res.status(401).json(music)
      return
    }
    res.status(200).json(music)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    const music = await musicDelete(id)
    res.status(200).json(music)
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
