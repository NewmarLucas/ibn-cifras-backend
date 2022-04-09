const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const URL_CONNECTION = process.env.MONGO_URL;

module.exports = mongoose.connect(URL_CONNECTION, {
  useNewUrlParser: true, useUnifiedTopology: true
});