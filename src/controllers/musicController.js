const {
  musicRegister
} = require('../models/musicModel');

module.exports.register = async (req, res) => {
  const data = req.body;

  try {
    const music = await musicRegister(data);
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
