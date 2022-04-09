const MusicSchema = require('../database/schema/music');

const musicRegister = async (data) => {
  await new MusicSchema({
    name: data.name,
    singer: data.singer,
    url: data.url
  }).save();

  return 'Created';
}

module.exports = {
  musicRegister,
};