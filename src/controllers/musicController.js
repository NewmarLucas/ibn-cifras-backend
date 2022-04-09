const { musicRegister, listMusics } = require('../models/musicModel')

module.exports.register = async (req, res) => {
  const data = req.body

  try {
    const music = await musicRegister(data)
    res.status(200).json(music)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.list = async (req, res) => {
  try {
    const musics = await listMusics()
    res.status(200).json(musics)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
